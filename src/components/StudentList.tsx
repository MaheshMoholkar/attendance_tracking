import { StudentData } from "@/services/types";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { Edit, Search, Trash } from "lucide-react";
import { Button } from "./ui/button";

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

const DeleteButton = () => {
  return (
    <>
      <Button
        variant="link"
        onClick={() => {
          console.log("edit");
        }}
      >
        <Edit />
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          console.log("delete");
        }}
      >
        <Trash />
      </Button>
    </>
  );
};

function StudentList({ studentList }: StudentListProps) {
  const colDefs: ColDef<DisplayData>[] = [
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "rollno", flex: 1 },
    { field: "email", flex: 2 },
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
    // { field: "edit", cellRenderer: EditButton, flex: 2 / 3 },
    {
      field: "actions",
      cellRenderer: DeleteButton,
      flex: 3 / 2,
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
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-3 max-w-sm">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={(event) => setSearch(event.target.value)}
          />
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
    </>
  );
}

export default StudentList;
