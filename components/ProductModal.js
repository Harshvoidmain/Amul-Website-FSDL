import { useEffect, useState, useCallback } from 'react';
import styles from '../styles/ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const {
    name = '',
    price = 0,
    image = '/images/placeholder.png',
    category = '',
    rating = 0,
    reviews = 0,
    description = ''
  } = product || {};

  const categoryLabel = category
    ? category
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' & ')
    : 'Uncategorized';

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.imageSection}>
          <img
            src={image}
            alt={name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.categoryBadge}>{categoryLabel}</span>
          <h2 className={styles.productName}>{name}</h2>

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
  );
}
