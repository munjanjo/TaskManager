// task.js
import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

export const getTasks = () => {
    return axios.get(API_URL).then((res) => res.data);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
export const addTask = (title) => {
    return axios.put(API_URL, title, {
        headers: {
            "Content-Type": "text/plain",
        },
    });

};
export const markAsCompleted =(id)=>{
    return axios.put(`${API_URL}/${id}`);
}
export const updateTitle=(id,title)=>{
    return axios.put(`${API_URL}/update/${id}`,title,{headers:{ "Content-Type": "text/plain" }});
}