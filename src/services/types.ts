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

export type AttendanceRecord = {
  [day: string]: boolean;
};

export type AttendanceData = {
  student_id: number;
  attendance: AttendanceRecord;
};

export interface AttendanceParams {
  className: string;
  divisionName: string;
  monthYear: string;
  subject: string;
}

export type SaveAttendancePayload = {
  rowData: AttendanceData[];
  className: string;
  divisionName: string;
  monthYear: string;
  subject: string;
};
