import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpCenterScreen = ({ navigation }) => {
  // Help topics data
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn how to use InfoStream for the first time.",
    },
    {
      title: "Account Management",
      description: "How to manage your account settings and preferences.",
    },
    {
      title: "Using the News Feed",
      description: "Tips on browsing and searching for articles.",
    },
    {
      title: "User Authentication",
      description: "How to sign up, log in, and manage your credentials.",
    },
    {
      title: "Contact Support",
      description: "Reach out to our support team for further assistance.",
    },
    {
      title: "Privacy and Security",
      description:
        "Learn about our privacy policies and how we protect your data.",
    },
  ];

  // Navigate to a detailed help screen (not implemented in this code)
  const handleTopicPress = (topic) => {
    console.log(`Navigating to details for: ${topic.title}`);
    // Example: navigation.navigate('HelpDetail', { topic });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Help Center</Text>

        {helpTopics.map((topic, index) => (
          <TouchableOpacity key={index} onPress={() => handleTopicPress(topic)}>
            <View style={styles.topicContainer}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDescription}>{topic.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  topicContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  topicDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default HelpCenterScreen;
