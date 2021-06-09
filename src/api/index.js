import axios from "axios";

//const HOST = '192.168.10.169' // Pelle
//const HOST = '192.168.0.48' //Renzo
const HOST = "10.0.2.2";

const API = axios.create({
  baseURL: `http://${HOST}:5000/api/v1`,
});

export const setDefaultHeaders = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const login = async ({ email, password }) => {
  try {
    const response = await API.post("/authenticate", {
      email,
      password,
    });

    if (response.status === 200) {
      setDefaultHeaders(response.data.token);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (filter, search) => {
  try {
    let query = "?";
    if (filter) {
      query += `filter=${filter}&`;
    }
    if (search) {
      query += `search=${search}&`;
    }
    const response = await API.get(`/tasks${query}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (payload) => {
  try {
    const response = await API.post("/tasks", payload);
    console.log(response);
    if (response.status === 200) {
      const getTasksResponse = await getTasks();
      return getTasksResponse;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, update) => {
  try {
    const response = await API.patch(`/tasks/${id}`, update);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (filter, search) => {
  let query = "?";
  if (filter) {
    query += `role=${filter}&`;
  }
  if (search) {
    query += `search=${search}&`;
  }
  try {
    const response = await API.get(`/users${query}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCredentials = async (credential, newValue) => {
  const payload = {
    [credential]: newValue,
  };

  try {
    const response = await API.patch("/me", payload);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const updatePassword = async (password, confirmPassword) => {
  const payload = {
    password,
    confirmPassword,
  };
  try {
    const response = await API.patch("/me", payload);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
