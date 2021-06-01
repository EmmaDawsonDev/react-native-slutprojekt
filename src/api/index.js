import axios from "axios";

const API = axios.create({
  baseURL: "http://10.0.2.2:5000/api/v1",
});

export const login = async ({ email, password }) => {
  try {
    console.log("I am here", email, password);
    const response = await API.post("authenticate", {
      email,
      password,
    });

    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.log("I am in catch", error);
  }
};
