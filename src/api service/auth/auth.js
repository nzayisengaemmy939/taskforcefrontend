import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = async (
  formData,
  navigate,

  setIsLoading
) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
    setIsLoading(true);
    await axios.post(`${frontend}/auth/register`, formData);

    toast.success("Signup successful!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const loginUser = async (formData, navigate, setIsLoading) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  setIsLoading(true);

  try {
    const frontend = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${frontend}/auth/login`, formData);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.user._id);

    console.log(response.data);

    toast.success("Login successful!");

    setTimeout(() => {
      navigate("/dashboard");
      console.log("Navigating to dashboard");
    }, 1000);
  } catch (error) {
    console.error("Error submitting form:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const resetPassword = async (formData, setIsLoading) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  setIsLoading(true);

  try {
    const frontend = import.meta.env.VITE_BACKEND_URL;
    const id = localStorage.getItem("id");
    const response = await axios.post(`${frontend}/auth/send/email`, formData);
    toast.success("Reset email sent!");
  } catch (error) {
    console.error("Error submitting form:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const getProfile = async (setData, setIsLoading) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
    setIsLoading(true);
    const userId = localStorage.getItem("id");
    const response = await axios.get(`${frontend}/auth/get/profile/${userId}`);
    setData(response.data.data);
    console.log(response.data.data, "data to know");
  } catch (err) {
    console.error("Error fetching  data:", err);
  } finally {
    setIsLoading(false);
  }
};

export const updateProfile = async (userData, setIsLoading) => {
  try {
    setIsLoading(true);
    const frontend = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem("id");
    const response = await axios.put(
      `${frontend}/auth/update/profile/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsLoading(false);
    return response.data;
  } catch (error) {
    setIsLoading(false);
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updatePassword = async (passData, setIsLoading) => {
  try {
    setIsLoading(true);
    const frontend = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem("id");
    const response = await axios.put(
      `${frontend}/auth/update/password/${userId}`,
      passData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsLoading(false);
    return response.data;
  } catch (error) {
    setIsLoading(false);
    console.error("Error updating password:", error);
    throw error;
  }
};
