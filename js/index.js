const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'

const MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php'

const SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

// gets the CARD DATA elements 
const mealCard = document.getElementById('meal-cardBody')
const ingredientCard = document.getElementById('meal-ingredients')
const searchRowCard = document.getElementById('search-result')
const countryRow = document.getElementById('countries')

// gets the CARD DATA elements 
const homeLink = document.getElementById('home-link')
const ingredientsLink = document.getElementById('ingredient-link')
const countryLink = document.getElementById('country-list')

// get search form data elements 
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')


// click event for ingredient
ingredientsLink.addEventListener('click', () => {
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    countryLink.style.display = "block"
    ingredientCard.removeAttribute('hidden')
    ingredientCard.style.display = "block"
    alert('event has been clicked')
})

// click event for dropdown menu
countryLink.addEventListener('click', event => {
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    ingredientCard.style.display = "none"
    countryLink.style.display = "block"
    countryLink.removeAttribute('hidden')
    
    console.log(event.target.value)
})

// click event for home link
homeLink.addEventListener('click', () => {
    searchRowCard.style.display = "none"
    ingredientCard.style.display = "none"
    countryLink.style.display = "block"
    mealCard.style.display = "block"
    alert('event has been clicked')
})

// submit event for search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    ingredientCard.style.display = "none"
    countryLink.style.display = "block"
    mealCard.style.display = "none"
    searchRowCard.style.display = "block"
    searchRowCard.removeAttribute('hidden')
    alert('event has been clicked')
})

// creating the meal element
function creatingMeal (image, id, title, instructions, link ) {
    const rootDiv = document.createElement('div')
    rootDiv.classList.add('card', 'u-clearfix', 'col-12', 'px-0', 'mb-3')

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('col-6', 'card-body')

    const imageDiv = document.createElement('div')
    imageDiv.classList.add( 'col-6')

    const mealImage = document.createElement('img')
    mealImage.classList.add('card-media','h-100' )
    mealImage.src = image
    mealImage.objectFit = 'cover'
    mealImage.float = 'right'

    const mealId = document.createElement('span')
    mealId.classList.add('card-number', 'card-circl', 'subtle')
    mealId.innerText = id

    const mealTitle = document.createElement('h2')
    mealTitle.classList.add('card-title')
    mealTitle.innerText = title

    const mealInstructions = document.createElement('a')
    mealInstructions.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
    mealInstructions.innerText = 'Instructions'
    mealInstructions.href = link
    mealInstructions.target = '_blank'

    const description = document.createElement('p')
    description.classList.add('card-description')
    description.innerText = 'Click the links to view written instruction or watch the video tutorial'

    const mealLink = document.createElement('a')
    mealLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
    mealLink.innerText = 'Video ...'
    mealLink.href = link
    mealLink.target = '_blank'

    // append body elements to the card div
    cardDiv.appendChild(mealId)
    cardDiv.appendChild(mealTitle)
    cardDiv.appendChild(description)
    cardDiv.appendChild(mealInstructions)
    cardDiv.appendChild(mealLink)

    // append image element to image div
    imageDiv.appendChild(mealImage)

    // append divs to row
    rowDiv.appendChild(cardDiv)
    rowDiv.appendChild(imageDiv)

    // append the row to the root
    rootDiv.appendChild(rowDiv)

    return rootDiv
}

// function that loads meals
function loadMenu () {
    fetch(MEAL)
        .then((response) => response.json())
        .then((data) => {
            const meal = data.meals
            meal.forEach(mealData => {
            const image = mealData.strMealThumb
            const id = mealData.idMeal
            const title = mealData.strMeal
            const instructions = mealData.strSource
            const link = mealData.strYoutube

            const mealElement = creatingMeal(image, id, title, instructions, link)

            mealCard.appendChild(mealElement)
            })
        })
}

document.addEventListener('DOMContentLoaded', () =>
{
    loadMenu()
})