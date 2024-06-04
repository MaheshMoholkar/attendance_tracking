import { useEffect, useState } from "react";
import { StudentData } from "@/services/types";
import { useGetStudents } from "@/services/queries";
import StudentList from "../components/StudentList";
import AddStudent from "../components/AddStudent";

function Student() {
  const [studentList, setStudentList] = useState<StudentData[]>([]);
  const getStudentsQuery = useGetStudents();

  useEffect(() => {
    if (getStudentsQuery.data) {
      setStudentList(getStudentsQuery.data);
    }
  }, [getStudentsQuery.data]);

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl flex justify-between items-center text-gray-700">
        Students
        <AddStudent />
      </h2>
      <StudentList studentList={studentList} />
    </div>
  );
}

export default Student;
