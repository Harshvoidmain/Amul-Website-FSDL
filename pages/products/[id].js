import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/ProductDetail.module.css';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const data = await res.json();

    if (!data.success) {
      return { props: { product: null } };
    }

    return {
      props: { product: data.data }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null } };
  }
}

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className={styles.errorPage}>
        <div>
          <h1 className={styles.errorTitle}>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const { name, price, image, category, rating, reviews, description } = product;

  const categoryLabel = category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' & ');

  return (
    <>
      <Head>
        <title>{name} — Amul Products</title>
        <meta name="description" content={description} />
      </Head>

      <div className={styles.detailPage}>
        <div className={styles.detailContainer}>
          <Link href="/products" className={styles.backLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Products
          </Link>

          <div className={styles.detailGrid}>
            <div className={styles.imageSection}>
              <img
                src={image}
                alt={name}
                className={styles.detailImage}
              />
            </div>

            <div className={styles.infoSection}>
              <span className={styles.categoryBadge}>{categoryLabel}</span>
              <h1 className={styles.productName}>{name}</h1>

              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={styles.star}>
                      {i < rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className={styles.reviewText}>{reviews} reviews</span>
              </div>

              <p className={styles.price}>
                <span className={styles.priceSymbol}>₹</span>{price}
              </p>

              <p className={styles.description}>{description}</p>

              <div className={styles.actionButtons}>
                <button className={styles.addToCartBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
                <button className={styles.wishlistBtn} aria-label="Add to wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
