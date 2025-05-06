import React from 'react';
import Layout from '@theme/Layout';
import styles from './map.module.css';

export default function Map() {
  return (
    <Layout
      title="Map"
      description="Map page">
      <main className="container margin-vert--lg">
        <div className={styles.comingSoonBanner}>
          <h1 className={styles.title}>Coming Soon</h1>
          <p className={styles.subtitle}>We're working on this page and it will be available shortly.</p>
          <div className={styles.underConstruction}>
            <div className={styles.constructionIcon}>🚧</div>
            <p>Under Construction</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}