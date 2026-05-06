import React from "react";
import { styles } from "../../utils/styles";

const actual_api_data_format = {
  statusCode: 200,
  data: {
    page: 1,
    limit: 10,
    totalPages: 50,
    previousPage: false,
    nextPage: true,
    totalItems: 500,
    currentPageItems: 10,
    data: [
      {
        gender: "male",
        name: { title: "Mr", first: "Joseph", last: "Evans" },
        location: {
          street: { number: 61, name: "Lunn Avenue" },
          city: "Hastings",
          state: "Otago",
          country: "New Zealand",
          postcode: 92298,
          coordinates: { latitude: "51.9039", longitude: "-45.2357" },
          timezone: {
            offset: "-6:00",
            description: "Central Time (US & Canada), Mexico City",
          },
        },
        email: "joseph.evans@example.com",
        login: {
          uuid: "9230749e-c285-41b4-9a0f-46dab2454b4e",
          username: "angryzebra337",
          password: "otis",
          salt: "WiHweSpK",
          md5: "2cc09194861ea12e8e842cdce5749230",
          sha1: "aa808f8a4f03df53a427905ae690c677b2d68895",
          sha256:
            "c857e62a617c9015a05b9ecc7f63e05c90042bd79514ca49bacfdf7e97b482d8",
        },
        dob: { date: "1968-07-21T10:02:51.768Z", age: 54 },
        registered: { date: "2019-01-31T10:09:35.816Z", age: 4 },
        phone: "(612)-327-2806",
        cell: "(029)-082-3612",
        id: 1,
        picture: {
          large: "https://randomuser.me/api/portraits/men/65.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/65.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/65.jpg",
        },
        nat: "NZ",
      },
    ],
  },
};

export default function UserCard({ user }) {
  const name = user?.name ? `${user.name.first} ${user.name.last}` : "";
  const avatar = user?.picture?.large || "";
  const email = user?.email || "";
  const location = user?.location
    ? `${user.location.city}, ${user.location.country}`
    : "";

  return (
    <div style={{ ...styles.card, ...styles.rowLayout }}>
      <img src={avatar} alt={name} style={styles.avatar} />
      <div>
        <h4 style={styles.title}>{name}</h4>
        <p style={styles.subtext}>{email}</p>
        <p style={styles.subtext}>{location}</p>
      </div>
    </div>
  );
}
