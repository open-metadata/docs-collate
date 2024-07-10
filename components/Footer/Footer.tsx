import styles from "./Footer.module.css";
import { footerItemsData } from "../../docs-v1/constants/footer.constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.Container}>
      <div className={styles.InnerContainer}>
        {footerItemsData.slice(0, 2).map((item) => (
          <Link
            className={styles.Link}
            href={item.href}
            key={item.href}
            target={item.target}
            rel={item.rel}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
