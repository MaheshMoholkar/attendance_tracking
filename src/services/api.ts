import axios from "axios";
import { AttendanceParams, SaveAttendancePayload, StudentData } from "./types";

const BASE_URL = "http://localhost:8001";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getClassDivisions = async () => {
  return (await axiosInstance.get("api/v1/class-divisions")).data;
};

export const getSubjects = async () => {
  return (await axiosInstance.get("api/v1/subject")).data;
};

export const getStudents = async () => {
  return (await axiosInstance.get("api/v1/students")).data;
};

export const createStudent = async (data: StudentData) => {
  return await axiosInstance.post("api/v1/student", data);
};

export const modifyStudent = async (data: StudentData) => {
  return await axiosInstance.put("api/v1/student", data);
};

export const deleteStudent = async (id: number) => {
  return await axiosInstance.delete("api/v1/student", {
    params: {
      student_id: id,
    },
  });
};

export const getAttendanceList = async (params: AttendanceParams) => {
  return (
    await axiosInstance.get("api/v1/attendance", {
      params: {
        class_name: params.className,
        division_name: params.divisionName,
        month_year: params.monthYear,
        subject: params.subject,
      },
    })
  ).data;
};

export const saveAttendance = async (data: SaveAttendancePayload) => {
  console.log(data);
  return await axiosInstance.post("api/v1/attendance", data);
};
