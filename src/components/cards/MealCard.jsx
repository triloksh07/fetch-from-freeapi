import React from "react";
import { styles } from "../../utils/styles";

const meals = "https://api.freeapi.app/api/v1/public/meals";

const meal_format = {
  statusCode: 200,
  data: {
    page: 1,
    limit: 10,
    totalPages: 30,
    previousPage: false,
    nextPage: true,
    totalItems: 293,
    currentPageItems: 10,
    data: [
      {
        idMeal: "52785",
        strMeal: "Dal fry",
        strDrinkAlternate: null,
        strCategory: "Vegetarian",
        strArea: "Indian",
        strInstructions:
          "Wash and soak toor dal in approx. 3 cups of water,...",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
        strTags: "Curry,Vegetarian,Cake",
        strYoutube: "https://www.youtube.com/watch?v=J4D855Q9-jg",
        strIngredient1: "Toor dal",
        strIngredient2: "Water",
        strIngredient3: "Salt",
        strIngredient4: "Turmeric",
        strIngredient5: "Ghee",
        strIngredient6: "Chopped tomatoes",
        strIngredient7: "Cumin seeds",
        strIngredient8: "Mustard Seeds",
        strIngredient9: "Bay Leaf",
        strIngredient10: "Green Chili",
        strIngredient11: "Ginger",
        strIngredient12: "Cilantro",
        strIngredient13: "Red Pepper",
        strIngredient14: "Salt",
        strIngredient15: "Sugar",
        strIngredient16: "Garam Masala",
        strIngredient17: "",
        strIngredient18: "",
        strIngredient19: "",
        strIngredient20: "",
        strMeasure1: "1 cup",
        strMeasure2: "2-1/2 cups",
        strMeasure3: "1 tsp",
        strMeasure4: "1/4 tsp",
        strMeasure5: "3 tbs",
        strMeasure6: "1 cup",
        strMeasure7: "1/2 tsp",
        strMeasure8: "1/2 tsp",
        strMeasure9: "2",
        strMeasure10: "1 tbs chopped",
        strMeasure11: "2 tsp shredded",
        strMeasure12: "2 tbs ",
        strMeasure13: "1/2 tsp",
        strMeasure14: "1/2 tsp",
        strMeasure15: "1 tsp",
        strMeasure16: "1/4 tsp",
        strMeasure17: "",
        strMeasure18: "",
        strMeasure19: "",
        strMeasure20: "",
        strSource: "https://www.instagram.com/p/BO21bpYD3Fu",
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
        id: 1,
      },
    ],
  },
};

const randomMeal = "https://api.freeapi.app/api/v1/public/meals/meal/random";

const random_meal_foramt = {
  statusCode: 200,
  data: {
    idMeal: "52938",
    strMeal: "Jamaican Beef Patties",
    strDrinkAlternate: null,
    strCategory: "Beef",
    strArea: "Jamaican",
    strInstructions:
      "Make the Pastry Dough\r\n\r\nTo a large bowl, add flour, 1 teaspoon salt, ...",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wsqqsw1515364068.jpg",
    strTags: "Snack,Spicy",
    strYoutube: "https://www.youtube.com/watch?v=ypQjoiZiTac",
    strIngredient1: "Plain Flour",
    strIngredient2: "Salt",
    strIngredient3: "Curry Powder",
    strIngredient4: "Butter",
    strIngredient5: "Water",
    strIngredient6: "Minced Beef",
    strIngredient7: "Allspice",
    strIngredient8: "Black Pepper",
    strIngredient9: "Vegetable Oil",
    strIngredient10: "Onions",
    strIngredient11: "Red Pepper",
    strIngredient12: "Garlic",
    strIngredient13: "Thyme",
    strIngredient14: "Salt",
    strIngredient15: "Tomato Ketchup",
    strIngredient16: "Water",
    strIngredient17: "Onions",
    strIngredient18: "Egg",
    strIngredient19: "Water",
    strIngredient20: "Water",
    strMeasure1: "4 cups ",
    strMeasure2: "1 tsp ",
    strMeasure3: "1 tsp ",
    strMeasure4: "250g",
    strMeasure5: "1 cup ",
    strMeasure6: "900g",
    strMeasure7: "1 tsp ",
    strMeasure8: "1/2 tsp",
    strMeasure9: "2 tbs",
    strMeasure10: "1 cup ",
    strMeasure11: "Ground",
    strMeasure12: "2 tsp ground",
    strMeasure13: "1 tbs",
    strMeasure14: "1/4 tsp",
    strMeasure15: "2 tbs",
    strMeasure16: "2 cups ",
    strMeasure17: "1/2 cup ",
    strMeasure18: "1 beaten",
    strMeasure19: "1 tbs",
    strMeasure20: "1/4 cup",
    strSource: "https://www.thespruce.com/jamaican-beef-patties-recipe-2137762",
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
    id: 20,
  },
  message: "Meal fetched successfully",
  success: true,
};

export default function MealCard({ meal }) {
  const name = meal?.strMeal || "";
  const category = meal?.strCategory || "";
  const thumbnail = meal?.strMealThumb || "0";
  const area = meal?.strArea || "";

  return (
    <div style={styles.card}>
      <img src={thumbnail} alt={name} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.badge}>
          {category} • {area}
        </div>
        <h4 style={styles.title}>{name}</h4>
      </div>
    </div>
  );
}
