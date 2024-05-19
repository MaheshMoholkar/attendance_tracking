import { useQuery } from "@tanstack/react-query";
import { getStudents } from "./api";

export function useGetStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    refetchOnWindowFocus: false,
  });
}
