import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const About = () => {
  const openWebsite = () => {
    Linking.openURL("https://infostream-one.vercel.app/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About Infostream</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../../assets/images/one.jpg")}
          style={styles.logo}
        />
        <Text style={styles.version}>Version 2.1.0</Text>
        <Text style={styles.description}>
          Infostream is your go-to source for real-time news and personalized
          content. Stay informed with breaking news alerts, in-depth articles,
          and curated stories tailored to your interests.
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features:</Text>
          <Text style={styles.featureItem}>• Personalized news feed</Text>
          <Text style={styles.featureItem}>
            • Real-time breaking news alerts
          </Text>
          <Text style={styles.featureItem}>
            • Customizable topic preferences
          </Text>
          <Text style={styles.featureItem}>• Offline reading mode</Text>
          <Text style={styles.featureItem}>
            • Cross-platform synchronization
          </Text>
        </View>
        <Text style={styles.missionStatement}>
          Our mission is to keep you informed and connected to the world around
          you, delivering accurate and timely information at your fingertips.
        </Text>
        <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
          <Text style={styles.websiteButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={24} color="#E1306C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          © 2024 Infostream, Inc. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 30,
  },
  version: {
    textAlign: "center",
    fontSize: 16,
    color: "#718096",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginTop: 20,
    textAlign: "center",
  },
  featuresContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 5,
  },
  missionStatement: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#4A5568",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginTop: 30,
    textAlign: "center",
  },
  websiteButton: {
    backgroundColor: "#4299E1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 30,
  },
  websiteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  copyright: {
    fontSize: 14,
    color: "#A0AEC0",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});

export default About;
