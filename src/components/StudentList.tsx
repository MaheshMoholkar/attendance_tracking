import { StudentData } from "@/services/types";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Edit, Eye, Search, Trash } from "lucide-react";
import { Button } from "./ui/button";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ModifyStudent from "./ModifyStudent";
import { useDeleteStudent } from "@/services/mutations";

const pagination = true;
const paginationPageSize = 25;
const paginationPageSizeSelector = [25, 50, 100];

type StudentListProps = {
  studentList: StudentData[];
};

export type DisplayData = {
  id: number;
  student_id: number;
  firstName: string;
  lastName: string;
  rollno: number;
  email: string;
  className: string;
  division: string;
  year: number;
  actions?: any;
};

const ActionButtons = (props: any) => {
  const deleteStudentMutation = useDeleteStudent();
  const handleAction = async (action: string, studentData?: DisplayData) => {
    if (action === "modify") {
      props.setModifyDialogProps({ action: "modify", studentData });
    } else if (action === "view") {
      props.setModifyDialogProps({ action: "view", studentData });
    } else if (action === "delete") {
      if (studentData !== undefined) {
        await deleteStudentMutation.mutateAsync(
          parseInt(studentData.student_id.toString())
        );
      }
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={() => handleAction("view", props.data)}>
        <Eye />
      </Button>
      <Button variant="link" onClick={() => handleAction("modify", props.data)}>
        <Edit />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              student and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleAction("delete", props.data)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

function StudentList({ studentList }: StudentListProps) {
  const [modifyDialogProps, setModifyDialogProps] = useState<{
    action: "view" | "modify";
    studentData?: StudentData;
  } | null>(null);

  const colDefs: ColDef<DisplayData>[] = [
    { field: "student_id", headerName: "Student ID", flex: 1 },
    { field: "rollno", flex: 1 },
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    {
      field: "className",
      flex: 1,
      filter: true,
      valueFormatter: (p) => (p.value ? p.value.toUpperCase() : ""),
    },
    {
      field: "division",
      flex: 1,
      filter: true,
      valueFormatter: (p) => (p.value ? p.value.toUpperCase() : ""),
    },
    {
      field: "year",
      flex: 1,
    },
    {
      field: "actions",
      cellRenderer: (props: any) => (
        <ActionButtons
          data={props.data}
          setModifyDialogProps={setModifyDialogProps}
        />
      ),
      flex: 2,
      cellStyle: () => {
        return { borderColor: "transparent" };
      },
    },
  ];

  const [rowData, setRowData] = useState<DisplayData[]>([]);

  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (studentList) {
      const transformedData = studentList.map((student) => ({
        id: student.id,
        student_id: student.student_id,
        firstName: student.firstName,
        lastName: student.lastName,
        rollno: student.rollno,
        email: student.email,
        className: student.className,
        division: student.division,
        year: student.year,
      }));
      setRowData(transformedData);
    }
  }, [studentList]);

  return (
    <>
      <div className="mt-4 ag-theme-quartz h-[550px]">
        <div className="flex gap-2">
          <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-3 max-w-sm bg-white">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full bg-transparent"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex mb-3 px-8 border border-gray-300 rounded-lg p-2 text-gray-600 font-bold text-lg bg-white">
            {studentList && studentList.length !== 0
              ? `Total Students: ${studentList.length}`
              : "No Students"}
          </div>
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={search}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
      {modifyDialogProps && (
        <ModifyStudent
          action={modifyDialogProps.action}
          studentData={modifyDialogProps.studentData}
          onClose={() => setModifyDialogProps(null)}
        />
      )}
    </>
  );
}

export default StudentList;
