import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStudent,
  deleteStudent,
  getAttendanceList,
  modifyStudent,
  saveAttendance,
} from "./api";
import { AttendanceParams, SaveAttendancePayload, StudentData } from "./types";
import { toast } from "sonner";

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

export function useGetAttendanceList() {
  return useMutation({
    mutationFn: (params: AttendanceParams) => getAttendanceList(params),
    onSuccess: async () => {
      toast("Attendance List Fetched!");
    },
  });
}

export function useSaveAttendance() {
  return useMutation({
    mutationFn: (data: SaveAttendancePayload) => saveAttendance(data),
    onSuccess: async () => {
      toast("Attendance Saved!");
    },
  });
}
