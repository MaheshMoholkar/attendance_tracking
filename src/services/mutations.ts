import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "./api";
import { StudentData } from "./types";

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StudentData) => createStudent(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["students"] });
      }
    },
  });
}
