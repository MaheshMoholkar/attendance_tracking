import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { AttendanceData } from "@/services/types";
import { Button } from "../components/ui/button";
import { Check, X } from "lucide-react";

type AttendanceListProps = {
  attendanceData: AttendanceData[];
  setAttendanceData: any;
  selectedMonth: number;
  selectedYear: number;
};

function CheckBox(props: any) {
  const handleToggle = () => {
    const updatedAttendance = {
      ...props.data.attendance,
      [props.column.colId]: !props.data.attendance[props.column.colId],
    };
    props.updateAttendance(props.data.student_id, updatedAttendance);
  };

  return (
    <Button
      variant="ghost"
      className={
        props.data.attendance[props.column.colId]
          ? "bg-green-200"
          : "bg-red-200"
      }
      onClick={handleToggle}
    >
      {props.data.attendance[props.column.colId] ? <Check /> : <X />}
    </Button>
  );
}

function AttendanceList({
  attendanceData,
  setAttendanceData,
  selectedMonth,
  selectedYear,
}: AttendanceListProps) {
  const [rowData, setRowData] = useState<AttendanceData[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "student_id", headerName: "Student ID", width: 120 },
  ]);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const updateAttendance = (studentId: number, updatedAttendance: any) => {
    setRowData((prevRowData) =>
      prevRowData.map((row) =>
        row.student_id === studentId
          ? { ...row, attendance: updatedAttendance }
          : row
      )
    );
  };

  useEffect(() => {
    const numberOfDays = daysInMonth(selectedYear, selectedMonth - 1);

    const newColDefs: ColDef[] = [
      {
        field: "student_id",
        headerName: "Student ID",
        width: 120,
        cellStyle: { fontWeight: "bold" },
      },
    ];
    for (let day = 1; day <= numberOfDays; day++) {
      newColDefs.push({
        field: day.toString(),
        width: 55,
        sortable: false,
        cellStyle: {
          borderColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        cellRenderer: (params: any) => (
          <CheckBox
            {...params}
            updateAttendance={updateAttendance}
            setAttendanceData={setAttendanceData}
          />
        ),
      });
    }

    setColDefs(newColDefs);
    setRowData(attendanceData);
  }, [selectedMonth, selectedYear, attendanceData]);

  return (
    <div className="mt-4">
      <div className="ag-theme-alpine h-[530px]">
        <AgGridReact rowData={rowData} columnDefs={colDefs}></AgGridReact>
      </div>
    </div>
  );
}

export default AttendanceList;
