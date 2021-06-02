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

export const getTasks = async (token, filter, search) => {
  let query = '?'
  if (filter) {
    query += `filter=${filter}&`
  }
  if (search) {
    query += `search=${search}&`
  }
  try {
    const response = await API.get(`/tasks${query}`, {
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
