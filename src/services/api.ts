import axios from "axios";
import { StudentData } from "./types";

const BASE_URL = "http://localhost:8001";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getClassDivisions = async () => {
  return (await axiosInstance.get("api/v1/class-divisions")).data;
};

export const getStudents = async () => {
  return (await axiosInstance.get("api/v1/students")).data;
};

export const createStudent = async (data: StudentData) => {
  return await axiosInstance.post("api/v1/student", data);
};

export const modifyStudent = async (data: StudentData) => {
  return await axiosInstance.post("api/v1/student", data);
};

export const deleteStudent = async (id: number) => {
  return await axiosInstance.delete(`api/v1/student?student_id=${id}`);
};
