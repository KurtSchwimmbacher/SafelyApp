import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 24 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 32 
  },
  button: { 
    padding: 16, 
    borderRadius: 8, 
    backgroundColor: "#0066cc", 
    marginBottom: 12, 
    width: "80%" 
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center" 
  },
  skipButton: { 
    backgroundColor: "#999" 
  },
  disabledButton: {
    opacity: 0.6,
  },
});