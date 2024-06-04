import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassDivisions, StudentData } from "@/services/types";
import { useCreateStudent, useModifyStudent } from "@/services/mutations";
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
import { DisplayData } from "./StudentList";

type ActionType = "view" | "modify" | undefined;

type ModifyStudentProps = {
  action?: ActionType;
  studentData?: DisplayData;
  onClose?: () => void;
};

function ModifyStudent({ action, studentData, onClose }: ModifyStudentProps) {
  const [classInfo, setClassInfo] = useState<ClassDivisions>({
    ClassNames: [],
    Divisions: {},
  });
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    studentData?.className
  );
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    studentData?.division
  );

  const [IsDialogOpen, setIsDialogOpen] = useState(
    action === "view" || action === "modify"
  );
  const createStudentMutation = useCreateStudent();
  const modifyStudentMutation = useModifyStudent();
  const getClassInfoQuery = useGetClassInfo();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentData>({ defaultValues: studentData });

  useEffect(() => {
    if (getClassInfoQuery.data) {
      setClassInfo(getClassInfoQuery.data);
    }
  }, [getClassInfoQuery.data]);

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    setSelectedDivision(undefined);
  };

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
  };

  const onSubmit = (data: StudentData) => {
    data = {
      ...data,
      rollno: parseInt(data.rollno.toString(), 10),
      year: parseInt(data.year.toString(), 10),
    };
    if (action === "modify") {
      modifyStudentMutation.mutate(data, {
        onSuccess: () => {
          onClose && onClose();
          reset();
          toast("Student Details Updated");
        },
      });
    } else {
      createStudentMutation.mutate(data, {
        onSuccess: () => {
          handleCloseDialog();
          reset();
          toast("New Student Added");
        },
      });
    }
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const className = watch("className");
  const division = watch("division");
  const year = watch("year") || new Date().getFullYear();

  useEffect(() => {
    setValue("firstName", firstName?.trim());
    setValue("lastName", lastName?.trim());
    setValue("email", email?.trim());
    setSelectedClass(className);
    setSelectedDivision(division);
    setValue("year", year);
  }, [firstName, lastName, email, division, className, setValue]);

  const renderSubmitButton = () => {
    switch (action) {
      case "modify":
        return "Modify";
      default:
        return "Add";
    }
  };
  const renderTitle = () => {
    switch (action) {
      case "view":
        return "View Student Details";
      case "modify":
        return "Modify Student Details";
      default:
        return "Enter Student Details";
    }
  };
  const dialogProps =
    action === "view" || action === "modify"
      ? { open: IsDialogOpen, onOpenChange: onClose }
      : {
          open: IsDialogOpen,
          onOpenChange: () => setIsDialogOpen(!IsDialogOpen),
        };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog {...dialogProps}>
        {action === undefined && (
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>Add Student</Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action ? renderTitle() : "Enter Student Details"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-2 flex flex-col">
              <label>Student ID</label>
              <Input
                {...register("student_id", { required: true })}
                disabled
                className="disabled:opacity-75"
              />
            </div>
            <div className="gap-2 flex flex-col">
              <label>First Name</label>
              <Input
                placeholder="John"
                {...register("firstName", { required: true })}
                disabled={action === "view"}
                className="disabled:opacity-75"
              />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Last Name</label>
              <Input
                placeholder="Doe"
                {...register("lastName", { required: true })}
                disabled={action === "view"}
                className="disabled:opacity-75"
              />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Rollno</label>
              <Input
                {...register("rollno", { required: true })}
                disabled={action === "view"}
                className="disabled:opacity-75"
              />
            </div>
            <div className="py-1 gap-1 flex flex-col">
              <label>Email</label>
              <Input
                placeholder="example@gmail.com"
                {...register("email")}
                disabled={action === "view"}
                className="disabled:opacity-75"
              />
            </div>
            <div className="flex flex-col py-1 gap-1">
              <label>Select Class</label>
              <select
                className="p-3 border rounded-lg disabled:opacity-75"
                {...register("className", { required: true })}
                onChange={handleClassChange}
                disabled={action === "view"}
              >
                {classInfo.ClassNames.map((className) => (
                  <option key={className} value={className}>
                    {className.toUpperCase()}
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
                disabled={action === "view"}
              >
                {selectedClass &&
                  classInfo.Divisions[selectedClass]?.map((division) => (
                    <option key={division} value={division}>
                      {division.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>

            <div className="py-1 gap-1 flex flex-col">
              <label>Year</label>
              <Input
                type="number"
                {...register("year", { required: true, min: 2000, max: 2100 })}
                disabled={action === "view"}
                className="disabled:opacity-75"
              />
            </div>
            {action !== "view" && (
              <DialogFooter>
                <div className="flex gap-2 items-center justify-end mt-3">
                  <Button type="submit">{renderSubmitButton()}</Button>
                </div>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModifyStudent;
