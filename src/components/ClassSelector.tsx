import { ChangeEvent } from "react";
import { ClassDivisions } from "@/services/types";

type ClassSelectorProps = {
  selectedClass: string;
  selectedDivision: string;
  handleClassChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDivisionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  classes: ClassDivisions;
};

function ClassSelector({
  selectedClass,
  selectedDivision,
  handleClassChange,
  handleDivisionChange,
  classes,
}: ClassSelectorProps) {
  const { ClassNames, Divisions } = classes;
  const selectedClassDivisions = Divisions[selectedClass] || [];

  return (
    <>
      <div className="flex items-center gap-2">
        <label>Class:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {ClassNames.map((className) => (
            <option key={className} value={className}>
              {className.toUpperCase()}
            </option>
          ))}
        </select>
        <label>Division:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedDivision}
          onChange={handleDivisionChange}
        >
          {selectedClassDivisions.map((division) => (
            <option key={division} value={division}>
              {division.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ClassSelector;
