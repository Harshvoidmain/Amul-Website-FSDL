import Link from 'next/link';
import styles from '../styles/CategoryCard.module.css';

export default function CategoryCard({ category }) {
  const { name, slug, image } = category;

  return (
    <Link href={`/products?category=${slug}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={name}
            className={styles.categoryImage}
          />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.categoryName}>{name}</h3>
        </div>
      </div>
    </Link>
  );
}
