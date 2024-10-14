import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const notificationData = [
  {
    id: "1",
    type: "breaking",
    title: "Breaking News: Major Tech Company Announces Revolutionary AI",
    time: "2 minutes ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "2",
    type: "update",
    title: "COVID-19: New Vaccine Shows Promising Results in Clinical Trials",
    time: "15 minutes ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "3",
    type: "recommendation",
    title: 'Based on your interests: "The Future of Renewable Energy"',
    time: "1 hour ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "4",
    type: "alert",
    title: "Weather Alert: Severe Thunderstorms Expected in Your Area",
    time: "2 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "5",
    type: "update",
    title: "Stock Market: Dow Jones Reaches All-Time High",
    time: "3 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "6",
    type: "recommendation",
    title: 'Trending: "10 Must-Visit Travel Destinations for 2024"',
    time: "5 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "7",
    type: "breaking",
    title: "Breaking: Major Political Shift as New Law Passes",
    time: "6 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "8",
    type: "update",
    title: "Sports Update: Underdog Team Wins Championship in Stunning Upset",
    time: "8 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "9",
    type: "recommendation",
    title: 'For You: "The Rise of Plant-Based Diets: A Comprehensive Guide"',
    time: "10 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
  {
    id: "10",
    type: "alert",
    title: "Cybersecurity Alert: Major Data Breach Affects Millions",
    time: "12 hours ago",
    image:
      "https://i.pinimg.com/474x/09/05/08/09050808ffbeafd996046ee13c22d785.jpg",
  },
];

const NotificationItem = ({ item }) => (
  <TouchableOpacity style={styles.notificationItem}>
    <Image source={{ uri: item.image }} style={styles.notificationImage} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
    {item.type === "breaking" && (
      <View style={styles.breakingNews}>
        <Text style={styles.breakingNewsText}>Breaking</Text>
      </View>
    )}
  </TouchableOpacity>
);

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notificationData}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    alignItems: "center",
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: "#2D3748",
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: "#718096",
  },
  breakingNews: {
    backgroundColor: "#F56565",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  breakingNewsText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Notifications;
