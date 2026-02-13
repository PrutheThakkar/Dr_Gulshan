import React, { useState, useEffect } from 'react';

const GoogleReviews = () => {
  // State to store reviews, loading state, and error state
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the reviews from Google API
  useEffect(() => {
    const fetchReviews = async () => {
      const apiKey = process.env.GATSBY_GOOGLE_API_KEY; // API Key from .env
      const placeId = process.env.GATSBY_GOOGLE_PLACE_ID; // Place ID from .env



      // Construct the API URL
      const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.result.reviews) {
          setReviews(data.result.reviews); // Set reviews if successful
        } else {
          setError('Unable to fetch reviews.'); // Handle error if no reviews are found
        }
      } catch (err) {
        setError('Error fetching reviews'); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchReviews(); // Fetch reviews on component mount
  }, []); // Empty dependency array means this effect runs only once on mount

  // Loading and error handling
  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  // Displaying the reviews
  return (
    <div>
      <h2>Google Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.author_name}</strong>
            <p>Rating: {review.rating} / 5</p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleReviews;
