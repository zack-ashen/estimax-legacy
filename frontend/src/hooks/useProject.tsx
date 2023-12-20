import { useEffect, useState } from "react";
import { ProjectService } from "../services/projectService";

function useProject(id: string) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const response = await ProjectService.get(id);
        if (!response.error) {
          setProject(response.project);
        } else {
          setError(response.error);
        }
      } catch (err: unknown) {
        // TODO: Handle error
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}

export default useProject;
