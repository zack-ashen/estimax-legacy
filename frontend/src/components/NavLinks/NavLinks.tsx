import { useLocation, useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./NavLinks.module.scss";

interface NavLinksProps {
  links: {
    name: string;
    route: string;
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.NavLinks}>
      {links.map(({ name, route, Icon }) => (
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          key={name}
          text={name}
          selected={location.pathname === route}
          LeftIcon={Icon}
          onClick={() => {
            location.pathname !== route && navigate(route);
          }}
        />
      ))}
    </div>
  );
}
