// BusinessList.js

import React, { useEffect, useState } from 'react';
import { getBusinesses } from './apiService'; // Ensure this path is correct

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error('Error fetching businesses:', error); // Log the error for debugging
        setError('Failed to fetch businesses');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <h1>Business Listings</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business._id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
            <p>{business.email}</p>
            <p>{business.phone}</p>
            <p>{business.address}</p>
            {business.imageUrl && <img src={business.imageUrl} alt={business.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;

