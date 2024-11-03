import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function TabTwoScreen() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerItem, setPricePerItem] = useState('');

  const handleAdd = () => {
    // Handle the add functionality here
    console.log('Item Name:', itemName);
    console.log('Quantity:', quantity);
    console.log('Price Per Item:', pricePerItem);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Price Per Item"
          value={pricePerItem}
          onChangeText={setPricePerItem}
          keyboardType="number-pad"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
});
