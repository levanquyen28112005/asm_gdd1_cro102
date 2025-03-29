import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [productTree, setProductTree] = useState([]);
  const [productPot, setProductPot] = useState([]);
  const [productToolst, setProductToolst] = useState([]);
  const navigation = useNavigation();

  const apiTree = "http://10.24.35.18:3000/product_tree";
  const apiPot = "http://10.24.35.18:3000/product_pot";
  const apiToolst = "http://10.24.35.18:3000/product_tools";

  useEffect(() => {
    console.log("Loading...");
    getList();
  }, []);

  const getList = async () => {
    try {
      const [treeRes, potRes, toolsRes] = await Promise.all([
        axios.get(apiTree),
        axios.get(apiPot),
        axios.get(apiToolst),
      ]);
      setProductTree(treeRes.data);
      setProductPot(potRes.data);
      setProductToolst(toolsRes.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu", error);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      {item.onffo && <Text style={styles.status}>{item.onffo}</Text>}
      <Text style={styles.price}>{item.price}đ</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Text style={styles.title}>Planta - Trang trí không gian xanh</Text>
          <TouchableOpacity onPress={() => navigation.navigate("GioHang")}>
            <MaterialIcons name="shopping-cart" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/images/banner.png")}
          style={styles.banner}
        />

        <View style={styles.list}>
          <Text style={styles.sectionTitle}>Cây trồng</Text>
          <FlatList
            data={productTree}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
          />
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate("TreeScreen", { productTree })}
          >
            <Text style={styles.viewMoreText}>Xem thêm cây trồng</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Chậu cây trồng</Text>
          <FlatList
            data={productPot}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.list}>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate("PotScreen", { productPot })}
          >
            <Text style={styles.viewMoreText}>Xem thêm Phụ kiện</Text>
          </TouchableOpacity>

          <FlatList
            data={productToolst}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.newProductContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
          <View style={styles.spNew}>
            <View style={styles.textContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#333" }}>Lemon Balm Grow Kit</Text>
              <Text style={{ color: "#555" }}>Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta...</Text>
            </View>
            <Image source={require("../assets/images/buttonbanner.png")} style={styles.imageStyle} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  banner: {
    width: "100%",
    height: 230,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    paddingHorizontal: 20,
    color: "#444",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    margin: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: 170,
    height: 160,
    borderRadius: 10,
  },
  viewMoreButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  newProductContainer: {
    backgroundColor: "#eef7ff",
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
  },
});