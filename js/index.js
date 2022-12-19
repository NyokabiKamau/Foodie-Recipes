const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='

const MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

const CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'

const SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

document.addEventListener('DOMContentLoaded', () => {
    loadMenu()
// Login Form details and events
const mainNavbar = document.getElementById('mainNav')
const form_Container = document.getElementById('formContainer')
const section_1 = document.getElementById('section1')

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
        mainNavbar.removeAttribute('hidden')
        mealCard.removeAttribute('hidden')
        section_1.removeAttribute('hidden')
        searchForm.removeAttribute('hidden')
        searchMeal()
        loadMenu()
        loadIngredients()
        loadCategory()
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
        mainNavbar.removeAttribute('hidden')
        mealCard.removeAttribute('hidden')
        section_1.removeAttribute('hidden')
        searchForm.removeAttribute('hidden')
        searchMeal()
        loadMenu()
        loadIngredients()
        loadCategory()
        form_Container.style.display = "none"
    })
}

// Feedback Form details and events
const rateTitle = document.getElementById('rate-title')
const rateComment = document.getElementById('comment-Form')

    rateTitle.addEventListener('click', (event) => {
        event.preventDefault()
        rateComment.removeAttribute('hidden')
    })


// gets the CARD DATA elements 
const mealCard = document.getElementById('meal-cardBody')
const ingredientCard = document.getElementById('meal-ingredients')
const searchRowCard = document.getElementById('search-result')
const categoryRow = document.getElementById('categories')

// gets the CARD DATA elements 
const homeLink = document.getElementById('home-link')
const ingredientsLink = document.getElementById('ingredient-link')
const categoryLink = document.getElementById('category-list')

// get search form data elements 
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// click event for ingredient
ingredientsLink.addEventListener('click', () => {
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    categoryRow.style.display = "none"
    ingredientCard.removeAttribute('hidden')
    ingredientCard.style.display = "block"
    
})

// click event for dropdown menu
categoryLink.addEventListener('click', event => {
    mealCard.style.display = "none"
    searchRowCard.style.display = "none"
    ingredientCard.style.display = "none"
    categoryRow.style.display = "block"
    categoryRow.removeAttribute('hidden')
    
    console.log(event.target.value)
})

// click event for home link
homeLink.addEventListener('click', () => {
    searchRowCard.style.display = "block"
    ingredientCard.style.display = "none"
    categoryLink.style.display = "none"
    mealCard.style.display = "none"
})

// submit event for search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    searchMeal(searchInput.value)

    ingredientCard.style.display = "none"
    categoryLink.style.display = "block"
    mealCard.style.display = "none"
    searchRowCard.style.display = "block"
    searchRowCard.removeAttribute('hidden')
    // alert('event has been clicked')
})

// creating the meal element
function creatingMeal (image, id, category, title, instructions, link) {
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
    mealId.classList.add('card-number', 'card-circle', 'subtle')
    mealId.innerText = id

    const mealTitle = document.createElement('h2')
    mealTitle.classList.add('card-title')
    mealTitle.innerText = title

    const mealCategory = document.createElement('span')
    mealCategory.classList.add('card-category')
    mealCategory.innerText = category

    const mealInstructions = document.createElement('div')
    mealInstructions.classList.add('card-text')
    mealInstructions.innerText = instructions
    mealInstructions.style.display = 'none'

    const readBtn = document.createElement('button')
    readBtn.classList.add('mt-1', 'mb-2', 'me-1', 'ms-5', 'btn', 'btn-warning')
    readBtn.innerText = 'READ'
    readBtn.addEventListener('click', () => {
        mealInstructions.style.display = 'block'
        readBtn.style.display = 'none'
    })

    // const description = document.createElement('p')
    // description.classList.add('card-description')
    // description.innerText = 'Click the links to view written instruction or watch the video tutorial'

    // const description2 = document.createElement('p')
    // description2.classList.add('card-description2')
    // description2.innerText = 'Click the links to view written instruction or watch the video tutorial'

    const mealLink = document.createElement('a')
    mealLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-5', 'btn', 'btn-warning')
    mealLink.innerText = 'Video ...'
    mealLink.href = link
    mealLink.target = '_blank'

    // const countRecommend = document.querySelector('.likes')
    // countRecommend.innerText = `${data.likes} recommend`

    // const likeRecommend = document.querySelector('material-icons')

    // const likebutton = document.createElement('h5')
    const likebutton = document.createElement("button")
    likebutton.innerText = "♥ like"
    

    // append body elements to the card div
    cardDiv.appendChild(mealId)
    cardDiv.appendChild(mealCategory)
    cardDiv.appendChild(mealTitle)
    // cardDiv.appendChild(description)
    cardDiv.appendChild(mealInstructions)
    cardDiv.appendChild(mealLink)
    cardDiv.appendChild(likebutton)
    cardDiv.appendChild(readBtn)
    // cardDiv.appendChild(likebutton)
    // cardDiv.appendChild(likeRecommend)


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

            mealCard.appendChild(mealElement)
            })
        })
}

