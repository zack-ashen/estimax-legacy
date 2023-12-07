import CreatePropertyForm from "../../components/Forms/CreatePropertyForm/CreatePropertyForm";
import PMLayout from "../../layouts/PMLayout/PMLayout";

export default function CreateProperty() {
  return (
    <PMLayout pageTitle="Create New Property">
      <CreatePropertyForm />
    </PMLayout>
  );
}
