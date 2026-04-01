import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product, onProductClick }) {
  const { id, name, price, image, rating, reviews } = product;

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={name}
          className={styles.productImage}
        />
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Add to wishlist" onClick={(e) => e.stopPropagation()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <button className={styles.actionBtn} aria-label="Add to cart" onClick={(e) => e.stopPropagation()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.price}>
          <span className={styles.priceSymbol}>₹</span>{price}
        </p>
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={styles.star}>
                {i < rating ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className={styles.reviewCount}>{reviews}</span>
        </div>
      </div>
    </div>
  );
}