// creating ingredients element
function creatingIngredients (image, id, title) {
    const rootDiv = document.createElement('div')
    rootDiv.classList.add('card', 'u-clearfix', 'col-12', 'px-0', 'mb-3')

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card-body', 'col-6')

    const imageDiv = document.createElement('div')
    imageDiv.classList.add( 'col-6')

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

    // const likebutton = document.createElement('h5')
    // // const likebutton = document.createAttribute("button")
    // likebutton.innerText = "♥ like"
    // likebutton.addEventListener('click', 
    // alert(like))

    rootDiv.appendChild(rowDiv)
    rootDiv.appendChild(cardDiv)

    imageDiv.appendChild(mealImage)

    cardDiv.appendChild(mealId)
    cardDiv.appendChild(mealTitle)
    // cardDiv.appendChild(likebutton)


    return rootDiv

}

function loadIngredients () {
    fetch(INGREDIENT)
        .then((response) => response.json())
        .then(data => {
            const mealData = data.meals
            const ingrElement = mealData.map(
                cat => creatingIngredients(cat.strMealThumb, cat.idMeal, cat.strMeal)
            )
            ingredientCard.append(...ingrElement)
        })
}


// creating search results
function creatingSearch(image, id, category, title, instructions, link) {
    const rootDiv = document.createElement('div')
    rootDiv.classList.add('card', 'u-clearfix', 'col-12', 'px-0', 'mb-3')

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card-body', 'col-6')

    const imageDiv = document.createElement('div')
    imageDiv.classList.add( 'col-6')

    const mealImage = document.createElement('img')
    mealImage.classList.add('card-media','h-100')
    mealImage.src = image
    mealImage.objectFit = 'cover'
    mealImage.float = 'right'

    const mealId = document.createElement('span')
    mealId.classList.add('card-number', 'card-circle', 'subtle')
    mealId.innerText = id

    const mealCategory = document.createElement('span')
    mealCategory.classList.add('card-category')
    mealCategory.innerText = category

    const mealTitle = document.createElement('h2')
    mealTitle.classList.add('card-title')
    mealTitle.innerText = title

    const mealInstructions = document.createElement('p')
    mealInstructions.classList.add('card-description')
    mealInstructions.innerText = instructions

    const mealLink = document.createElement('a')
    mealLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-5', 'btn', 'btn-warning')
    mealLink.innerText = 'Video ...'
    mealLink.href = link
    mealLink.target = '_blank'

    // cardDiv.appendChild(mealImage)

    cardDiv.appendChild(mealId)
    cardDiv.appendChild(mealTitle)
    cardDiv.appendChild(mealLink)
    cardDiv.appendChild(mealCategory)


    // append image element to image div
    imageDiv.appendChild(mealImage)

    // append divs to row
    rowDiv.appendChild(cardDiv)
    rowDiv.appendChild(imageDiv)

    // append the row to the root
    rootDiv.appendChild(rowDiv)

    return rootDiv

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
                    return creatingSearch(image, id, category, title, instructions, link)
                }
            )
            // replace all children
            searchRowCard.replaceChildren(...searchResults)
        })
}

 // create category element
 function createCategory (category) {
    // const rootDiv = document.createElement('div')
    // rootDiv.classList.add('col-3', 'p-1')

    // const spanData = document.createElement('span')
    // spanData.classList.add('col-12', 'badge', 'text-bg-success', 'p-2')
    // spanData.innerText = country

    const rootDiv = document.createElement('div')
    rootDiv.classList.add("span")

    const liElem = document.querySelector('#category-list')
    liElem.innerText = category

    rootDiv.appendChild(liElem)
    return rootDiv
}

function loadCategory () {
    fetch(CATEGORY)
        .then(response => response.json())
        .then(data => {
            const categoryData = data.categories
            const elements = categoryData.map(
                cat => createCategory(cat.strCategory)
            )
            categoryRow.append(...elements)
        })
}


    // document.addEventListener('DOMContentLoaded', () => {
    //     loadMenu()
    //     loadIngredients()
    //     loadCategory()
    // })

})

// function creatingLikes (meals){
//     const likebutton = document.createAttribute("button")
//     likebutton.innerHTML = "♥ like"
//     likebutton.addEventListener('click', clickVote.bind(this,meals))
// }

// function clickVote(meal) {
//     //fucntion to increment vote count
//      let clickedLike = document.getElementById(`vote-${meal.id}`)
//      let currentVote = clickedLike.textContent
//      let numberVote = Number(currentVote)
     
//      clickedLike.innerHTML = numberVote + 1
     
//    }