import styles from "./BenefitsSection.module.scss";

const benefits = [
  {
    title: "Custom Domain",
    description: "Use a unique URL to share your KnowMe site.",
  },
  {
    title: "Drag & Drop Blocks",
    description: "Add images, galleries, contact info, downloads, and more.",
  },
  {
    title: "Built-in Blog",
    description: "Publish posts and share updates with your followers.",
  },
  {
    title: "Responsive Design",
    description: "Looks great on phones, tablets, and desktops in light or dark mode.",
  },
];

const BenefitsSection = () => (
  <section className={styles.benefits}>
    <h2>Why KnowMe?</h2>
    <ul className={styles.list}>
      {benefits.map((b) => (
        <li key={b.title}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default BenefitsSection; 