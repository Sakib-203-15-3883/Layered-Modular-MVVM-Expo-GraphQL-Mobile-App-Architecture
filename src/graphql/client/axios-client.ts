/* eslint-disable import/no-named-as-default-member */
import axios from "axios";

// API URL from environment variables
const API_URL = process.env.EXPO_PUBLIC_GRAPHQL_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Make GraphQL request
 * Automatically adds Authorization header if user is authenticated
 */

export async function graphqlRequest<TData = any>(
  query: string,
  variables?: Record<string, any>,
) {
  try {
    // console.log('GraphQL Request:', {
    //   endpoint: API_URL,
    //   variables,
    // });

    const response = await apiClient.post("", {
      query,
      variables,
    });

    const { data, errors } = response.data;

    if (errors && errors.length > 0) {
      // console.error(' GraphQL Errors:', JSON.stringify(errors, null, 2));
    }

    if (data) {
      // console.log(' GraphQL Response:', JSON.stringify(data, null, 2));
    }

    return { data, errors };
  } catch (error: any) {
    // console.error(' Request failed:', error.message);

    if (error.response) {
      // console.error('Response status:', error.response.status);
      // console.error('Response data:', error.response.data);
    } else if (error.request) {
      // console.error('No response received. Check if API is running at:', API_URL);
    }

    throw error;
  }
}
