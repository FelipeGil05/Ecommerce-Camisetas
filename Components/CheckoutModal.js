import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { colors } from "../Global/colors";

export default function CheckoutModal({ visible, onClose, onConfirm, isLoading }) {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        numeroTarjeta: "",
        vencimiento: "",
        cvv: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.nombre) newErrors.nombre = "Requerido";
        if (!form.apellido) newErrors.apellido = "Requerido";
        if (!form.telefono) newErrors.telefono = "Requerido";
        if (!form.direccion) newErrors.direccion = "Requerido";
        if (!form.ciudad) newErrors.ciudad = "Requerido";
        if (!form.numeroTarjeta) newErrors.numeroTarjeta = "Requerido";
        if (!form.vencimiento) newErrors.vencimiento = "Requerido";
        if (!form.cvv) newErrors.cvv = "Requerido";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onConfirm(form);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.centered}
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        <Text style={styles.title}>Completa tus datos</Text>
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre"
                                    value={form.nombre}
                                    onChangeText={(v) => handleChange("nombre", v)}
                                />
                                {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Apellido"
                                    value={form.apellido}
                                    onChangeText={(v) => handleChange("apellido", v)}
                                />
                                {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}
                            </View>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            keyboardType="phone-pad"
                            value={form.telefono}
                            onChangeText={(v) => handleChange("telefono", v)}
                        />
                        {errors.telefono && <Text style={styles.error}>{errors.telefono}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            value={form.direccion}
                            onChangeText={(v) => handleChange("direccion", v)}
                        />
                        {errors.direccion && <Text style={styles.error}>{errors.direccion}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Ciudad"
                            value={form.ciudad}
                            onChangeText={(v) => handleChange("ciudad", v)}
                        />
                        {errors.ciudad && <Text style={styles.error}>{errors.ciudad}</Text>}
                        <Text style={styles.subtitle}>Datos de tarjeta (ficticia)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de tarjeta"
                            keyboardType="number-pad"
                            value={form.numeroTarjeta}
                            onChangeText={(v) => handleChange("numeroTarjeta", v)}
                        />
                        {errors.numeroTarjeta && <Text style={styles.error}>{errors.numeroTarjeta}</Text>}
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Vencimiento (MM/AA)"
                                    value={form.vencimiento}
                                    onChangeText={(v) => handleChange("vencimiento", v)}
                                />
                                {errors.vencimiento && <Text style={styles.error}>{errors.vencimiento}</Text>}
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="CVV"
                                    keyboardType="number-pad"
                                    value={form.cvv}
                                    onChangeText={(v) => handleChange("cvv", v)}
                                />
                                {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
                            </View>
                        </View>
                        <View style={styles.actions}>
                            <Pressable style={styles.cancelBtn} onPress={onClose} disabled={isLoading}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={styles.confirmBtn} onPress={handleSubmit} disabled={isLoading}>
                                <Text style={styles.confirmText}>{isLoading ? "Procesando..." : "Confirmar compra"}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalView: {
        backgroundColor: colors.negro,
        borderRadius: 16,
        padding: 20,
        width: "90%",
        maxHeight: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: colors.amarillo,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 18,
        marginBottom: 6,
        color: colors.amarillo
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gris,
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        backgroundColor: colors.blanco 
    },
    error: {
        color: "#FF5C5C",
        fontSize: 12,
        marginBottom: 4
    },
    row: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 8
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 16,
        marginTop: 18
    },
    cancelBtn: {
        backgroundColor: colors.amarillo,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8
    },
    cancelText: {
        color: colors.negro,
        fontWeight: "700"
    },
    confirmBtn: {
        backgroundColor: colors.verde,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8
    },
    confirmText: {
        color: colors.negro,
        fontWeight: "700"
    }
});
