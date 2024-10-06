// apiService.js

// Fetch businesses from the API
export const getBusinesses = async () => {
    try {
        const response = await fetch(`${process.env.API_SERVICE}/businesses`, {
            method: 'GET', // Ensure the method is specified
            headers: {
                'Content-Type': 'application/json', // Specify content type if needed
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching businesses:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
