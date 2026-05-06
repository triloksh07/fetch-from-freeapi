export const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e4e4e7",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      marginBottom: "1.5rem"
    },
    rowLayout: {
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem",
      gap: "1rem"
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover"
    },
    videoThumbnail: {
      width: "100%",
      height: "auto",
      aspectRatio: "16/9",
      objectFit: "cover"
    },
    avatar: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      objectFit: "cover"
    },
    content: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    title: { margin: "0 0 0.25rem 0", fontSize: "1.1rem", color: "#18181b", lineHeight: "1.2" },
    brand: { margin: "0 0 0.5rem 0", fontSize: "0.85rem", color: "#71717a", fontWeight: "600" },
    description: { margin: "0 0 1rem 0", fontSize: "0.9rem", color: "#52525b", lineHeight: "1.4" },
    price: { marginTop: "auto", fontSize: "1.25rem", fontWeight: "bold", color: "#16a34a" },
    badge: { 
      alignSelf: "flex-start",
      backgroundColor: "#3b82f6", 
      color: "#ffffff", 
      padding: "0.2rem 0.6rem", 
      borderRadius: "9999px", 
      fontSize: "0.75rem", 
      fontWeight: "bold",
      marginBottom: "0.5rem"
    },
    subtext: { margin: "0", fontSize: "0.875rem", color: "#71717a" },
    blockquote: { margin: "0 0 1rem 0", fontSize: "1.1rem", color: "#18181b", fontStyle: "italic", borderLeft: "4px solid #3b82f6", paddingLeft: "1rem" },
    author: { margin: 0, fontWeight: "bold", color: "#52525b", textAlign: "right" }
  };