import React from "react";
import { styles } from "../../utils/styles";

export default function ProductCard({ product }) {
  const {
    title,
    price,
    description,
    thumbnail,
    category,
    brand,
    id,
    stock,
    rating,
    discountedPercentage,
  } = product || {};

  return (
    <div style={styles.card}>
      {thumbnail && <img src={thumbnail} alt={title} style={styles.image} />}
      <div style={styles.content}>
        <div style={styles.badge}>{category}</div>
        <h4 style={styles.title}>{title}</h4>
        <p style={styles.brand}>{brand}</p>
        <p style={styles.description}>{description}</p>
        <span style={styles.price}>${price}</span>
      </div>
    </div>
  );
}
