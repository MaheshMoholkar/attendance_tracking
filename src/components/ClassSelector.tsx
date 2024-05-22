import { ClassInfo } from "@/services/types";
import { ChangeEvent } from "react";

type ClassSelectorProps = {
  selectedClass: string;
  selectedDivision: string;
  handleClassChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDivisionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  classes: ClassInfo[];
  divisions: string[];
};
function ClassSelector({
  selectedClass,
  selectedDivision,
  handleClassChange,
  handleDivisionChange,
  classes,
  divisions,
}: ClassSelectorProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <label>Class:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classes.map((value, index) => (
            <option key={index} value={value.className}>
              {value.className.toUpperCase()}
            </option>
          ))}
        </select>
        <label>Division:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedDivision}
          onChange={handleDivisionChange}
        >
          {divisions.map((division, index) => (
            <option key={index}>{division.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ClassSelector;
