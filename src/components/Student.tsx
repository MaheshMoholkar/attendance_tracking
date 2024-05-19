import { useEffect, useState } from "react";
import AddNewStudent from "./AddNewStudent";
import { StudentData } from "@/services/types";
import { useGetStudents } from "@/services/queries";
import StudentList from "./StudentList";

function Student() {
  const [studentList, setStudentList] = useState<StudentData[]>([]);
  const getStudentsQuery = useGetStudents();

  useEffect(() => {
    setStudentList(getStudentsQuery.data);
  }, [studentList]);
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent />
      </h2>
      <StudentList studentList={studentList} />
    </div>
  );
}

export default Student;
