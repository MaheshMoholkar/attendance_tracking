import { useEffect, useState, ChangeEvent } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import {
  AttendanceData,
  ClassDivisions,
  SaveAttendancePayload,
} from "@/services/types";
import ClassSelector from "../components/ClassSelector";
import MonthSelector from "../components/MonthSelector";
import { Button } from "../components/ui/button";
import { useGetClassInfo } from "@/services/queries";
import { useGetAttendanceList, useSaveAttendance } from "@/services/mutations";
import { toast } from "sonner";
import moment from "moment";
import { AxiosResponse } from "axios";
import { Check, Minus, X } from "lucide-react";

function Attendance() {
  const [classes, setClasses] = useState<ClassDivisions>({
    ClassNames: [],
    Divisions: {},
  });
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [subjectName, setSubjectName] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [rowData, setRowData] = useState<AttendanceData[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "student_id", headerName: "Student ID", width: 120 },
  ]);

  const getClassesQuery = useGetClassInfo();
  const getAttendanceListMutation = useGetAttendanceList();
  const saveAttendanceMutation = useSaveAttendance();

  useEffect(() => {
    if (getClassesQuery.data) {
      setClasses(getClassesQuery.data);
      const classNames = getClassesQuery.data.ClassNames;
      if (classNames.length > 0) {
        setSelectedClass(classNames[0]);
      }
    }
  }, [getClassesQuery.data]);

  useEffect(() => {
    const selectedClassDivisions = classes.Divisions[selectedClass] || [];
    setSelectedDivision(selectedClassDivisions[0] || "");
  }, [selectedClass, classes]);

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    const selectedClassDivisions = classes.Divisions[selectedClass] || [];
    setSelectedDivision(selectedClassDivisions[0] || "");
  };

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
  };

  const handleSearch = () => {
    const month = moment(selectedMonth).format("MM_YYYY");
    getAttendanceListMutation.mutate(
      {
        className: selectedClass,
        divisionName: selectedDivision,
        monthYear: month,
        subject: "ot",
      },
      {
        onSuccess: (response: AxiosResponse) => {
          const data: AttendanceData[] = response.data;
          setAttendanceData(data);
          setRowData(data);
        },
      }
    );
  };

  const handleSave = () => {
    const month = moment(selectedMonth).format("MM_YYYY");
    const payload: SaveAttendancePayload = {
      rowData,
      className: selectedClass,
      divisionName: selectedDivision,
      monthYear: month,
      subject: "ot",
    };
    saveAttendanceMutation.mutate(payload, {
      onSuccess: () => {
        toast("Attendance updated successfully!");
      },
      onError: () => {
        toast.error("Failed to update attendance.");
      },
    });
  };

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const updateAttendance = (studentId: number, updatedAttendance: any) => {
    const updatedRowData = rowData.map((row) =>
      row.student_id === studentId
        ? { ...row, attendance: updatedAttendance }
        : row
    );
    setRowData(updatedRowData);
    setAttendanceData(updatedRowData);
  };

  useEffect(() => {
    const numberOfDays = daysInMonth(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth()
    );

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
        field: `attendance.${day}`,
        headerName: day.toString(),
        width: 55,
        sortable: false,
        cellStyle: {
          borderColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        cellRenderer: (params: any) => (
          <Button
            variant="ghost"
            className={
              params.data.attendance[params.colDef.headerName] == true ||
              params.data.attendance[params.colDef.headerName] == false
                ? params.data.attendance[params.colDef.headerName] == true
                  ? "bg-green-200 hover:text-green-600"
                  : "bg-red-200 hover:text-red-600"
                : "bg-white hover:bg-slate-200"
            }
            onClick={() => {
              const updatedAttendance = {
                ...params.data.attendance,
                [params.colDef.headerName]:
                  !params.data.attendance[params.colDef.headerName],
              };
              updateAttendance(params.data.student_id, updatedAttendance);
            }}
          >
            {params.data.attendance[params.colDef.headerName] == true ||
            params.data.attendance[params.colDef.headerName] == false ? (
              params.data.attendance[params.colDef.headerName] == true ? (
                <Check />
              ) : (
                <X />
              )
            ) : (
              <Minus />
            )}
          </Button>
        ),
      });
    }

    setColDefs(newColDefs);
    setRowData(attendanceData);
  }, [selectedMonth, attendanceData]);

  return (
    <>
      <div className="mt-7">
        <h2 className="font-bold text-2xl flex justify-between items-center text-gray-700">
          Attendance
        </h2>
        <div className="flex justify-between my-3 border rounded-lg shadow-sm p-3 bg-white">
          <div className="flex gap-4 items-center">
            <label>Select Month:</label>
            <MonthSelector setSelectedMonth={setSelectedMonth} />
            <ClassSelector
              selectedClass={selectedClass}
              selectedDivision={selectedDivision}
              classes={classes}
              handleClassChange={handleClassChange}
              handleDivisionChange={handleDivisionChange}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <div>
            <Button onClick={handleSave}>Save Attendance</Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="ag-theme-alpine h-[530px]">
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
