import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, deleteStudent, modifyStudent } from "./api";
import { StudentData } from "./types";

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StudentData) => createStudent(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useModifyStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StudentData) => modifyStudent(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
