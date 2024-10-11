---

# Township Small Business Chatbot Algorithm Directory Listing Web App

![Logo](link-to-your-logo-image)  
**Connecting Local Businesses with Their Community**

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Geo-Location Tracking](#geo-location-tracking)
- [Contributing](#contributing)
- [License](#license)

## About

The **Township Small Business Chatbot Algorithm** is a full-stack web application designed to empower township businesses by connecting them with customers in their local community. The platform allows businesses to register, list their products and services, and be discovered by customers. Customers can search for businesses, request services, and use geo-location tracking for seamless delivery.

This platform is driven by an AI chatbot, which helps customers find businesses quickly, make inquiries, and order services, all while tracking locations in real-time.

## Features

- **Business Directory Listing**: Local businesses can register and list their products/services with details like business name, description, contact information, and images.
- **Geo-Location Tracking**: Both businesses and users can enable GPS geo-tracking for delivery and location-based service requests.
- **Search Functionality**: Customers can search for businesses by name or category.
- **AI Chatbot Integration**: The chatbot helps users navigate the directory, find businesses, and get instant responses to queries.
- **Responsive Design**: Mobile-first design ensures accessibility on any device.
- **Advertising Space**: Feature available for larger businesses to display advertisements.

## Technology Stack

- **Frontend**: Svelte, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Atlas for cloud database management)
- **AI Integration**: Gemini Chatbot (via LangChain and Google Generative AI)
- **Geo-Location**: GPS location tracking
- **Version Control**: Git, GitHub
- **Deployment**: Netlify (Frontend), Vercel/Heroku (Backend)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Richjerk/kasi-business-directory.git
   cd kasi-business-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your MongoDB instance and configure your `.env` file with the necessary environment variables (see below).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Business Registration
- Businesses can sign up via the **Register Your Business** page, providing details like name, address, phone number, and an image of their products/services.
- Once registered, businesses will automatically appear on the **Listed Businesses** page for customers to browse.

### Customer Interaction
- Customers can search for businesses, view details, and use the **Search for Business** functionality to locate specific services or businesses.
- The platform’s chatbot is available for customer assistance and queries.

### GPS Geo-Location
- The web app integrates GPS tracking, allowing users to track businesses for deliveries and location-based services.

## Environment Variables

The following environment variables are required:

```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=<port-number>
GEO_API_KEY=<api-key-for-geo-location-services>
GEMINI_API_KEY=<gemini-chatbot-api-key>
```

Create a `.env` file in the root directory with these variables.

## API Endpoints

Here are the main API endpoints:

- **Register Business**: `POST /register-business`
  - Registers a new business with the provided details.
  
- **List Businesses**: `GET /businesses`
  - Fetches all the registered businesses.
  
- **Search Business**: `GET /search-business`
  - Search for businesses by name (case-insensitive).
  
- **Business Details**: `GET /business/:id`
  - Fetches details of a specific business by its ID.

## Geo-Location Tracking

The platform uses the device's GPS to enable businesses and customers to track location in real time. This is crucial for businesses that offer delivery services. The GPS system is integrated into the registration forms for both businesses and customers.

To enable geo-location tracking:

- Ensure the user's device allows location permissions.
- The business's location will be stored and used for tracking.
  
The platform leverages modern web APIs to handle location data and integrate it seamlessly with delivery services.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

---

