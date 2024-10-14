import { StyleSheet } from "react-native";

const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  text: "#000000",
  textLight: "#8E8E93",
  background: "#FFFFFF",
};

const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
  huge: 32,
};

const fontWeights = {
  normal: "normal",
  bold: "bold",
  semiBold: "600",
};

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header1: {
    fontSize: fontSizes.huge,
    fontWeight: fontWeights.bold,
    color: colors.text,
    marginBottom: 10,
  },
  header2: {
    fontSize: fontSizes.extraLarge,
    fontWeight: fontWeights.semiBold,
    color: colors.text,
    marginBottom: 8,
  },
  header3: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.semiBold,
    color: colors.text,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.normal,
    color: colors.text,
    marginBottom: 5,
  },
  smallText: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.normal,
    color: colors.textLight,
  },
  link: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.normal,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    color: colors.background,
  },
});

export default GlobalStyles;
