import CreateProjectForm from "../../../components/Forms/CreateProjectForm/CreateProjectForm";
import PMLayout from "../../../layouts/PMLayout/PMLayout";

export default function CreateProject() {
  return (
    <PMLayout pageTitle={""}>
      <CreateProjectForm />
    </PMLayout>
  );
}
