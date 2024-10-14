import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store";

const ProfileOption = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.profileOption} onPress={onPress}>
    <View style={styles.optionIcon}>{icon}</View>
    <Text style={styles.optionText}>{title}</Text>
    <AntDesign name="right" size={20} color="#A0AEC0" />
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const Auth = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  console.log(user);

  const handleLogout = () => {
    setLogoutVisible(!logoutVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push("notification")}>
          <Feather name="bell" size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Auth ? (
          <>
            <View style={styles.profileInfo}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{user.first_name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>

            <View style={styles.optionsContainer}>
              <ProfileOption
                icon={
                  <MaterialIcons
                    name="person-outline"
                    size={24}
                    color="#4A5568"
                  />
                }
                title="Edit Profile"
                onPress={() => router.push("profile/details")}
              />
              <ProfileOption
                icon={<Feather name="info" size={24} color="#4A5568" />}
                title="About"
                onPress={() => router.push("profile/about")}
              />
              <ProfileOption
                icon={<Feather name="file-text" size={24} color="#4A5568" />}
                title="Terms and Conditions"
                onPress={() => router.push("profile/terms/")}
              />
              <ProfileOption
                icon={<Feather name="bell" size={24} color="#4A5568" />}
                title="Notifications"
                onPress={() => router.push("notification")}
              />
              <ProfileOption
                icon={
                  <AntDesign name="questioncircleo" size={24} color="#4A5568" />
                }
                title="FAQs"
                onPress={() => router.push("/profile/FAQs")}
              />
              <ProfileOption
                icon={<Feather name="headphones" size={24} color="#4A5568" />}
                title="Help Center"
                onPress={() => router.push("/profile/help")}
              />
            </View>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="#E53E3E" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.authContainer}>
            <Image
              source={require("../../assets/images/one.jpg")}
              style={styles.authImage}
            />
            <Text style={styles.authTitle}>Join Infostream</Text>
            <Text style={styles.authSubtitle}>
              Create an account or log in to access personalized news, save
              articles, and more.
            </Text>
            <TouchableOpacity
              style={[styles.authButton, styles.createAccountButton]}
              onPress={() => router.push("sighup")}
            >
              <Text style={styles.createAccountButtonText}>
                Create an Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, styles.loginButton]}
              onPress={() => router.push("login")}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {logoutVisible && (
        <View style={styles.logoutModal}>
          <View style={styles.logoutModalContent}>
            <Text style={styles.logoutModalTitle}>Log Out</Text>
            <Text style={styles.logoutModalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.logoutModalButtons}>
              <TouchableOpacity
                style={[styles.logoutModalButton, styles.cancelButton]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logoutModalButton, styles.confirmButton]}
                onPress={() => {
                  setLogoutVisible(false);
                  logout();
                }}
              >
                <Text style={styles.confirmButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  profileInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
  },
  profileEmail: {
    fontSize: 16,
    color: "#718096",
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionIcon: {
    width: 40,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#4A5568",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF5F5",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#E53E3E",
    fontWeight: "600",
  },
  logoutModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutModalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  logoutModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  logoutModalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  logoutModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E2E8F0",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#E53E3E",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#4A5568",
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
  },

  authContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  authImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginBottom: 30,
  },
  authButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  createAccountButton: {
    backgroundColor: "#4299E1",
  },
  createAccountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#EDF2F7",
  },
  loginButtonText: {
    color: "#4A5568",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
