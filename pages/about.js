import Head from 'next/head';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — Amul | India&apos;s Largest Dairy Cooperative</title>
        <meta name="description" content="Learn about Amul's journey from a small cooperative in Anand, Gujarat to India's largest dairy brand. 75+ years of quality, trust, and innovation." />
      </Head>

      <div className={styles.aboutPage}>
        {/* Hero */}
        <section className={styles.aboutHero}>
          <div className={styles.aboutHeroContainer}>
            <span className={styles.aboutBadge}>Our Story</span>
            <h1 className={styles.aboutHeroTitle}>The Taste of India</h1>
            <p className={styles.aboutHeroText}>
              Amul is India&apos;s largest dairy cooperative brand, built on the vision of
              empowering millions of farmers while delivering fresh, affordable
              dairy to every Indian home.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <img
              src="/images/about-story.png"
              alt="Amul's History"
              className={styles.storyImage}
            />
            <div className={styles.storyContent}>
              <h2>Our Journey</h2>
              <p>
                Founded in 1946 in Anand, Gujarat, Amul started as a small dairy cooperative
                with just two village societies. Today, we are the largest food brand in India,
                representing over 3.6 million milk producers across 18,700+ village cooperative societies.
              </p>
              <p>
                The Amul story is one of empowerment. When dairy farmers in Kaira district came
                together to eliminate middlemen and sell their milk directly to consumers, they
                created a revolution that would transform India&apos;s dairy industry forever.
              </p>
              <p>
                From milk and butter to cheese and ice cream, Amul blends tradition,
                innovation, and trust to serve the nation every day. With a strong
                cooperative network, Amul stands for quality, integrity, and the true taste of India.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div>
              <div className={styles.statNumber}>75+</div>
              <div className={styles.statLabel}>Years of Trust</div>
            </div>
            <div>
              <div className={styles.statNumber}>3.6M+</div>
              <div className={styles.statLabel}>Milk Producers</div>
            </div>
            <div>
              <div className={styles.statNumber}>18,700+</div>
              <div className={styles.statLabel}>Village Societies</div>
            </div>
            <div>
              <div className={styles.statNumber}>₹72,000 Cr</div>
              <div className={styles.statLabel}>Annual Turnover</div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesContainer}>
            <h2 className={styles.valuesTitle}>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className={styles.valueTitle}>Quality Assurance</h3>
                <p className={styles.valueDesc}>
                  Every Amul product undergoes rigorous quality checks to ensure the highest standards of purity and taste.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3 className={styles.valueTitle}>Farmer Empowerment</h3>
                <p className={styles.valueDesc}>
                  Our cooperative model ensures fair prices for farmers and sustainable livelihoods for millions of rural families.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3 className={styles.valueTitle}>Customer Delight</h3>
                <p className={styles.valueDesc}>
                  We strive to bring joy and nutrition to every home with products that are both delicious and affordable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
