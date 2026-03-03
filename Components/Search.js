import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react'
import { colors } from '../Global/colors'

const Search = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const search = () => {
        onSearch(input);
    }

    const removeInput = () => {
        setInput('');
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Buscar Producto...'
                style={styles.input}
                value={input}
                onChangeText={setInput}
            />
            <Pressable onPress={search}>
                <EvilIcons name="search" size={24} color="black" />
            </Pressable>
            <Pressable onPress={removeInput}>
                <MaterialIcons name="clear" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        gap: 6,
        flexDirection: 'row'
    },
    input: {
        backgroundColor: colors.blanco,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 10,
        flex: 1
    }
})