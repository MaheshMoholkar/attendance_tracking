import { useQuery } from "@tanstack/react-query";
import { getClassDivisions, getStudents, getSubjects } from "./api";

export function useGetStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    refetchOnWindowFocus: false,
  });
}

export function useGetClassInfo() {
  return useQuery({
    queryKey: ["class-divisions"],
    queryFn: getClassDivisions,
    refetchOnWindowFocus: false,
  });
}

export function useGetSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    refetchOnWindowFocus: false,
  });
}
