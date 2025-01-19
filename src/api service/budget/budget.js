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

  export const deleteBudget = async (budgetId, setIsLoading) => {
    try {
      setIsLoading(true);
      const frontend = import.meta.env.VITE_BACKEND_URL;
  
      const response = await axios.delete(`${frontend}/budget/delete/${budgetId}`);
  
      if (response.status === 200) {
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        console.error("Failed to delete budget");
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting budget:", error);
      return false;
    }
  };
  