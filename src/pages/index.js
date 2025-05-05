import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">Do you know what you are breathing?</h1>
        <p className="hero__subtitle">
          Our mission is to fight against fake news regarding climate change actively. 
          We plan to achieve that by building a network of devices spread worldwide 
          to ensure an accurate and reliable reading of the info.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="https://r3-it.storage.cloud.it/aria-public/White_Paper.pdf">
            📄 Read the Whitepaper
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col text--center">
            <h2>About the project!</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <div className={styles.featureItem}>
              <div className="text--center">
                <img 
                  src="/svg/park.svg" 
                  alt="Park icon" 
                  className={styles.featureSvg}
                />
              </div>
              <div className="text--left padding-horiz--md">
                <p>
                  We are experiencing a global emergency. The temperature is rising, and we
                  can't stop it right now. Unfortunately, that has started a wave of fake news 
                  regarding the matter that can be used to trick people into believing something 
                  to support a political agenda. This phenomenon is hazardous for citizens and 
                  politicians because it prevents them from taking the proper countermeasures
                  and fighting this problem best.
                </p>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.featureItem}>
              <div className="text--center">
                <img 
                  src="/svg/environment.svg" 
                  alt="Environment icon" 
                  className={styles.featureSvg}
                />
              </div>
              <div className="text--left padding-horiz--md">
                <p>
                  That's where we step in. We are creating a device capable of giving users
                  accurate data regarding greenhouse gases. This step is crucial because 
                  everyone should be able to formulate an educated opinion. By comparing new 
                  policies or countermeasures with the air quality change, we want to give 
                  people the freedom to choose their city's best course of action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="AriaWatch aims to combat climate change misinformation by providing users with accurate data on air quality">
      <HomepageHeader />
      <main>
        <AboutSection />
      </main>
    </Layout>
  );
}