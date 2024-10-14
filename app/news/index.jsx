import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useBookmarkStore } from "../../store";

const { width } = Dimensions.get("window");

const NewsDetailScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } =
    useBookmarkStore();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [sampleArticle, setsampleArticle] = useState(null);
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  const fetchNews = async () => {
    let url = `https://content.guardianapis.com/${id}?api-key=${apiKey}&show-fields=thumbnail,trailText,body,byline`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setsampleArticle(data.response.content);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onBackPress = () => {
    router.back();
  };

  const addnewsToBook = (newsItem) => {
    if (!isBookmarked(newsItem.id)) {
      addBookmark(newsItem);
    }
  };

  if (!sampleArticle) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#14B8A6" />
        <Text style={{ marginVertical: 10 }}>Loading......</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article</Text>
      </View>
      <ScrollView>
        <Image
          source={{
            uri:
              sampleArticle.fields.thumbnail ||
              "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg",
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.category}>{sampleArticle.sectionName}</Text>
          <Text style={[styles.title, { lineHeight: 30 }]}>
            {sampleArticle.webTitle}
          </Text>
          <View style={styles.authorContainer}>
            <Feather name="user" size={16} color="#666" />
            <Text style={styles.authorText}>{sampleArticle.fields.byline}</Text>
            <Feather
              name="calendar"
              size={16}
              color="#666"
              style={styles.iconSpacing}
            />
            <Text style={styles.authorText}>
              {sampleArticle.webPublicationDate}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Feather name="eye" size={16} color="#666" />
              <Text style={styles.statText}>5.2K views</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="clock" size={16} color="#666" />
              <Text style={styles.statText}>5 min read</Text>
            </View>
          </View>
          <Text style={styles.body}>{sampleArticle.fields.body}</Text>
        </View>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagTitle}>Related Tags:</Text>
          <View style={styles.tagsList}>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>AI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>Technology</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagButton}>
              <Text style={styles.tagText}>Future</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsLiked(!isLiked)}
        >
          <Feather
            name={isLiked ? "heart" : "heart"}
            size={24}
            color={isLiked ? "#e74c3c" : "#333"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            addnewsToBook({
              id: sampleArticle?.id,
              webTitle: sampleArticle?.webTitle,
              byline: sampleArticle?.fields?.byline,
              thumbnail: sampleArticle?.fields?.thumbnail,
            })
          }
        >
          {isBookmarked(id) ? (
            <FontAwesome name="bookmark" size={24} color="black" />
          ) : (
            <FontAwesome name="bookmark-o" size={25} color="gray" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="share-2" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentButton}>
          <Feather name="message-square" size={20} color="#fff" />
          <Text style={styles.commentButtonText}>Comments</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 8,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  authorText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  iconSpacing: {
    marginLeft: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  tagsContainer: {
    padding: 20,
  },
  tagTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  iconButton: {
    padding: 8,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  commentButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default NewsDetailScreen;
