import axios from "axios";
export const getAllClassList = async() =>{
    const classList = await axios.get("http://localhost:3000/class");
    return classList.data;
}