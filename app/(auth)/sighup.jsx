import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store";
import Loading from "../../components/Loading";

export default function RegistrationScreen() {
  const router = useRouter();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleRegistration = () => {
    Keyboard.dismiss();
    setRegistrationError(""); // Clear any previous registration errors
    let isValid = true;

    if (!first_name.trim()) {
      setRegistrationError("First name is required");
      isValid = false;
    }

    if (!last_name.trim()) {
      setRegistrationError("Last name is required");
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      createUser();
    }
  };

  const createUser = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/register/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        router.push("home");
      } else {
        // Handle specific error cases
        if (data.email) {
          setRegistrationError(data.email[0]);
        } else if (data.password) {
          setRegistrationError(data.password[0]);
        } else if (data.detail) {
          setRegistrationError(data.detail);
        } else {
          setRegistrationError(
            "An error occurred during registration. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.box1}>
          <Text style={styles.log}>Sign Up</Text>
          <View style={styles.up}>
            <Text style={styles.sigh}>Already have an account?</Text>
            <Link href="login">
              <Text style={styles.Sighup}>Log in</Text>
            </Link>
          </View>
        </View>

        {registrationError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{registrationError}</Text>
          </View>
        ) : null}

        <View style={styles.textContainer}>
          <View style={styles.textbox}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              placeholderTextColor="#666"
              style={styles.input}
              value={first_name}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              placeholderTextColor="#666"
              style={styles.input}
              value={last_name}
              onChangeText={(text) => setLastName(text)}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#666"
              style={[styles.input, emailError ? styles.errorInput : null]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            {emailError ? (
              <Text style={styles.fieldErrorText}>{emailError}</Text>
            ) : null}
          </View>

          <View style={styles.textbox}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#666"
              style={[styles.input, passwordError ? styles.errorInput : null]}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? (
              <Text style={styles.fieldErrorText}>{passwordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleRegistration}
            style={styles.registerButton}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>or</Text>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/facebook.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading && <Loading />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  box1: {
    marginBottom: 30,
  },
  log: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#14B8A6",
    marginBottom: 10,
  },
  up: {
    flexDirection: "row",
    alignItems: "center",
  },
  sigh: {
    fontSize: 16,
    color: "#666",
  },
  Sighup: {
    fontSize: 16,
    color: "#14B8A6",
    marginLeft: 5,
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 14,
  },
  textContainer: {
    marginBottom: 20,
  },
  textbox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  errorInput: {
    borderColor: "#D32F2F",
  },
  fieldErrorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: "#14B8A6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    color: "#666",
  },
  socialLoginContainer: {
    marginTop: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
