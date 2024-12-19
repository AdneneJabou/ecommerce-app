import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/commands"; // Adjust based on your backend URL

// 1. Create a new Command
export const createCommand = async (command) => {
  try {
    const response = await axios.post(API_BASE_URL, command);
    return response.data;
  } catch (error) {
    console.error("Error creating command:", error);
    throw error.response?.data || "Failed to create command";
  }
};

// 2. Get all Commands
export const getAllCommands = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching commands:", error);
    throw error.response?.data || "Failed to fetch commands";
  }
};

// 3. Get Command by ID
export const getCommandById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching command by ID:", error);
    throw error.response?.data || "Failed to fetch command";
  }
};

// 4. Update a Command
export const updateCommand = async (id, commandDetails) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, commandDetails);
    return response.data;
  } catch (error) {
    console.error("Error updating command:", error);
    throw error.response?.data || "Failed to update command";
  }
};

// 5. Delete a Command
export const deleteCommand = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting command:", error);
    throw error.response?.data || "Failed to delete command";
  }
};
