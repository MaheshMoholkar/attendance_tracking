import { ChangeEvent } from "react";
import { ClassDivisions, Subject } from "@/services/types";

type ClassSelectorProps = {
  selectedClass: string;
  selectedDivision: string;
  handleClassChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDivisionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  classes: ClassDivisions;
  selectedSubject: string;
  handleSubjectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  subjects: Subject[];
};

function ClassSelector({
  selectedClass,
  selectedDivision,
  handleClassChange,
  handleDivisionChange,
  classes,
  selectedSubject,
  handleSubjectChange,
  subjects,
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
        <label>Subject:</label>
        <select
          className="p-2 border rounded-lg"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          {subjects.map((subject) => (
            <option key={subject.SubjectID} value={subject.Subjectname}>
              {subject.Subjectname.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ClassSelector;
