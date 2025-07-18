import styles from "./Footer.module.scss";

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} KnowMe. All rights reserved.</p>
  </footer>
);

export default Footer; 