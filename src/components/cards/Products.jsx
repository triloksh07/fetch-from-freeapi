function Products({ id, content, description }) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          margin: "8px",
          backgroundColor: "#f9f9f9",
          color: "black"
        }}
      >
        <h1>ID: {id}</h1>
        <h3>content: {content}</h3>
        <p>description: {description}</p>
      </div>
    );
  }
  
  export default Products;
  