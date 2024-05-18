import { useMutation } from "@tanstack/react-query";
import { createStudent } from "./api";
import { StudentForm } from "./types";


export function useCreateStudent() {
    return useMutation({
        mutationFn:(data:StudentForm)=>createStudent(data),
    })
}