export type StudentData = {
  id: number;
  firstName: string;
  lastName: string;
  rollno: number;
  email: string;
  className: string;
  division: string;
  year: number;
  student_id: number;
};

export type ClassDivisions = {
  ClassNames: string[];
  Divisions: {
    [key: string]: string[];
  };
};
