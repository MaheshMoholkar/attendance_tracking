import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentData } from "../services/types";
import { useCreateStudent, useModifyStudent } from "../services/mutations";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModifyStudentProps = {
  action?: "view" | "modify";
  studentData?: StudentData;
  onClose?: () => void;
};

function ModifyStudent({ action, studentData, onClose }: ModifyStudentProps) {
  const [IsDialogOpen, setIsDialogOpen] = useState(
    action === "view" || action === "modify"
  );
  const createStudentMutation = useCreateStudent();
  const modifyStudentMutation = useModifyStudent();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StudentData>({ defaultValues: studentData });

  const onSubmit = (data: StudentData) => {
    data = {
      ...data,
      rollno: parseInt(data.rollno.toString(), 10),
    };
    if (action === "modify") {
      modifyStudentMutation.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
          toast("Student Details Updated");
        },
      });
    } else {
      createStudentMutation.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
          toast("New Student Added");
        },
      });
    }
  };
  const renderSubmitButton = () => {
    switch (action) {
      case "view":
        return "Close";
      case "modify":
        return "Update";
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
  return (
    <div>
      <Dialog open={IsDialogOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(!IsDialogOpen)}>
            Add Student
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action ? renderTitle() : "Enter Student Details"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-2 flex flex-col">
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
                className="p-3 border rounded-lg"
                {...register("class", { required: true })}
              >
                <option value="mca">MCA</option>
                <option value="mba">MBA</option>
              </select>
            </div>
            <div className="flex flex-col py-1 gap-1">
              <label>Select Division</label>
              <select
                className="p-3 border rounded-lg"
                {...register("division", { required: true })}
              >
                <option value="a">A</option>
                <option value="b">B</option>
              </select>
            </div>
            <DialogFooter>
              <div className="flex gap-2 items-center justify-end mt-3">
                {action !== "view" && (
                  <Button type="submit">{renderSubmitButton()}</Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModifyStudent;
