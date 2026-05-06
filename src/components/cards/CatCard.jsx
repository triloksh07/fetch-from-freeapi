import React from "react";
import { styles } from "../../utils/styles";

export default function CatCard({ cat }) {
  const {
    image: imageUrl,
    description,
    temperament,
    alt_names,
    wikipedia_url,
    id,
    // weight - {imperial, metric}
    weight,
  } = cat;

  return (
    <div style={styles.card}>
      <img src={imageUrl} alt="Random Cat" style={styles.image} />
    </div>
  );
}
