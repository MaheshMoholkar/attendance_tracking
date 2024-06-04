import { useQuery } from "@tanstack/react-query";
import { getClassDivisions, getStudents } from "./api";

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
