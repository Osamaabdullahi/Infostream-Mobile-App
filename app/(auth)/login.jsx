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
import { Link, router } from "expo-router";
import { useAuthStore } from "../../store";
import Loading from "../../components/Loading";
import { jwtDecode } from "jwt-decode";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const login = useAuthStore((state) => state.login);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    setLoginError(""); // Clear any previous login errors
    let isValid = true;

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
      loginUser();
    }
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}api/token/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.access);
        login(decoded);
        router.push("home");
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          setLoginError("Invalid email or password. Please try again.");
        } else if (data.detail) {
          setLoginError(data.detail);
        } else {
          setLoginError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
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
          <Text style={styles.log}>Log in</Text>
          <View style={styles.up}>
            <Text style={styles.sigh}>Don't have an account?</Text>
            <Link href="signup">
              <Text style={styles.Signup}>Sign up</Text>
            </Link>
          </View>
        </View>

        {loginError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{loginError}</Text>
          </View>
        ) : null}

        <View style={styles.textContainer}>
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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Logging in..." : "Log In"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or</Text>

        <View style={styles.socialLoginContainer}>
          {/* {["google", "apple", "facebook"].map((platform) => (
            <TouchableOpacity key={platform} style={styles.socialButton}>
              <Image
                source={require(`../../assets/images/google.png`)}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>
                Continue with {platform}
              </Text>
            </TouchableOpacity>
          ))} */}
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socilaTxt}>continue with google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/facebook.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socilaTxt}>continue with facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/apple.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socilaTxt}>continue with apple</Text>
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
  Signup: {
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#14B8A6",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#14B8A6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
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
