import axios from "axios"
import { StudentForm } from "./types"

const BASE_URL = "http://localhost:5000"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const createStudent = async (data: StudentForm) =>{
    return (await axiosInstance.post("api/v1/student", data))
}