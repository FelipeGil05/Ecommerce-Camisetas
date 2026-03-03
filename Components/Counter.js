import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { colors } from "../Global/colors";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/features/counter/counterSlice.js"

export default function Counter() {

    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.count)


    return (
        <View style={styles.card}>
            <View>
                <Pressable onPress={() => dispatch(decrement())}> <Text> - </Text></Pressable>
                <Text> {count} </Text>
                <Pressable onPress={() => dispatch(increment())}> <Text> + </Text></Pressable>

            </View>
            <Pressable onPress={() => dispatch(reset())} >
                <Text> Reset</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.verde,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    thumb: { width: 56, height: 56, borderRadius: 10 },
    info: { flex: 1, gap: 2 },
    title: { fontWeight: "800", color: colors.text },
    meta: { color: colors.text },
    remove: { fontWeight: "800", color: "#8B0000" },
});
