import { useRouter } from "next/router";
import { footerItemsData } from "../../constants/Footer.constants";
import styles from "./Footer.module.css";
import Link from "next/link";
import classNames from "classnames";

export default function Footer() {
  const { pathname } = useRouter();

  return (
    <footer className={classNames(styles.Container, pathname !== "/[version]" && styles.BorderContainer)}>
      <div className={styles.InnerContainer}>
        {footerItemsData.map((item) => (
          <Link className={styles.Link} href={item.href} key={item.href}>
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
