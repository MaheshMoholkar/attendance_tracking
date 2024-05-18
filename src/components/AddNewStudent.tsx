import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentForm } from "../services/types";
import { useCreateStudent } from "../services/mutations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

function AddNewStudent() {
  const [IsDialogOpen, setIsDialogOpen] = useState(false);
  const createStudentMutation = useCreateStudent();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StudentForm>();

  const onSubmit = (data: StudentForm) => {
    createStudentMutation.mutate(data, {
      onSuccess: () => {
        setIsDialogOpen(false);
        reset();
        toast("New Student Added");
      },
    });
  };
  return (
    <div>
      <Dialog open={IsDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(false)}>Add Student</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Student Details</DialogTitle>
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
              <label>Email</label>
              <Input placeholder="johndoe@gmail.com" {...register("email")} />
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
                <Button type="submit">Add</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
