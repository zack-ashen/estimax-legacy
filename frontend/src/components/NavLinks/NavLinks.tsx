import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavLinks.module.scss";
import Button, { ButtonStyles } from "../Button/Button";

interface NavLinksProps {
  links: {
    name: string;
    route: string;
  }[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.NavLinks}>
      {links.map(({ name, route }) => (
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          key={name}
          text={name}
          selected={location.pathname === route}
          onClick={() => {
            location.pathname !== route && navigate(route);
          }}
        />
      ))}
    </div>
  );
}
