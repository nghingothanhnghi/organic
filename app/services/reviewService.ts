// app/services/reviewService.ts
import { axiosPrivate } from '../api/axios'; // Import axiosPrivate instance

// Define a function to get reviews for a specific product
export const getProductReviews = async (productId: number, page = 1, pageSize = 10) => {
  if (!productId || productId <= 0) {
    throw new Error('Invalid product ID');
  }
  try {
    const response = await axiosPrivate.get(`/ratings?filters[product][$eq]=${productId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ID ${productId}:`, error);
    throw error;
  }
};

// Define a function to submit a review for a product
export const submitProductReview = async (productId: number, reviewData: { score: number; reviewText: string; userId: number }) => {
  if (!productId || productId <= 0) {
    throw new Error('Invalid product ID');
  }

  // Ensure reviewData contains valid score, text, and userId
  if (!reviewData.score || !reviewData.reviewText || !reviewData.userId) {
    throw new Error('Review data is incomplete');
  }
  try {
    // Prepare the data payload for creating a new review according to Strapi's structure
    const payload = {
      data: {
        score: reviewData.score,
        reviewText: reviewData.reviewText,
        product: productId, // Linking the review to a specific product
        users_permissions_user: reviewData.userId, // Linking the review to a specific user
      },
    };

        // Log the productId, reviewData, and payload
        console.log('Submitting product review with the following details:');
        console.log('Product ID:', productId);
        console.log('Review Data:', reviewData);
        console.log('Payload:', JSON.stringify(payload, null, 2));

    // Submit the review to the backend
    const response = await axiosPrivate.post('/ratings', payload);
    
    // Log the response
    console.log('Response from the backend:', response.data);
    return response.data; // Return the submitted review data
  } catch (error) {
    console.error('Error submitting product review:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};
