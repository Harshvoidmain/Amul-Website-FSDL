import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (router.pathname === '/') {
      // Already on home page, smooth scroll to contact
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page then scroll
      router.push('/#contact');
    }
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/#contact', label: 'Contact Us', isContact: true },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <img src="/images/Amul_logo.png" alt="Amul Logo" />
        </Link>

        <div className={styles.navLinks}>
          {links.map((link) => (
            link.isContact ? (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={handleContactClick}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${router.pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            link.isContact ? (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={handleContactClick}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${router.pathname === link.href ? styles.active : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}
