import { useQuery } from "@tanstack/react-query";
import { getClassInfo, getStudents } from "./api";

export function useGetStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    refetchOnWindowFocus: false,
  });
}

export function useGetClassInfo() {
  return useQuery({
    queryKey: ["class-info"],
    queryFn: getClassInfo,
    refetchOnWindowFocus: false,
  });
}
