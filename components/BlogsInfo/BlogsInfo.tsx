import Link from "next/link";
import styles from "./BlogsInfo.module.css";

const BlogsInfo = ({ title, text, link, image }) => {
  return (
    <Link className={styles.Container} href={link} target="_blank">
      <img
        className={styles.blogImage}
        src={image}
        alt={title}
      />
      <div className={styles.blogContent}>
        <h4 className={styles.Title}>{title}</h4>
        <p className={styles.Text}>{text}</p>
      </div>
    </Link>
  );
};

export default BlogsInfo;
