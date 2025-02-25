import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "http://0.0.0.0:4000"; // Backend server manzili

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tokenni o‘rnatish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Authorization");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// LOGIN - Foydalanuvchi tizimga kirishi
export async function login(data) {
  try {
    const response = await api.post("/user/login", data);
    const req = response.data;

    if (req.token) {
      localStorage.setItem("Authorization", req.token);
    }

    return req;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login amalga oshmadi";
    toast.error(`Xatolik: ${errorMessage}`);
    console.error(error);
    throw new Error(errorMessage);
  }
}

// REGISTER - Foydalanuvchi ro‘yxatdan o‘tishi
export async function register(data) {
  try {
    const response = await api.post("/user/register", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Ro‘yxatdan o‘tish amalga oshmadi";
    toast.error(`Xatolik: ${errorMessage}`);
    console.error(error);
    throw new Error(errorMessage);
  }
}

// GET - Ma'lumotlarni olish
export async function getDataFn(endpoint) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Xatolik yuz berdi!";
    toast.error(errorMessage);
    console.error(error);
    throw new Error(errorMessage);
  }
}

// POST - Yangi ma'lumot qo‘shish
export async function postDataFn(endpoint, data) {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Xatolik yuz berdi!";
    toast.error(errorMessage);
    console.error(error);
    throw new Error(errorMessage);
  }
}

export default api;
