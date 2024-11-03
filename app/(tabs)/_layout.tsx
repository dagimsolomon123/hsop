import { Tabs } from 'expo-router';
import { Text,View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {SQLiteProvider, useSQLiteContext} from 'expo-sqlite/next';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const loadDatabase = async () => {
    const dbName = "database.db";
    const dbAsset = require("../../assets/database.db");
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true }
      );
      await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
  };
  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded) return <Text>Loading database...</Text>;
  return (
    <SQLiteProvider databaseName='database.db' useSuspense>
      <React.Suspense
        fallback={
          <View style={{flex: 1}}>
            <Text>hallo rarkumar...</Text>
          </View>
        }
        >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true, // Enable header
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'ITEMS',
            headerTitle: 'ITEMS', // Custom header title
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'ADD ITEM',
            headerTitle: 'ADD ITEM', // Custom header title
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            title: 'analysis',
            headerTitle: 'analysis', // Custom header title
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
      </React.Suspense>
    </SQLiteProvider>
    
  );
}
