import { useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../../components/Button/Button";
import PMLayout from "../../components/Layouts/PMLayout/PMLayout";

export default function PMDashboard() {
  const navigate = useNavigate();
  return (
    <PMLayout pageTitle="Dashboard">
      <div>
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          onClick={() => navigate("/create-property")}
          text="Create Property"
        />
      </div>
    </PMLayout>
  );
}
