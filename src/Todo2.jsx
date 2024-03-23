import React, { useState } from 'react';

function ItemList() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);     // State for storing the index of the item being edited

    const addItem = () => {
        if (inputValue.trim() !== '') { // Check if the input value is not empty
            setItems([...items, inputValue]);            // Add the input value to the list of items
            setInputValue('');              // Clear the input field
        }
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((item, i) => i !== index);         //  specified index ke item ko filter kiya  and update kr diya  list of items mai
        setItems(updatedItems);
    };

    const editItem = (index) => {
        setEditIndex(index);
        setInputValue(items[index]);
    };

    const updateItem = () => {
        // Check if an item is being edited
        if (editIndex !== null) {               // Check if an item is being edited
            const updatedItems = [...items];    // Create a copy of the current list of items
            // Update the item at the edit index with the new input value
            updatedItems[editIndex] = inputValue;
            // Update the list of items with the modified item
            setItems(updatedItems);
            // Reset the edit index and clear the input value
            setEditIndex(null);
            setInputValue('');
        }
    };

    return (
        <div>
            <h2>Add Items</h2>
            {/* Input field for entering new items */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter item..."
            />
            {/* Button to add the entered item */}
            <button onClick={addItem}>Add Item</button>

            <h2>Items List</h2>
            <ul>
                {/* Iterate over each item in the list */}
                {items.map((item, index) => (
                    <li key={index}>
                        {/* Conditionally render input field and save button for editing */}
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button onClick={updateItem}>Save</button>
                            </>
                        ) : (
                            <>
                                {item}
                                <button onClick={() => editItem(index)}>Edit</button>
                                <button onClick={() => deleteItem(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
