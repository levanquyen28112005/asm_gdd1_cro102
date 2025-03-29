import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const PayScreen = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("fast");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");
  const [shippingFee, setShippingFee] = useState(15000);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cartItems = [
    { name: "Sản phẩm 1", price: 100000 },
    { name: "Sản phẩm 2", price: 200000 },
  ];

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total + shippingFee);
  }, [shippingFee]);

  const handleShippingSelect = (method) => {
    setShippingFee(method === "fast" ? 15000 : 30000);
    setSelectedShipping(method);
  };

  const handleSubmit = () => {
    Alert.alert("Thanh toán thành công", "Cảm ơn bạn đã mua hàng!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Thông tin khách hàng</Text>
        <TextInput style={styles.input} placeholder="Họ tên" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Địa chỉ" value={address} onChangeText={setAddress} />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.title}>Phương thức vận chuyển</Text>
        <TouchableOpacity
          style={[styles.option, selectedShipping === "fast" && styles.selectedOption]}
          onPress={() => handleShippingSelect("fast")}
        >
          <Text>Giao hàng nhanh - 15.000đ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedShipping === "slow" && styles.selectedOption]}
          onPress={() => handleShippingSelect("slow")}
        >
          <Text>Giao hàng chậm - 30.000đ</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.title}>Tổng tiền</Text>
        <Text>Giá sản phẩm: {totalPrice - shippingFee}đ</Text>
        <Text>Phí vận chuyển: {shippingFee}đ</Text>
        <Text style={styles.totalPrice}>Tổng cộng: {totalPrice}đ</Text>
      </View>
      
      <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
        <Text style={styles.payButtonText}>Thanh toán ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#D3F9D8",
    borderColor: "#4CAF50",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  payButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PayScreen;
