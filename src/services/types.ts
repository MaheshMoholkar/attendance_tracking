export type StudentData = {
  firstName: string;
  lastName: string;
  rollno: number;
  email: string;
  className: string;
  division: string;
  year: number;
};

export type ClassData = {
  id: number;
  className: string;
};

export type ClassInfo = {
  className: string;
  divisions: { [division: string]: boolean };
};
