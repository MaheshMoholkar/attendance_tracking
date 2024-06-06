import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { AttendanceData } from "@/services/types";
import { useSaveAttendance } from "@/services/mutations";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

type AttendanceListProps = {
  attendanceData: AttendanceData[];
  selectedMonth: number;
  selectedYear: number;
};

function AttendanceList({
  attendanceData,
  selectedMonth,
  selectedYear,
}: AttendanceListProps) {
  const [rowData, setRowData] = useState<AttendanceData[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "student_id", headerName: "Student ID", width: 120 },
  ]);
  const saveAttendanceMutation = useSaveAttendance();

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const numberOfDays = daysInMonth(selectedYear, selectedMonth - 1);

    const filteredData = attendanceData.filter(() => {});

    const newColDefs: ColDef[] = [
      { field: "student_id", headerName: "Student ID", width: 120 },
    ];
    for (let day = 1; day <= numberOfDays; day++) {
      newColDefs.push({
        field: day.toString(),
        headerName: day.toString(),
        width: 60,
        editable: true,
      });
    }

    setColDefs(newColDefs);
    setRowData(filteredData);
  }, [selectedMonth, selectedYear, attendanceData]);

  const handleSave = () => {
    saveAttendanceMutation.mutate(rowData, {
      onSuccess: () => {
        toast("Attendance updated successfully!");
      },
      onError: () => {
        toast.error("Failed to update attendance.");
      },
    });
  };

  return (
    <div className="mt-4">
      <div className="ag-theme-alpine h-[530px]">
        <AgGridReact rowData={rowData} columnDefs={colDefs}></AgGridReact>
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleSave}>Save Attendance</Button>
      </div>
    </div>
  );
}

export default AttendanceList;
