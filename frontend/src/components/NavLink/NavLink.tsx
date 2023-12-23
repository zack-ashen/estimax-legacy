import { useLocation, useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./NavLink.module.scss";

interface NavLinkProps {
  name: string;
  link: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  action?: {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    navigate: string;
  };
  wide?: boolean;
}

export default function NavLink({
  name,
  link,
  Icon,
  action,
  wide,
}: NavLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`${styles.sidebarLink} ${
        styles[location.pathname === link ? "selected" : ""]
      } ${wide ? styles.wide : ""}`}
      key={name}
      onClick={() => navigate(link)}
    >
      <div className={styles.linkContent}>
        {Icon && <Icon className={styles.sidebarIcon} />}
        {name}
      </div>
      {action && (
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          LeftIcon={action.Icon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(action.navigate);
          }}
          iconOnly
        />
      )}
    </button>
  );
}
