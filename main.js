// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";  // Firestore imports

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

// Initialize Firestore
const db = getFirestore(app);  // Firestore initialization

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
    window.open('https://idx.google.com/kasi-biz-directory-1532823', '_blank'); // Verify this URL
}

// Handle form submission and store data in Firestore
document.getElementById("business-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const businessName = document.getElementById("business-name").value;
    const businessDescription = document.getElementById("business-description").value;
    const businessEmail = document.getElementById("business-email").value;
    const businessPhone = document.getElementById("business-phone").value;
    const businessAddress = document.getElementById("business-address").value;

    try {
        const docRef = await addDoc(collection(db, "businesses"), {
            name: businessName,
            description: businessDescription,
            email: businessEmail,
            phone: businessPhone,
            address: businessAddress,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Business listed successfully!");
        document.getElementById("business-form").reset(); // Reset the form after submission
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error listing business. Please try again.");
    }
});

// Function to get the list of businesses
async function getBusinessListings() {
    const querySnapshot = await getDocs(collection(db, "businesses"));
    const businessList = document.getElementById("business-list");
    businessList.innerHTML = ""; // Clear existing content

    const businesses = [];

    querySnapshot.forEach((doc) => {
        const businessData = doc.data();
        businesses.push(businessData); // Store each business in the array
        const businessItem = `
            <div class="business-card">
                <h3>${businessData.name}</h3>
                <p><strong>Description:</strong> ${businessData.description}</p>
                <p><strong>Email:</strong> ${businessData.email}</p>
                <p><strong>Phone:</strong> ${businessData.phone}</p>
                <p><strong>Address:</strong> ${businessData.address}</p>
            </div>
        `;
        businessList.innerHTML += businessItem;
    });

    return businesses; // Return businesses array for use in other functions
}

// Call the function when the page loads
window.onload = async () => {
    const businesses = await getBusinessListings(); // Fetch and display business listings
    initMap(businesses);  // Pass the businesses to the map initialization
};

let map;

// Initialize the map and place markers for businesses
function initMap(businesses) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -25.7479, lng: 28.2293 }, // Pretoria, SA as default center
        zoom: 10
    });

    const geocoder = new google.maps.Geocoder();

    // Place markers for each business
    businesses.forEach((business) => {
        geocoder.geocode({ address: business.address }, (results, status) => {
            if (status === "OK") {
                new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: business.name
                });
            } else {
                console.error("Geocode was not successful: " + status);
            }
        });
    });
}

// Initialize Gemini Client
import { GeminiClient } from "@langchain/google-genai";
const gemini = new GeminiClient({ apiKey: "AIzaSyBu29op0LemGPSu3adIzZCF9SS-ecngRM4" }); // Replace with your actual API key

async function sendQuery() {
    const userQuery = document.getElementById("user-query").value;
    const responseElement = document.getElementById("chatbot-response");

    try {
        const response = await gemini.generateText({
            prompt: userQuery
        });

        responseElement.innerText = response.text;
    } catch (error) {
        console.error("Error sending query to Gemini:", error);
        responseElement.innerText = "Error: Unable to get a response from the chatbot.";
    }
}

// Import Algolia and InstantSearch.js
import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js/es";
import { searchBox, hits, pagination } from "instantsearch.js/es/widgets";

// Initialize Algolia search client
const searchClient = algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5');

// Initialize InstantSearch.js
const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

// Add widgets to InstantSearch
search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Search for businesses...',
  }),
  hits({
    container: '#hits',
    templates: {
      item(hit) {
        return `
          <div>
            <strong>${hit.name}</strong>
            <p>${hit.description}</p>
          </div>
        `;
      },
    },
  }),
  pagination({
    container: '#pagination',
  }),
]);

// Start the search
search.start();


