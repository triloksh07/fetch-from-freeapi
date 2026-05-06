import React from "react";
import { styles } from "../../utils/styles";

export default function QuoteCard({ quote }) {
  const { content, author, tags,  } = quote;

  return (
    <div style={styles.card}>
      <blockquote style={styles.blockquote}>"{content}"</blockquote>
      <p style={styles.author}>— {author}</p>
    </div>
  );
}
