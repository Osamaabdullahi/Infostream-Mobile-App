import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const TermsAndConditions = ({ onAccept }) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setIsScrolledToBottom(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <Text style={styles.termsText}>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 3. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris. 4. Duis
          aute irure dolor in reprehenderit in voluptate velit esse cillum. 5.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          4. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum. 5. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia. 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. 2. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. 3. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris. 4. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum. 5. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia. 1. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. 2. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. 3. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. 4. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum. 5.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          4. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum. 5. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia. 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. 2. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. 3. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris. 4. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum. 5. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia. 1. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. 2. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. 3. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. 4. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum. 5.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          4. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum. 5. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia. 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. 2. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. 3. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris. 4. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum. 5. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia. 1. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. 2. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. 3. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. 4. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum. 5.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia. 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          4. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum. 5. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia. 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. 2. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. 3. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris. 4. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum. 5. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia. 1. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. 2. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. 3. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. 4. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum. 5.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia.
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.acceptButton,
          !isScrolledToBottom && styles.disabledButton,
        ]}
        onPress={onAccept}
        disabled={!isScrolledToBottom}
      >
        <Text style={styles.acceptButtonText}>
          {isScrolledToBottom ? "Accept" : "Please read the terms"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: Dimensions.get("window").height * 0.6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  acceptButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TermsAndConditions;
