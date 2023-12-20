import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GridColumn,
  GridContainer,
  GridRow,
} from "../../../../components/GridLayout/GridLayout";
import PMProjectCard from "../../../../components/PMProjectCard/PMProjectCard";
import { PropertyService } from "../../../../services/propertyService";
import { Project } from "../../../../types/project";

export default function ProjectsTab() {
  const { id } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    PropertyService.getProjects(id!).then((res) => {
      if (!res.error) {
        setProjects(res.projects);
      }
    });
  }, [id]);

  return id ? (
    <GridContainer>
      <GridRow>
        {projects?.map((project, ind) => (
          <GridColumn key={ind} xs={5}>
            <PMProjectCard key={ind} project={project} />
          </GridColumn>
        ))}
      </GridRow>
    </GridContainer>
  ) : (
    <></>
  );
}
