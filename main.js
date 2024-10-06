// main.js

// API Endpoints
const BASE_API_URL = 'https://idx.google.com/kasi-biz-directory-1532823'; // Placeholder API
const CHATBOT_API_URL = '/chatbot'; // Backend route for chatbot
const REGISTER_BUSINESS_URL = '/register-business'; // Backend route to register business

// Registering Business
document.getElementById('business-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const businessName = document.querySelector('input[name="business_name"]').value;
    const businessDescription = document.querySelector('textarea[name="business_description"]').value;
    const businessEmail = document.querySelector('input[name="business_email"]').value;
    const businessPhone = document.querySelector('input[name="business_phone"]').value;
    const businessAddress = document.querySelector('input[name="business_address"]').value;
    const productImage = document.querySelector('input[name="product_image"]').files[0];

    // Use FormData for file upload
    const formData = new FormData();
    formData.append('business_name', businessName);
    formData.append('business_description', businessDescription);
    formData.append('business_email', businessEmail);
    formData.append('business_phone', businessPhone);
    formData.append('business_address', businessAddress);
    formData.append('product_image', productImage);

    try {
        const response = await fetch(`${BASE_API_URL}${REGISTER_BUSINESS_URL}`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to register business');
        }
        const result = await response.json();
        alert('Business Registered Successfully!');
    } catch (error) {
        console.error('Error registering business:', error);
        alert('There was an error registering the business. Please try again.');
    }
});

// Geolocation Tracking (for User and Business)
function trackUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            // Send location to backend or display on UI
            console.log(`User's Location: Latitude: ${lat}, Longitude: ${long}`);

            // If needed, you can also send the location to your backend API to store the user's location
        }, () => {
            alert('Unable to fetch location. Please ensure GPS is enabled.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Chatbot Integration
document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const chatWindow = document.getElementById('chat-window');

    // Display user message
    chatWindow.innerHTML += `<div class='bg-blue-100 p-2 rounded-lg mb-2'>${userInput}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Clear input field
    document.getElementById('user-input').value = '';

    // Send message to backend chatbot API
    try {
        const response = await fetch(`${BASE_API_URL}${CHATBOT_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error('Chatbot response error');
        }

        const data = await response.json();

        // Display chatbot response safely
        chatWindow.innerHTML += `<div class='bg-gray-200 p-2 rounded-lg mb-2'>${data.response}</div>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
        console.error('Error with chatbot:', error);
        chatWindow.innerHTML += `<div class='bg-red-100 p-2 rounded-lg mb-2'>Error: Chatbot unavailable</div>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});

// Display Listed Businesses
async function displayListedBusinesses() {
    try {
        const response = await fetch(`${BASE_API_URL}/businesses`);
        if (!response.ok) {
            throw new Error('Failed to fetch businesses');
        }
        const businesses = await response.json();

        const businessContainer = document.getElementById('businesses-container');
        businessContainer.innerHTML = ''; // Clear any existing businesses

        businesses.forEach((business) => {
            const businessCard = `
                <div class="bg-white p-6 shadow-md rounded-lg">
                    <img src="${business.imageUrl}" alt="${business.name}" class="w-full h-40 object-cover rounded-md mb-4">
                    <h4 class="text-xl font-bold">${business.name}</h4>
                    <p class="text-gray-600">${business.description}</p>
                    <p class="text-gray-600">Phone: ${business.phone}</p>
                    <p class="text-gray-600">Address: ${business.address}</p>
                </div>
            `;
            businessContainer.innerHTML += businessCard;
        });
    } catch (error) {
        console.error('Error fetching businesses:', error);
    }
}

// Call the functions on page load to display listed businesses and track user location
window.onload = () => {
    trackUserLocation();
    displayListedBusinesses();
};
