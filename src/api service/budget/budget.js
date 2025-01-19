import axios from "axios";
import { toast } from "react-toastify";


export const registerBudget = async (
    formData,
    setIsLoading
  ) => {
    const frontend = import.meta.env.VITE_BACKEND_URL;
  
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      await axios.post(`${frontend}/budget/register`, formData,config);
  
      toast.success("Budget addded successful!");
  
     
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

  export const getBudgets = async (setData, setIsLoading) => {
    const frontend = import.meta.env.VITE_BACKEND_URL;
  
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("id");
      const response = await axios.get(`${frontend}/budget/all/${userId}`);
      setData(response.data.budgets);
      console.log(response.data.budgets, "data to fom budget");
    } catch (err) {
      console.error("Error fetching budgets data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  