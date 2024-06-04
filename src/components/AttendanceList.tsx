import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

type AttendanceData = {
  name: string;
  [key: string]: any; // Allow dynamic properties
};

type AttendanceListProps = {
  selectedMonth: number;
  selectedYear: number;
};

function AttendanceList({ selectedMonth, selectedYear }: AttendanceListProps) {
  const attendance: AttendanceData[] = [
    { name: "mahesh", present: true },
    { name: "santosh", present: true },
    { name: "vaibhav", present: true },
  ];

  const [rowData, setRowData] = useState<AttendanceData[]>(attendance);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "name", width: 100 },
    { field: "present", width: 100, editable: true },
  ]);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate(); // Correct month calculation
  };

  useEffect(() => {
    const numberOfDays = daysInMonth(selectedYear, selectedMonth - 1);

    // Generate new column definitions
    const newColDefs: ColDef[] = [{ field: "name", width: 100 }];
    for (let day = 1; day <= numberOfDays; day++) {
      newColDefs.push({
        field: `${day}`,
        width: 60,
        editable: true,
        sortable: false,
        cellStyle: () => {
          return { borderColor: "transparent" };
        },
      });
    }

    // Update state only if the new column definitions differ from the current ones
    setColDefs((prevColDefs) => {
      const prevColsString = JSON.stringify(prevColDefs);
      const newColsString = JSON.stringify(newColDefs);
      if (prevColsString !== newColsString) {
        return newColDefs;
      }
      return prevColDefs;
    });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="mt-4 ag-theme-alpine h-[530px]">
      <AgGridReact rowData={rowData} columnDefs={colDefs}></AgGridReact>
    </div>
  );
}

export default AttendanceList;
