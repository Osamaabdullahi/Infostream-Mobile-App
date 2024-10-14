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
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import useFetchData from "../hooks/useFetchData";
import { LoadingNews } from "../components/skeletons/searchSkeleton";
import { useRouter } from "expo-router";
import { useBookmarkStore } from "../store";

const sectionsArray = [
  "Technology",
  "News",
  "Sport",
  "Culture",
  "Business",
  "Environment",
  "Science",
];

const Home = () => {
  const router = useRouter();
  const { addBookmark, isBookmarked } = useBookmarkStore();
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const [activeSection, setActiveSection] = useState("Technology");

  const apiUrl = `https://content.guardianapis.com/search?api-key=${apiKey}&section=${activeSection.toLowerCase()}&show-fields=thumbnail,trailText,body,byline&show-tags=author&page-size=29`;

  const { data, loading, error } = useFetchData(apiUrl);

  const handlenav = (id) => {
    router.push({
      pathname: "news",
      params: { id },
    });
  };

  const addnewsToBook = (newsItem) => {
    if (!isBookmarked(newsItem.id)) {
      addBookmark(newsItem);
    }
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topnav}>
          <Text style={[styles.appName, { color: "#14B8A6" }]}>
            <Feather name="cast" size={29} color="#14B8A6" />
            Infostream
          </Text>
          <TouchableOpacity onPress={() => router.push("notification")}>
            <Ionicons name="notifications-outline" size={25} color="#14B8A6" />
          </TouchableOpacity>
        </View>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {sectionsArray.map((section) => (
              <TouchableOpacity
                key={section}
                onPress={() => setActiveSection(section)}
                style={styles.sectionItem}
              >
                <Text
                  style={[
                    styles.sectionText,
                    activeSection === section && styles.activeSectionText,
                  ]}
                >
                  {section}
                </Text>
                {activeSection === section && <View style={styles.underline} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <>
            <LoadingNews />
            <LoadingNews />
            <LoadingNews />
            <LoadingNews />
          </>
        ) : (
          <View style={styles.newscontainer}>
            {data?.response?.results?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlenav(item.id)}
                  style={styles.latest}
                >
                  <View styles={styles.newscontainer}>
                    <Image
                      style={styles.img}
                      source={{
                        uri:
                          item?.fields?.thumbnail ||
                          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg",
                      }}
                    />
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[
                        styles.subheader,
                        { marginVertical: 10, lineHeight: 25 },
                      ]}
                    >
                      {item?.webTitle}
                    </Text>
                    <View style={styles.info}>
                      <View style={styles.author}>
                        <Image
                          source={{
                            uri: "https://i.pinimg.com/474x/d6/98/10/d698106921285cffc36e0ecc9564e4ed.jpg",
                          }}
                          style={styles.authorimg}
                        />
                        <Text>By {item.fields.byline}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          addnewsToBook({
                            id: item?.id,
                            webTitle: item?.webTitle,
                            byline: item?.fields?.byline,
                            thumbnail: item?.fields?.thumbnail,
                          })
                        }
                      >
                        {isBookmarked(item.id) ? (
                          <FontAwesome
                            name="bookmark"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <FontAwesome
                            name="bookmark-o"
                            size={25}
                            color="gray"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[
                        styles.body,
                        { marginVertical: 10, lineHeight: 25 },
                      ]}
                    >
                      {item?.fields.trailText}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  topnav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "DancingScript",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    fontFamily: "SpaceMono",
  },
  subheader: {
    fontSize: 22,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    color: "#333",
    fontSize: 20,
    color: "#333",
  },
  body: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 16,
  },
  caption: {
    fontSize: 12,
    color: "#999",
    color: "",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#14B8A6",
  },
  scroll: {
    // borderWidth: 1,
    // borderColor: "red",
  },

  sticky: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1, // Ensure it appears above other content
    backgroundColor: "#fff", // Add a background color to avoid overlap issues
  },

  scrollContainer: {
    alignItems: "center",
    height: 50,
  },
  sectionItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  sectionText: {
    fontSize: 16,
    color: "#000",
  },
  activeSectionText: {
    color: "#14B8A6",
  },
  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "#14B8A6",
    marginTop: 5,
  },

  //  Newscontainer styling
  img: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  authorimg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
  },
  latest: {
    backgroundColor: "#F5F5F5",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
