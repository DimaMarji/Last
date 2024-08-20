import axios, {AxiosRequestConfig} from 'axios';


const baseUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL

// Base configuration for Axios
const axiosInstance = axios.create({
    baseURL: baseUrl, // Replace with your base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// GET request
export const axiosGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
};

// POST request
export const axiosPost = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
};

// PUT request
export const axiosPut = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
};

// DELETE request
export const axiosDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
};
