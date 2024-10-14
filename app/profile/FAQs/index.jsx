import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQsScreen = () => {
  // State to track which FAQ item is expanded
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "What is InfoStream?",
      answer:
        "InfoStream is a web and mobile application that provides users with the latest news from a variety of categories using The Guardian API.",
    },
    {
      question: "How do I sign up?",
      answer:
        'To sign up, click on the "Sign Up" button and provide the required information, including your email address and password.',
    },
    {
      question: "How does the news feed work?",
      answer:
        "The news feed automatically fetches the latest articles from various sections such as technology, business, and sports using The Guardian API.",
    },
    {
      question: "Is InfoStream free to use?",
      answer:
        "Yes, InfoStream is completely free to use, allowing you to stay up-to-date with the latest news from different categories.",
    },
    {
      question: "Can I search for specific articles?",
      answer:
        "Yes, you can use the search functionality to find articles based on specific keywords or topics.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach out to our support team at support@infostream.com for any assistance or inquiries.",
    },
  ];

  // Toggle FAQ items
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Frequently Asked Questions</Text>

        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleFAQ(index)}>
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{faq.question}</Text>
              </View>
            </TouchableOpacity>

            {expandedFAQ === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </View>
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
  faqContainer: {
    marginBottom: 12,
  },
  questionContainer: {
    backgroundColor: "#14B8A6", // Active background color for questions
    padding: 12,
    borderRadius: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  answerContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default FAQsScreen;
