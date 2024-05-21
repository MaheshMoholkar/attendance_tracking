import { useGetClassInfo } from "@/services/queries";
import { ClassData } from "@/services/types";
import { useEffect, useState } from "react";

function ClassSelector() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const getClassesQuery = useGetClassInfo();

  useEffect(() => {
    setClasses(getClassesQuery.data);
  }, [classes]);

  return (
    <>
      <div>
        <select className="p-2 border rounded-lg">
          {classes.map((value, index) => (
            <option key={index} value={value.className}>
              {value.className.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ClassSelector;
