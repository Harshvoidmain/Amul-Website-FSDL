import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ContactForm from '../components/ContactForm';
import ProductModal from '../components/ProductModal';
import styles from '../styles/Home.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API_URL}/api/products`),
      fetch(`${API_URL}/api/categories`)
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      props: {
        products: productsData.data || [],
        categories: categoriesData.data || []
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: [],
        categories: []
      }
    };
  }
}

export default function Home({ products: initialProducts, categories: initialCategories }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [modalProduct, setModalProduct] = useState(null);

  // Fetch data client-side (visible in network tab)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error('Client-side fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const featuredProducts = products.slice(0, 5);

  return (
    <>
      <Head>
        <title>Amul — The Taste of India | Fresh Dairy Products</title>
        <meta name="description" content="Amul — India's largest dairy cooperative. Discover fresh milk, butter, cheese, ice cream, chocolates, and more. Trusted for over 75 years." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutContainer}>
          {/* Left: Tall chocolate image */}
          <div className={styles.aboutCol1}>
            <img src="/images/about-chocolate.png" alt="Amul Dark Chocolate" className={styles.aboutTallImage} />
          </div>

          {/* Center: Stat + avatars + tall products image */}
          <div className={styles.aboutCol2}>
            <div className={styles.aboutStat}>
              <span className={styles.aboutStatNumber}>75+</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <p className={styles.aboutStatLabel}>Years of Trust</p>

            <div className={styles.avatarRow}>
              <div className={styles.avatarGroup}>
                <span className={styles.avatar} style={{ background: '#E8D5B7' }}>👩</span>
                <span className={styles.avatar} style={{ background: '#F5C6AA' }}>👨</span>
                <span className={styles.avatar} style={{ background: '#D4E8D0' }}>👩‍🦱</span>
                <span className={styles.avatar} style={{ background: '#C5D5E8' }}>👦</span>
                <span className={styles.avatar} style={{ background: '#E8C5D5' }}>👧</span>
              </div>
            </div>

            <img src="/images/about-products-flat.png" alt="Amul Products" className={styles.aboutTallImage} />
          </div>

          {/* Right: Text content */}
          <div className={styles.aboutRight}>
            <p className={styles.sectionSubtitle}>A BIT</p>
            <h2 className={styles.sectionTitle}>ABOUT US</h2>
            <p className={styles.aboutText}>
              Amul is India&apos;s largest dairy cooperative brand, built on the vision of
              empowering millions of farmers while delivering fresh, affordable
              dairy to every Indian home.
            </p>
            <p className={styles.aboutText}>
              From milk and butter to cheese and ice cream, Amul blends tradition,
              innovation, and trust to serve the nation every day. With a strong
              cooperative network, Amul stands for quality, integrity, and the true
              taste of India.
            </p>
            <Link href="/about" className={styles.exploreBtn}>
              EXPLORE MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className={styles.categoriesSection} id="categories">
        <div className={styles.categoriesContainer}>
          <div className={styles.categoriesHeader}>
            <h2 className="section-title">Product Categories</h2>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection} id="featured">
        <div className={styles.featuredContainer}>
          <div className={styles.featuredHeader}>
            <h2 className="section-title">Our Featured Products</h2>
          </div>
          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={(p) => setModalProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Product Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </>
  );
}
