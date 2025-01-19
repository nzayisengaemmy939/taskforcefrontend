import axios from "axios";
import { toast } from "react-toastify";

export const getTransactions = async (setData, setIsLoading) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
    setIsLoading(true);
    const userId = localStorage.getItem("id");
    const response = await axios.get(`${frontend}/transaction/all/${userId}`);
    setData(response.data.transactions);
   
  } catch (err) {
  
  } finally {
    setIsLoading(false);
  }
};

export const registerTransactions = async (formData, setIsLoading) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
    setIsLoading(true);
    console.log(formData,'form data to submit')

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${frontend}/transaction/register`,
      formData,
      config
    );

    toast.success(response.data.message);

    
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



export const updateTransaction = async (transactionId, updatedData, setIsLoading) => {
  try {
    setIsLoading(true);
    const frontend = import.meta.env.VITE_BACKEND_URL;
   
    const response = await axios.put(`${frontend}/transaction/edit/${transactionId}`, updatedData);

    if (response.status === 200) {
      const updatedTransactions = response.data 
      
     ; 
      setIsLoading(false);
      return true; 
    } else {
      setIsLoading(false);
   
      return false;
    }
  } catch (error) {
    setIsLoading(false);
  
    return false;
  }
};


export const deleteTransaction = async (transactionId, setIsLoading) => {
  try {
    setIsLoading(true);
    const frontend = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.delete(`${frontend}/transaction/delete/${transactionId}`);

    if (response.status === 200) {
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      
      return false;
    }
  } catch (error) {
    setIsLoading(false);
   
    return false;
  }
};
export const getReport = async (setReport) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
   
    const userId = localStorage.getItem("id");
    const response = await axios.get(`${frontend}/transaction/report/${userId}`);

    setReport(response.data.data);
  
  } catch (err) {
    console.error("Error in generating report data:", err);
  } 
};

export const getExpenseReport = async (setExpenseReport) => {
  const frontend = import.meta.env.VITE_BACKEND_URL;

  try {
   
    const userId = localStorage.getItem("id");
    const response = await axios.get(`${frontend}/transaction/report/expense/${userId}`);

    setExpenseReport(response.data.data);
   ;
  } catch (err) {
    console.error("Error in generating report data:", err);
  } 
};

