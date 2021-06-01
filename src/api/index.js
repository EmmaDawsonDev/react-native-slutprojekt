import axios from "axios";

// const API = axios.create({
//   baseURL: "http://10.0.2.2:5000/api/v1",
// });

const API = axios.create({
  baseURL: "http://192.168.0.48:5000/api/v1",
});

// 192.168.0.48.

export const login = async ({ email, password }) => {
  try {
    const response = await API.post("/authenticate", {
      email,
      password,
    });

    if(response.status === 200){
      return response.data
    }else{
      throw new Error(response)
    }

  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (token) => {
  try {
    const response = await API.get("/tasks", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(response.status === 200){
      return response.data
    }else{
      throw new Error(response)
    }

  } catch (error) {
    console.log(error)
  }
}
