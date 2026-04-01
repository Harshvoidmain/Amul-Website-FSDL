import { useState } from 'react';
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroContainer}>
        {/* Left Amul Girl */}
        <div className={styles.heroLeft}>
          <img
            src="/images/hero-amul-girl.png"
            alt="Amul Girl"
            className={styles.heroLeftImage}
          />
        </div>

        {/* Center Content */}
        <div className={styles.heroCenter}>
          <h1 className={styles.heroTagline}>
            Amul Doodh<br />Peeta hai India
          </h1>
          <p className={styles.heroDesc}>
            From fresh milk to delicious butter, cheese, and ice
            creams, Amul delivers pure and nutritious dairy
            products every day
          </p>
          <div className={styles.heroCta}>
            <input
              type="email"
              placeholder="Enter email address"
              className={styles.heroInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.heroBtn}>
              Get Latest Deals
            </button>
          </div>
        </div>

        {/* Right Amul Girl */}
        <div className={styles.heroRight}>
          <img
            src="/images/hero-amul-girl.png"
            alt="Amul Girl"
            className={styles.heroRightImage}
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>
    </section>
  );
}
