import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {SQLiteProvider, useSQLiteContext} from 'expo-sqlite/next';
import { items } from '@/components/items';
import {database} from '../../types'
// Define the interface for stationary items
interface StationaryItem {
  name: string;
  quantity: number;
  price: number; // Add the price property
}

const stationaryItems: StationaryItem[] = [
  {
    name: 'Notebook',
    quantity: 5,
    price: 400, // Add the price for each item
  },
  {
    name: 'Pens',
    quantity: 10,
    price: 400, // Add the price for each item
  },
  {
    name: 'Markers',
    quantity: 8,
    price: 400, // Add the price for each item
  },
  {
    name: 'Sticky Notes',
    quantity: 20,
    price: 400, // Add the price for each item
  },
  {
    name: 'A4 PAPER',
    quantity: 20,
    price: 400, // Add the price for each item
  },
  {
    name: 'DRAWING BOOK',
    quantity: 20,
    price: 400, // Add the price for each item
  },
];



const StationaryCard: React.FC<{ item: StationaryItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.priceText}>Price : {item.price} Birr</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  

  const [searchQuery, setSearchQuery] = useState('');
  const db = useSQLiteContext();
  

  React.useEffect(() => {
    db.withTransactionAsync(async()=>{
      await getData();
    })
  }, [db]);
  async function getData(){
    const result = await db.getAllAsync(`SELECT * FROM items`);
    console.log(result)

  }
 



  const filteredItems = stationaryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
      
        <View style={styles.container}>
        
        <ThemedView style={styles.stationaryContainer}>
          <ThemedText type="subtitle">ITEMS</ThemedText>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search items"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </ThemedView>
        
        <ScrollView contentContainerStyle={styles.itemsContainer}>
          {filteredItems.map((item, index) => (
            <StationaryCard key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    
 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stationaryContainer: {
    gap: 8,
    padding: 12,
    borderRadius: 9,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'black', // Ensure the border is visible in dark mode
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: 'white', // Dark background for better contrast in dark mode
    color: 'black', // Ensure the text is visible in dark mode
  },
  itemsContainer: {
    gap: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    color: 'green',
  },
});
