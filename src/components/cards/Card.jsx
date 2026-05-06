// function CardOld(user) {
//   return (
//     <>
//       <div>{user.title}</div>
//     </>
//   );
// }

// export default Card;

function Card({ user }) {
  console.log("user from Card component: ", user.name.first);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        margin: "8px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#f9f9f9",
        width: "max-content",
      }}
    >
      <div>
        <h3>
          {user.name.first} {user.name.last}
        </h3>
        <p>{user.email}</p>
        <small>
          {user.location.city}, {user.location.country}
        </small>
      </div>
    </div>
  );
}

export default Card;
