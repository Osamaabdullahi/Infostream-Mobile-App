import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecommendedNews } from "../../components/skeletons/searchSkeleton";
import { useBookmarkStore } from "../../store";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const guardianTags = [
  "News",
  "Sport",
  "Culture",
  "Lifestyle",
  "Arts",
  "Politics",
  "Environment",
  "Technology",
  "World",
  "Health",
  "Business",
  "Science",
  "Travel",
  "Opinion",
];

const Index = () => {
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handlenav = (id) => {
    router.push({
      pathname: "news",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

        <View style={styles.recommendation}>
          <View style={styles.tagsTitles}>
            <Text style={styles.subheader}>bookmarked topics</Text>
            <Text style={[styles.subheader, { color: "#14B8A6" }]}>
              View all
            </Text>
          </View>
          {loading ? (
            <View>
              {guardianTags.map((item, index) => {
                return <RecommendedNews key={index} />;
              })}
            </View>
          ) : (
            <View>
              {bookmarks.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => handlenav(item.id)}
                      style={styles.topics}
                    >
                      <View style={styles.info}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={[styles.body, { marginVertical: 10 }]}
                        >
                          {item.webTitle}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={[styles.caption, { color: "#14B8A6" }]}
                          >
                            {item?.byline} 4 min read
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeBookmark(item.id)}
                          >
                            <FontAwesome
                              name="trash-o"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Image
                        style={styles.secondimg}
                        source={{
                          uri: item?.thumbnail,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 22,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    color: "#333",
    fontSize: 20,
  },
  body: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  caption: {
    fontSize: 12,
    color: "#999",
    color: "",
  },
  searchContainer: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  input: {
    fontSize: 16,
    padding: 8,
    color: "#333",
  },
  tagsTitles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  newstags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tagsbtn: {
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
    paddingVertical: 1,
    paddingHorizontal: 6,
    marginVertical: 3,
    borderRadius: 1,
  },
  img: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  latest: {
    width: 250,
    marginRight: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 10,
  },
  scroll: {
    height: 250,
  },
  info: {
    width: "60%",
  },
  topics: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    marginVertical: 5,
    padding: 10,
  },
  secondimg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 0.5, // Thickness of the line
    borderColor: "gray", // Color of the line
    marginVertical: 10, // Space above and below the line (optional)
  },
});
