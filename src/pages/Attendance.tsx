import { ChangeEvent, useEffect, useState } from "react";
import ClassSelector from "../components/ClassSelector";
import MonthSelector from "../components/MonthSelector";
import { Button } from "../components/ui/button";
import { useGetClassInfo } from "@/services/queries";
import { ClassInfo } from "@/services/types";
import AttendanceList from "../components/AttendanceList";
import moment from "moment/moment";

function Attendance() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [month, setMonth] = useState<string>(
    moment(selectedMonth).format("MM")
  );

  const [divisions, setDivisions] = useState<string[]>([]);
  const getClassesQuery = useGetClassInfo();

  useEffect(() => {
    if (getClassesQuery.data) {
      setClasses(getClassesQuery.data);
      if (getClassesQuery.data.length > 0) {
        setSelectedClass(getClassesQuery.data[0].className);
      }
    }
  }, [getClassesQuery.data]);

  useEffect(() => {
    const selectedClassInfo = classes.find(
      (cls) => cls.className === selectedClass
    );
    if (selectedClassInfo) {
      setDivisions(Object.keys(selectedClassInfo.divisions));
    } else {
      setDivisions([]);
    }
  }, [selectedClass, classes]);

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };
  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
  };

  const handleSearch = () => {
    const month = moment(selectedMonth).format("MM");
    setMonth(month);
  };

  return (
    <>
      <div className="px-10 mt-2">
        <h2 className="text-2xl font-bold">Attendance</h2>
        <div className="flex gap-4 items-center my-3 border rounded-lg shadow-sm p-3">
          <label>Select Month:</label>
          <MonthSelector setSelectedMonth={setSelectedMonth} />
          <ClassSelector
            selectedClass={selectedClass}
            selectedDivision={selectedDivision}
            classes={classes}
            divisions={divisions}
            handleClassChange={handleClassChange}
            handleDivisionChange={handleDivisionChange}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div>
          <AttendanceList selectedMonth={parseInt(month)} selectedYear={2024} />
        </div>
      </div>
    </>
  );
}

export default Attendance;
