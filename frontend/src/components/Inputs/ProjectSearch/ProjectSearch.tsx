import { useNavigate } from "react-router-dom";
import { ProjectService } from "../../../services/projectService";
import { Project } from "../../../types";
import Select, { OptionType } from "../Select/Select";

export default function ProjectSearch() {
  const navigate = useNavigate();

  const fetchLocations = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const response = await ProjectService.search({ name: inputValue });

      return response.projects.map((project: Project) => ({
        value: project.id, // or any unique identifier
        label: project.name, // the name to display
      }));
    } catch (error) {
      return [];
    }
  };

  const onChange = (option: OptionType) => {
    navigate(`/project/${option.value}`);
  };

  return (
    <Select
      id={"project-search"}
      isAsync
      defaultOptions
      loadOptions={fetchLocations}
      onChange={onChange}
      dropdownIndicator={false}
      placeholder={"Search for a Project"}
    />
  );
}
