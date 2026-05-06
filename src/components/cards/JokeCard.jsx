import React from "react";
import { styles } from "../../utils/styles";

export default function JokeCard({ joke }) {
  const content = joke?.content || joke?.joke || "";

  return (
    <div style={{...styles.card, borderLeft: "4px solid #f59e0b"}}>
      <p style={{ margin: 0, fontSize: "1.1rem", fontStyle: "italic" }}>
        {content}
      </p>
    </div>
  );
}