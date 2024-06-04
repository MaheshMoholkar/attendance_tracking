import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassDivisions, StudentData } from "../services/types";
import { useCreateStudent } from "../services/mutations";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetClassInfo } from "@/services/queries";

function AddStudent() {
  const [classInfo, setClassInfo] = useState<ClassDivisions>({
    ClassNames: [],
    Divisions: {},
  });
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedDivision, setSelectedDivision] = useState<
    string | undefined
  >();
  const [divisions, setDivisions] = useState<string[]>([]);
  const [IsDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const createStudentMutation = useCreateStudent();
  const getClassInfoQuery = useGetClassInfo();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentData>();

  useEffect(() => {
    if (getClassInfoQuery.data) {
      setClassInfo(getClassInfoQuery.data);
      const initialClass = getClassInfoQuery.data.ClassNames[0];
      setSelectedClass(initialClass);
      setDivisions(getClassInfoQuery.data.Divisions[initialClass]);
    }
  }, [getClassInfoQuery.data]);

  useEffect(() => {
    if (selectedClass) {
      setDivisions(classInfo.Divisions[selectedClass] || []);
    }
  }, [selectedClass, classInfo]);

  const onSubmit = (data: StudentData) => {
    data = {
      ...data,
      rollno: parseInt(data.rollno.toString(), 10),
      year: parseInt(data.year.toString(), 10),
      studentID: parseInt(data.studentID.toString(), 10),
    };

    createStudentMutation.mutate(data, {
      onSuccess: () => {
        handleCloseDialog();
        reset();
        toast("New Student Added");
      },
    });
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const year = watch("year") || new Date().getFullYear();

  useEffect(() => {
    setValue("firstName", firstName?.trim());
    setValue("lastName", lastName?.trim());
    setValue("email", email?.trim());
    setValue("year", year);
  }, [firstName, lastName, email, setValue]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={IsDialogOpen}
        onOpenChange={() => setIsDialogOpen(!IsDialogOpen)}
      >
        <DialogTrigger asChild>
          <Button onClick={handleOpenDialog}>Add Student</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Student Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-2 flex flex-col ">
              <label>First Name</label>
              <Input
                placeholder="John"
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Last Name</label>
              <Input
                placeholder="Doe"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Rollno</label>
              <Input {...register("rollno", { required: true })} />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Email</label>
              <Input placeholder="example@gmail.com" {...register("email")} />
            </div>
            <div className="flex flex-col py-1 gap-1">
              <label>Select Class</label>
              <select
                className="p-3 border rounded-lg disabled:opacity-75"
                {...register("className", { required: true })}
                onChange={handleClassChange}
              >
                {classInfo.ClassNames.map((className: string) => (
                  <option key={className} value={className}>
                    {className?.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col py-1 gap-1">
              <label>Select Division</label>
              <select
                className="p-3 border rounded-lg disabled:opacity-75"
                {...register("division", { required: true })}
                onChange={handleDivisionChange}
                value={selectedDivision}
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division?.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Year</label>
              <Input
                type="number"
                {...register("year", { required: true, min: 2000, max: 2100 })}
              />
            </div>
            <DialogFooter>
              <div className="flex gap-2 items-center justify-end mt-3">
                <Button type="submit">Add</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddStudent;
