import axios from "axios";

const HOST = '192.168.10.169'

const API = axios.create({
  baseURL: `http://${HOST}:5000/api/v1`,
})

export const login = async ({ email, password }) => {
  try {
    console.log('IN login');
    const response = await API.post("/authenticate", {
      email,
      password,
    });

    console.log(`response: ${response}`);

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response)
    }

  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (token) => {
  try {
    const response = await API.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response)
    }

  } catch (error) {
    console.log(error)
  }
}
