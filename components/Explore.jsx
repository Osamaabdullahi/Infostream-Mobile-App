import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useFetchData from "../hooks/useFetchData";
import { useDebouncedCallback } from "use-debounce";
import {
  Newsloading,
  RecommendedNews,
} from "../components/skeletons/searchSkeleton";
import { useRouter } from "expo-router";

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

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const [Tags, setTags] = useState("technology");
  const router = useRouter();

  const debouncedHandleSearch = useDebouncedCallback((text) => {
    setSearchTerm(text);
  }, 1000);
  const apiUrl = Tags
    ? `https://content.guardianapis.com/search?api-key=${apiKey}&section=${Tags.toLowerCase()}&show-fields=thumbnail,trailText,body,byline&page-size=29&q=${searchTerm}`
    : `https://content.guardianapis.com/search?api-key=${apiKey}&q=${searchTerm}&show-fields=thumbnail,trailText,body,byline&page-size=29`;

  const { data, loading, error } = useFetchData(apiUrl);

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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#888"
            clearButtonMode="while-editing"
            autoCorrect={false}
            returnKeyType="search"
            onChangeText={(text) => debouncedHandleSearch(text)}
          />
          <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        </View>

        <View style={styles.tags}>
          <View style={styles.tagsTitles}>
            <Text style={styles.subheader}>Popular tags</Text>
            <Text style={[styles.subheader, { color: "#14B8A6" }]}>
              View all
            </Text>
          </View>
          <View style={styles.newstags}>
            {guardianTags.map((tags, index) => (
              <TouchableOpacity
                onPress={() => setTags(tags)}
                key={index}
                style={[
                  styles.tagsbtn,
                  Tags === tags
                    ? { backgroundColor: "#14B8A6" }
                    : { backgroundColor: "#F5F5F5" },
                ]}
              >
                <Text style={styles.body}>{tags}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.news}>
          <View style={styles.tagsTitles}>
            <Text style={styles.subheader}>Latest news {searchTerm}</Text>
            <Text style={[styles.subheader, { color: "#14B8A6" }]}>
              View all
            </Text>
          </View>

          {loading ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
              pagingEnabled={true}
            >
              {guardianTags.map((item, index) => {
                return <Newsloading key={index} />;
              })}
            </ScrollView>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
              pagingEnabled={true}
            >
              {data?.response?.results?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handlenav(item.id)}
                    key={index}
                    style={styles.latest}
                  >
                    <View styles={styles.newscontainer}>
                      <Image
                        style={styles.img}
                        source={{
                          uri: item?.fields?.thumbnail,
                        }}
                      />
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[styles.body, { marginVertical: 10 }]}
                      >
                        {item?.webTitle}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[styles.caption, { color: "#14B8A6" }]}
                      >
                        {item?.fields?.byline} 4 min read
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={styles.recommendation}>
          <View style={styles.tagsTitles}>
            <Text style={styles.subheader}>Recommended topics</Text>
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
              {data?.response?.results?.map((item, index) => {
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
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={[styles.caption, { color: "#14B8A6" }]}
                        >
                          {item?.fields?.byline} 4 min read
                        </Text>
                      </View>
                      <Image
                        style={styles.secondimg}
                        source={{
                          uri: item?.fields?.thumbnail,
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

export default Explore;

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
