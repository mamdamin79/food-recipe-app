// selectors
const searchButton = document.querySelector(".search-btn");
const closeButton = document.querySelector(".close-btn");
const itemContainer = document.querySelector(".item-container");
const detaileContainer = document.querySelector(".detaile")




// event handlers

// this is an handler for get details of meal
itemContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn")){
        let mealId = e.target.parentElement.getAttribute("id");
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response=>{ return response.json();})
        .then(object=>{
            let mealInfoArray = object.meals
            console.log(mealInfoArray[0])
            detaileContainer.innerHTML = `<button class="btn-primary close-btn"><i class="uil uil-times-square"></i></button>
            <h2>${mealInfoArray[0].strMeal}</h2>
            <h4>${mealInfoArray[0].strCategory}</h4>
            <p>${mealInfoArray[0].strInstructions}</p>
            <img src="${mealInfoArray[0].strMealThumb}" alt="">
            <a href="${mealInfoArray[0].strYoutube}">watch video</a>`
            detaileContainer.classList.add("showRecipes")
            document.querySelector(".close-btn").addEventListener("click",()=>detaileContainer.classList.remove("showRecipes"))
        })
        
    }
});


searchButton.addEventListener("click",getMealList);


// this function give ingredients from input and fetch meals related with what user entered then show them in page 
function getMealList() {
    document.querySelector("form").preventDefault;
    let inputValue = document.querySelector("input").value.trim();
    document.querySelector("input").value = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
    .then((response) => {
        return response.json();
    })
    .then(object =>{
        console.log(object);
        if(object.meals !== null){
        let mealArray = object.meals;
        itemContainer.innerHTML = ""
        mealArray.map((item) => {
            // let container = document.createElement("div")
            // container.classList.add("item");
            // let imgItem = document.createElement("img")
            // imgItem.setAttribute("src", item.strMealThumb) 
            // container.appendChild(imgItem)
            // let mealName = document.createElement("h3")
            // mealName.innerHTML = item.strMeal
            // container.appendChild(mealName)
            // let fullRecipeButton = document.createElement("button")
            // fullRecipeButton.innerHTML = `full recipe`
            // fullRecipeButton.classList.add("btn-primary")
            // fullRecipeButton.classList.add("btn-primary")
            // container.appendChild(fullRecipeButton)
            // itemContainer.appendChild(container)
            itemContainer.innerHTML += `<div class="item" id="${item.idMeal}"><img src="${item.strMealThumb}" alt=""><h3>${item.strMeal}</h3><button class="btn btn-primary">full recipe</button></div>`

        })}
        else{
            itemContainer.innerHTML = "<h2>not found!</h2>"
            
        }
        
    })
}
