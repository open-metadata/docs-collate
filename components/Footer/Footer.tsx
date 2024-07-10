import { footerItemsData } from "../../constants/Footer.constants";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.Container}>
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
