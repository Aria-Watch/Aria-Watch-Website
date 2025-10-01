import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./api.module.css";
import clsx from "clsx";

export default function About() {
  const [isAnimated, setIsAnimated] = useState(true);

  // Floating animation for decorative elements
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(`.${styles.floatingElement}`);
      elements.forEach((el) => {
        el.style.transform = `translate(${Math.random() * 10 - 5}px, ${
          Math.random() * 10 - 5
        }px)`;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="About Us"
      description="Learn more about our team and mission"
    >
      <main className={styles.pageContainer}>
        <div className={styles.decorativeBackground}>
          <div className={clsx(styles.floatingElement, styles.circle1)}></div>
          <div className={clsx(styles.floatingElement, styles.circle2)}></div>
          <div className={clsx(styles.floatingElement, styles.circle3)}></div>
          <div className={clsx(styles.floatingElement, styles.circle4)}></div>
          <div className={clsx(styles.floatingElement, styles.square1)}></div>
          <div className={clsx(styles.floatingElement, styles.square2)}></div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.badge}>
            <span>⚡ Launching Soon</span>
          </div>

          <h1 className={styles.title}>
            Something <span className={styles.highlight}>Amazing</span> is
            Coming
          </h1>

          <p className={styles.description}>
            We're working hard to bring you our new About page. Stay tuned for
            an exciting reveal of our story, mission, and the team behind our
            success.
          </p>

          <div className={styles.backToHomeWrapper}>
            <Link to="/" className={styles.backToHome}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
