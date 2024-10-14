import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";

export const SkeletonLoader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safearea}>
      <Newsloading />
      <RecommendedNews />
    </SafeAreaView>
  );
};

export default SkeletonLoader;

export const Newsloading = () => {
  return (
    <View style={styles.latest}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonTextSmall} />
      <View style={styles.skeletonTextSmaller} />
    </View>
  );
};

export const LoadingNews = () => {
  return (
    <View style={styles.large}>
      <View style={[styles.skeletonImage, { width: "100%" }]} />
      <View style={[styles.skeletonTextSmall, { width: "100%" }]} />
      <View style={[styles.skeletonTextSmaller, { width: "100%" }]} />
      <View style={[styles.skeletonTextSmall, { width: "100%" }]} />
    </View>
  );
};

export const NewsSkeleton = () => {
  return (
    <View style={styles.large}>
      <View style={[styles.skeletonImage, { width: "100%", height: 500 }]} />
      <View style={[styles.skeletonTextSmall, { width: "100%" }]} />
      <View style={[styles.skeletonTextSmaller, { width: "100%" }]} />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0].map((item, index) => (
        <View
          key={index}
          style={[styles.skeletonTextSmall, { width: "100%" }]}
        />
      ))}
    </View>
  );
};

export const RecommendedNews = () => {
  return (
    <View>
      <View style={styles.line} />
      <View style={styles.topics}>
        <View style={styles.skeletonInfo} />
        <View style={styles.skeletonImageSmall} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchContainer: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
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
  news: {
    marginTop: 20,
  },
  recommendation: {
    marginTop: 20,
  },

  // Skeleton styles
  skeletonInput: {
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  skeletonTag: {
    width: 80,
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  skeletonImage: {
    width: 250,
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonTextSmall: {
    width: "100%",
    height: 20,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  skeletonTextSmaller: {
    width: "60%",
    height: 15,
    backgroundColor: "#E0E0E0",
  },
  skeletonInfo: {
    width: "60%",
    height: 70,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  skeletonImageSmall: {
    width: 80,
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
  },
  scroll: {
    height: 250,
  },
  topics: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  latest: {
    width: 250,
    marginRight: 10,
  },
  large: {
    width: "100%",
    marginRight: 10,
  },
});
