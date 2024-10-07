// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyv16poIwyyoNBrr7TfSWFrkUyij5Sox0",
  authDomain: "township-business-directory.firebaseapp.com",
  projectId: "township-business-directory",
  storageBucket: "township-business-directory.appspot.com",
  messagingSenderId: "444628766067",
  appId: "1:444628766067:web:8ff2dd9feef2c4cc1c4906",
  measurementId: "G-1TEKMKEZQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if Analytics can be initialized (in case it's blocked, it won't break the app)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics initialization failed: ", error);
}

// Check if geolocation is available and get the user's current position
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log("Latitude is: " + position.coords.latitude);
      console.log("Longitude is: " + position.coords.longitude);
    }, 
    function(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
    }
  );
} else {
  console.log("Geolocation is not available.");
}

// Function to open the Gemini chatbot in a new tab
function openChatbot() {
  window.open('https://idx.google.com/kasi-biz-directory-1532823', '_blank');
}

