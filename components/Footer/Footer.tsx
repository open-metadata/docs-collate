import classNames from "classnames";
import { footerItemsData } from "../../constants/Footer.constants";
import styles from "./Footer.module.css";
import ParamLink from "../../docs-v1/components/ParamLink";

export default function Footer({ bordered }: { bordered?: boolean }) {
  return (
    <footer
      className={classNames(
        styles.Container,
        bordered && styles.BorderContainer
      )}
    >
      <div className={styles.InnerContainer}>
        {footerItemsData.map((item) => (
          <ParamLink className={styles.Link} link={item.href} key={item.href} name={item.name} />
        ))}
      </div>
    </footer>
  );
}
