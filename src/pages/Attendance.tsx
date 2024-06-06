import { ChangeEvent, useEffect, useState } from "react";
import ClassSelector from "../components/ClassSelector";
import MonthSelector from "../components/MonthSelector";
import { Button } from "../components/ui/button";
import { useGetClassInfo } from "@/services/queries";
import { AttendanceData, ClassDivisions } from "@/services/types";
import AttendanceList from "../components/AttendanceList";
import moment from "moment/moment";
import { useGetAttendanceList } from "@/services/mutations";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

function Attendance() {
  const [classes, setClasses] = useState<ClassDivisions>({
    ClassNames: [],
    Divisions: {},
  });
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [month, setMonth] = useState<string>(
    moment(selectedMonth).format("MM")
  );
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  const getClassesQuery = useGetClassInfo();
  const getAttendanceListMutation = useGetAttendanceList();

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
    const month = moment(selectedMonth).format("YYYY-MM");
    setMonth(month);
    getAttendanceListMutation.mutate(
      {
        className: selectedClass,
        divisionName: selectedDivision,
        date: month,
      },
      {
        onSuccess: (response: AxiosResponse) => {
          const data: AttendanceData[] = response.data;
          setAttendanceData(data);
          toast("Attendance Fetched!");
        },
      }
    );
  };

  return (
    <>
      <div className="mt-7">
        <h2 className="font-bold text-2xl flex justify-between items-center text-gray-700">
          Attendance
        </h2>
        <div className="flex gap-4 items-center my-3 border rounded-lg shadow-sm p-3 bg-white">
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
          <AttendanceList
            selectedMonth={parseInt(month)}
            selectedYear={new Date().getFullYear()}
            attendanceData={attendanceData}
          />
        </div>
      </div>
    </>
  );
}

export default Attendance;
