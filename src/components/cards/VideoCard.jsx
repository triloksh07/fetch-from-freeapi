import React from "react";
import { styles } from "../../utils/styles";

export default function VideoCard({ video }) {
  const snippet = video?.items?.snippet || "";
  const {
    publishedAt,
    channelId,
    title,
    description,
    thumbnails,
    channelTitle,
    tags,
    defaultAudioLanguage,
  } = snippet;

  const videoId = video?.items?.id;

  // Stats
  const {
    duration,
    dimension,
    definition,
    caption,
    licensedContent,
    contentRating,
    projection,
  } = video?.items.contentDetails;

  const { viewCount, likeCount, favoriteCount, commentCount } =
    video?.items.statistics;

  const thumbnailUrl = thumbnails.default.url;

  return (
    <div style={styles.card}>
      <img src={thumbnailUrl} alt={title} style={styles.videoThumbnail} />
      <div style={styles.content}>
        <h4 style={styles.title}>{title}</h4>
        <p style={styles.brand}>{channelTitle}</p>
        <p style={styles.description}>{description.substring(0, 100)}...</p>
      </div>
    </div>
  );
}
