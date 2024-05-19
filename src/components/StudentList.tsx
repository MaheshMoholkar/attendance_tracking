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

const pagination = true;
const paginationPageSize = 25;
const paginationPageSizeSelector = [25, 50, 100];

type StudentListProps = {
  studentList: StudentData[];
};

type DisplayData = {
  firstName: string;
  lastName: string;
  rollno: number;
  email: string;
  class: string;
  division: string;
  actions?: any;
};

const ActionButtons = (props: any) => {
  const handleAction = (action: string, studentData?: DisplayData) => {
    if (action === "modify") {
      props.setModifyDialogProps({ action: "modify", studentData });
    } else if (action === "view") {
      props.setModifyDialogProps({ action: "view", studentData });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          handleAction("view", props.data);
        }}
      >
        <Eye />
      </Button>
      <Button
        variant="link"
        onClick={() => {
          handleAction("modify", props.data);
        }}
      >
        <Edit />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently student and
              remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleAction("delete", props.data);
              }}
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
    studentData?: DisplayData;
  } | null>(null);
  const colDefs: ColDef<DisplayData>[] = [
    { field: "rollno", flex: 1 },
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    {
      field: "class",
      flex: 1,
      filter: true,
      valueFormatter: (p) => p.value.toUpperCase(),
    },
    {
      field: "division",
      flex: 1,
      filter: true,
      valueFormatter: (p) => p.value.toUpperCase(),
    },
    { field: "email", flex: 2 },
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
  const [rowData, setRowData] = useState<DisplayData[]>();

  const [search, setSearch] = useState<string>();

  useEffect(() => {
    setRowData(studentList);
  }, [studentList]);

  return (
    <>
      <div className="mt-4 ag-theme-quartz h-[500px]">
        <div className="flex gap-2">
          <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-3 max-w-sm">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex mb-3 px-8 border border-gray-300 rounded-lg p-2 text-gray-600 font-bold text-lg ">
            {studentList && studentList.length != 0
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
