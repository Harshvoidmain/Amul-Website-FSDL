import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModal';
import styles from '../../styles/Products.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';

export async function getServerSideProps(context) {
  const { category } = context.query;

  try {
    const url = category
      ? `${API_URL}/api/products?category=${category}`
      : `${API_URL}/api/products`;

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(url),
      fetch(`${API_URL}/api/categories`)
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      props: {
        products: productsData.data || [],
        categories: categoriesData.data || [],
        activeCategory: category || 'all'
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
        categories: [],
        activeCategory: 'all'
      }
    };
  }
}

export default function ProductsPage({ products, categories, activeCategory }) {
  const router = useRouter();
  const [modalProduct, setModalProduct] = useState(null);

  const handleFilter = (slug) => {
    if (slug === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  return (
    <>
      <Head>
        <title>Our Products — Amul | Dairy, Butter, Cheese, Ice Cream</title>
        <meta name="description" content="Browse Amul's complete range of dairy products — fresh milk, butter, ghee, cheese, ice cream, chocolates, and more." />
      </Head>

      <div className={styles.productsPage}>
        <div className={styles.productsContainer}>
          <h1 className={styles.pageTitle}>Our Products</h1>
          <p className={styles.pageSubtitle}>
            Explore our complete range of dairy goodness
          </p>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => handleFilter('all')}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterBtn} ${activeCategory === cat.slug ? styles.active : ''}`}
                onClick={() => handleFilter(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={(p) => setModalProduct(p)}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>

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
