// import { useRouter } from "expo-router";
// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Animated,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// const slides = [
//   {
//     id: "1",
//     image: require("../assets/images/one.jpg"),
//     title: "Welcome to Infostream",
//     description:
//       "Your personalized news feed, bringing you the latest stories from around the world.",
//   },
//   {
//     id: "2",
//     image: require("../assets/images//two.jpg"),
//     title: "Discover Categories",
//     description:
//       "Explore news across various categories like Technology, Sports, Business, and more.",
//   },
//   {
//     id: "3",
//     image: require("../assets/images/three.jpg"),
//     title: "Save for Later",
//     description:
//       "Bookmark articles to read later or share with friends and family.",
//   },
// ];

// const Slide = ({ item }) => {
//   return (
//     <View style={styles.slide}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//     </View>
//   );
// };

// const Onboarding = () => {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const slidesRef = useRef(null);

//   const viewableItemsChanged = useRef(({ viewableItems }) => {
//     setCurrentIndex(viewableItems[0].index);
//   }).current;

//   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

//   const scrollTo = () => {
//     if (currentIndex < slides.length - 1) {
//       slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       router.push("home");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.flatlistContainer}>
//         <FlatList
//           data={slides}
//           renderItem={({ item }) => <Slide item={item} />}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           bounces={false}
//           keyExtractor={(item) => item.id}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             {
//               useNativeDriver: false,
//             }
//           )}
//           scrollEventThrottle={32}
//           onViewableItemsChanged={viewableItemsChanged}
//           viewabilityConfig={viewConfig}
//           ref={slidesRef}
//         />
//       </View>
//       <View style={styles.footer}>
//         <View style={styles.indicatorContainer}>
//           {slides.map((_, index) => {
//             const inputRange = [
//               (index - 1) * width,
//               index * width,
//               (index + 1) * width,
//             ];
//             const dotWidth = scrollX.interpolate({
//               inputRange,
//               outputRange: [10, 20, 10],
//               extrapolate: "clamp",
//             });
//             const opacity = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.3, 1, 0.3],
//               extrapolate: "clamp",
//             });
//             return (
//               <Animated.View
//                 style={[styles.indicator, { width: dotWidth, opacity }]}
//                 key={index.toString()}
//               />
//             );
//           })}
//         </View>
//         <TouchableOpacity style={styles.button} onPress={scrollTo}>
//           <Text style={styles.buttonText}>
//             {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   flatlistContainer: {
//     flex: 3,
//   },
//   slide: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width,
//   },
//   image: {
//     flex: 0.7,
//     width: "80%",
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#14B8A6",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   description: {
//     fontSize: 16,
//     color: "#62656b",
//     textAlign: "center",
//     paddingHorizontal: 64,
//     marginTop: 20,
//   },
//   footer: {
//     flex: 1,
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   indicatorContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   indicator: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#14B8A6",
//     marginHorizontal: 5,
//   },
//   button: {
//     backgroundColor: "#14B8A6",
//     // padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     paddingVertical: 10,
//     width: 200,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default Onboarding;

import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/one.jpg"),
    title: "Welcome to Infostream",
    description:
      "Your personalized news feed, bringing you the latest stories from around the world.",
  },
  {
    id: "2",
    image: require("../assets/images/two.jpg"),
    title: "Discover Categories",
    description:
      "Explore news across various categories like Technology, Sports, Business, and more.",
  },
  {
    id: "3",
    image: require("../assets/images/three.jpg"),
    title: "Save for Later",
    description:
      "Bookmark articles to read later or share with friends and family.",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    // Check if onboarding is already completed
    const checkOnboarding = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );
      if (hasCompletedOnboarding) {
        router.push("home");
      }
    };
    checkOnboarding();
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Mark onboarding as completed and navigate to home screen
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      router.push("home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.flatlistContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <Slide item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                style={[styles.indicator, { width: dotWidth, opacity }]}
                key={index.toString()}
              />
            );
          })}
        </View>
        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistContainer: {
    flex: 3,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  image: {
    flex: 0.7,
    width: "80%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14B8A6",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#14B8A6",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#14B8A6",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Onboarding;
