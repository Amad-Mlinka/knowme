import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.scss";
import {Button} from "@/components/ui/Button";

const HeroSection = () => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1>
        Create Your Personal
        <br /> Website with KnowMe
      </h1>
      <p>
        Showcase who you are with a beautiful, customizable mini-website. Choose
        your own URL, add galleries, contact info, social links, a blog, and
        more—all in minutes.
      </p>
      <Link href="/register">
        <Button>Get Started – it’s free</Button>
      </Link>
    </div>
    <div className={styles.illustration}>
      <Image src="/vercel.svg" alt="Illustration" width={300} height={200} />
    </div>
  </section>
);

export default HeroSection; 