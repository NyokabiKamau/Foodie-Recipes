
const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='

const MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

const RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php'

const CATEGORY = 'https://www.themealdb.com/api/json/v1/1/categories.php'

const SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

document.addEventListener('DOMContentLoaded', () => {
    loadRandom()
    // loadMenu()


    // Login Form details and events
    const form_Container = document.getElementById('formContainer')

    const signupBtn = document.getElementById('signupBtn')
    const signinBtn = document.getElementById('signinBtn')
    const nameField = document.getElementById('nameField')
    const signupTitle = document.getElementById('signupTitle')

    signinBtn.onclick = function(){
        nameField.style.maxHeight = '0'
        signupTitle.innerHTML = 'Sign In'
        signupBtn.classList.add('disable')
        signinBtn.classList.remove('disable')
        signinBtn.addEventListener('click', () => {
            alert('Successfully Signed In')
            searchMeal()
            loadMenu()
            form_Container.style.display = "none"
        })
    }

    signupBtn.onclick = function(){
        nameField.style.maxHeight = '60px'
        signupTitle.innerHTML = 'Sign Up'
        signupBtn.classList.remove('disable')
        signinBtn.classList.add('disable')
        signupBtn.addEventListener('click', () => {
            alert('Successfully Signed Up')
            searchMeal()
            loadMenu()
            form_Container.style.display = "none"
        })
    }
})



// Feedback Form details and events
const rateTitle = document.getElementById('rate-title')
const rateComment = document.getElementById('comment-Form')

    rateTitle.addEventListener('click', (event) => {
        event.preventDefault()
        rateComment.removeAttribute('hidden')
    })



// ABOUT SECTION
const aboutLink = document.getElementById('about-link')
const about = document.getElementById('aboutId')

aboutLink.addEventListener('click', () => {
    about.removeAttribute('hidden')
    about.style.display = "block"
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    })


// gets the CARD DATA elements 
const mealCard = document.getElementById('meal-cardBody')
const recipeCard = document.getElementById('recipe-cardBody')



// get search form data elements 
const searchRowCard = document.getElementById('search-result')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// submit event for search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    searchMeal(searchInput.value)

    mealCard.style.display = "none"
    searchRowCard.style.display = "block"
    searchRowCard.removeAttribute('hidden')
    about.style.display = "none"
})


// click event for home link
const homeLink = document.getElementById('home-link')
homeLink.addEventListener('click', () => {
    searchRowCard.style.display = "none"
    mealCard.style.display = "block"
    about.style.display = "none"
    recipeCard.style.display = "block"
    loadRandom()
})

// click event for Recipes link
const recipeLink = document.getElementById('recipe-link')
recipeLink.addEventListener('click', () => {
    searchRowCard.style.display = "none"
    mealCard.style.display = "none"
    about.style.display = "none"
    recipeCard.style.display = "block"
    loadMenu()
})



// creating the meal element
function creatingMeal (image, id, category, title, instructions, link) {
    const rootDiv = document.createElement('div')
    rootDiv.classList.add('card', 'col-12', 'px-0', 'mb-3')

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('col-5', 'card-body')

    const imageDiv = document.createElement('div')
    imageDiv.classList.add('col-6')

    const mealImage = document.createElement('img')
    mealImage.classList.add('card-media','h-100')
    mealImage.src = image
    mealImage.objectFit = 'cover'
    mealImage.float = 'right'

    const mealId = document.createElement('span')
    mealId.classList.add('card-number', 'card-circle', 'subtle')
    mealId.innerText = id

    const mealTitle = document.createElement('h2')
    mealTitle.classList.add('card-title')
    mealTitle.innerText = title

    const mealCategory = document.createElement('span')
    mealCategory.classList.add('card-category')
    mealCategory.innerText = `(${category})`

    const mealInstructions = document.createElement('div')
    mealInstructions.classList.add('card-text', 'hiddenText', 'visibleText')
    mealInstructions.innerText = instructions
    mealInstructions.style.display = 'none'


    const readBtn = document.createElement('button')
    readBtn.classList.add('mt-1', 'mb-2', 'me-1', 'ms-5', 'btn', 'btn-warning')
    readBtn.setAttribute('id', 'readBtn')
    readBtn.innerText = 'READ'
    readBtn.addEventListener('click', () => {
        mealInstructions.style.display = 'block'
        readBtn.style.display = 'none'
    })

    const description = document.createElement('p')
    description.classList.add('card-description')
    description.innerText = 'Click the links to view written instruction or watch the video tutorial'

    const mealLink = document.createElement('a')
    mealLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-5', 'btn', 'btn-warning')
    mealLink.setAttribute('id', 'videoBtn')
    mealLink.innerText = 'Video ...'
    mealLink.href = link
    mealLink.target = '_blank'

    
    const count = document.createElement('p')
    count.setAttribute('id', 'countLike')

    const likebutton = document.createElement("button")
    likebutton.setAttribute('id', 'likeBtn')
    likebutton.innerText = "♥"
    likebutton.addEventListener('click', function likes() {
        const currentVote = count.textContent
        const numberVote = Number(currentVote)
        count.innerHTML = numberVote + 1
    })


    // append body elements to the card div
    cardDiv.appendChild(mealId)
    cardDiv.appendChild(mealCategory)
    cardDiv.appendChild(mealTitle)
    cardDiv.appendChild(description)
    cardDiv.appendChild(mealInstructions)
    cardDiv.appendChild(mealLink)
    cardDiv.appendChild(likebutton)
    cardDiv.appendChild(readBtn)
    cardDiv.appendChild(count)
    cardDiv.appendChild(likebutton)


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
            const category = mealData.strCategory
            const title = mealData.strMeal
            const instructions = mealData.strInstructions
            const link = mealData.strYoutube

            const mealElement = creatingMeal(image, id, category, title, instructions, link)

            recipeCard.appendChild(mealElement)
            })
        })
}

function loadRandom () {
    fetch(RANDOM)
        .then((response) => response.json())
        .then((data) => {
            const meal = data.meals
            meal.forEach(mealData => {
            const image = mealData.strMealThumb
            const id = mealData.idMeal
            const category = mealData.strCategory
            const title = mealData.strMeal
            const instructions = mealData.strInstructions
            const link = mealData.strYoutube

            const mealElement = creatingMeal(image, id, category, title, instructions, link)

            mealCard.appendChild(mealElement)
            })
        })
}


// search data
function searchMeal (meal) {
    fetch(`${SEARCH}${meal}`)
        .then((response) => response.json())
        .then((data) => {
            const mealList = data.meals
            const searchResults = mealList.map(
                mealData => {
                    const title = mealData.strMeal
                    const id = mealData.idMeal
                    const image = mealData.strMealThumb
                    const category = mealData.strCategory
                    const instructions = mealData.strInstructions
                    const link = mealData.strYoutube
                    return creatingMeal(image, id, category, title, instructions, link)
                }
            )
            // replace all children
            searchRowCard.replaceChildren(...searchResults)
        })
}