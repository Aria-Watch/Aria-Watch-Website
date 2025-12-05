import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

const features = [
  {
    title: 'Open Hardware Devices',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_open-source_g069.svg',
    description: (
      <>
        Build your own devices using detailed guides and open-source schematics.
      </>
    ),
  },
  {
    title: 'Global Data Network',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_server-status_7viz.svg',
    description: (
      <>
        Access and share real-time, crowdsourced air quality data from around the world.
      </>
    ),
  },
  {
    title: 'Community Collaboration',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_work-chat_hc3y.svg',
    description: (
      <>
        Join makers, researchers, and activists working together for climate action.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imageUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imageUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Aria Watch"
      description="Know what you breathe. Act for the planet.">
      <main>
        <header className={styles.heroBanner}>
          <div className="container">
            <h1 className={styles.heroTitle}>Aria Watch</h1>
            <p className={styles.heroSubtitle}>
              Know what you breathe.<br></br>
              Act for the planet.
            </p>
            <div className={styles.buttons}>
              <a className="button button--primary button--lg" href="/docs">
                Get Started
              </a>
              <a className="button button--secondary button--lg" href="/about">
                Learn More
              </a>
            </div>
          </div>
        </header>

        <section className={styles.featuresSection}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </section>

        <section className={clsx(styles.callToAction)}>
          <div className="container text--center">
            <h2>Join the Movement</h2>
            <p>Contribute, build, and make a difference with Aria Watch.</p>
            <a
              className="button button--primary button--lg"
              href="https://github.com/Aria-Watch/Aria-Watch-Borino-PCB"
              target="_blank"
              rel="noopener noreferrer">
              Get Involved on GitHub
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
