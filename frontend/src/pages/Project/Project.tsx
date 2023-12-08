import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import PMLayout from "../../layouts/PMLayout/PMLayout";
import VendorLayout from "../../layouts/VendorLayout/VendorLayout";
import { ProjectService } from "../../services/projectService";
import { Project as ProjectT, Role } from "../../types";

export default function Project() {
  const { id } = useParams();
  const {
    userDetails: { role },
  } = useAuth();

  const [project, setProject] = useState<ProjectT | undefined>();

  useEffect(() => {
    ProjectService.get(id!).then((res) => {
      if (!res.error) {
        setProject(res.project);
      }
    });
  }, [id]);

  return project ? (
    role === Role.VENDOR ? (
      <VendorLayout>
        <h1>Project {id} </h1>
      </VendorLayout>
    ) : (
      <PMLayout pageTitle="ProProjectperty">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </PMLayout>
    )
  ) : (
    <></>
  );
}
