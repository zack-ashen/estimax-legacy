import { useState } from "react";

export default function CreateProject() {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <h1>Create Project</h1>
    </div>
  );
}
