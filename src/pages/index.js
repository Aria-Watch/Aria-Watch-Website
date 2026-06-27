import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';
import {CONTRIBUTION_URL} from '../contributionUrl';

const features = [
  {
    title: 'Open Hardware Devices',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_open-source_g069.svg',
    // Meaningful illustration: descriptive alt distinct from the card title
    // (1-125 chars) so it conveys the image content rather than repeating
    // the adjacent heading (Requirement 9.2).
    imageAlt: 'Illustration of open-source hardware and circuit schematics',
    description: (
      <>
        Build your own devices using detailed guides and open-source schematics.
      </>
    ),
  },
  {
    title: 'Global Data Network',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_server-status_7viz.svg',
    imageAlt: 'Illustration of networked servers sharing global air quality data',
    description: (
      <>
        Access and share real-time, crowdsourced air quality data from around the world.
      </>
    ),
  },
  {
    title: 'Community Collaboration',
    imageUrl: 'https://r3-it.storage.cloud.it/aria-public/website/svg/undraw_work-chat_hc3y.svg',
    imageAlt: 'Illustration of people collaborating through an online chat',
    description: (
      <>
        Join makers, researchers, and activists working together for climate action.
      </>
    ),
  },
];

function Feature({imageUrl, imageAlt, title, description}) {
  return (
    <div className={styles.feature}>
      {imageUrl && (
        <div className={styles.featureImageWrapper}>
          <img className={styles.featureImage} src={imageUrl} alt={imageAlt} />
        </div>
      )}
      <h2 className={styles.featureTitle}>{title}</h2>
      <p className={styles.featureDescription}>{description}</p>
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
          <div className={clsx('container', styles.heroContent)}>
            <h1 className={styles.heroTitle}>Aria Watch</h1>
            <p className={styles.heroSubtitle}>
              Know what you breathe.<br></br>
              Act for the planet.
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--lg', styles.heroButtonPrimary)}
                to="/docs">
                Get Started
              </Link>
              <Link
                className={clsx('button button--lg', styles.heroButtonSecondary)}
                to="/about">
                Learn More
              </Link>
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
            <h2 className={styles.ctaHeading}>Join the Movement</h2>
            <p className={styles.ctaText}>
              Contribute, build, and make a difference with Aria Watch.
            </p>
            {CONTRIBUTION_URL ? (
              <a
                className={clsx('button button--lg', styles.ctaButton)}
                href={CONTRIBUTION_URL}
                target="_blank"
                rel="noopener noreferrer">
                Get Involved on GitHub
              </a>
            ) : (
              <>
                <span
                  className={clsx(
                    'button button--lg',
                    styles.ctaButton,
                    styles.ctaButtonDisabled,
                  )}
                  role="link"
                  aria-disabled="true">
                  Get Involved on GitHub
                </span>
                <p className={styles.ctaUnavailable}>
                  The contribution link is currently unavailable. Please check
                  back soon.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
