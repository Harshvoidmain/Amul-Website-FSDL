import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const inlineStyles = {
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: '16px',
  },
  userName: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  logoutBtn: {
    padding: '7px 16px',
    background: '#ff3b30',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
};

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (router.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#contact');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
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
          {links.map((link) =>
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
          )}

          {user && (
            <div style={inlineStyles.userSection}>
              <span style={inlineStyles.userName}>👋 {user.name}</span>
              <button style={inlineStyles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
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
          {links.map((link) =>
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
          )}

          {user && (
            <div style={{ padding: '10px 0' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  display: 'block',
                  marginTop: '8px',
                  padding: '8px 16px',
                  background: '#ff3b30',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}