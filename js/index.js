const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'

const MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php'

const SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

// gets the CARD DATA elements 
const mealCard = document.getElementById('meal-cardBody')
const ingredientCard = document.getElementById('meal-ingredients')
const searchRowCard = document.getElementById('search-result')

// gets the CARD DATA elements 
const homeLink = document.getElementById('home-link')
const ingredientsLink = document.getElementById('ingredient-link')
const dropdownLink = document.getElementById('dropdown-link"')

// get search form data elements 
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')


// click event for ingredient
ingredientsLink.addEventListener('click', () => {
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    ingredientCard.removeAttribute('hidden')
    ingredientCard.style.display = "block"
    alert('event has been clicked')
})

