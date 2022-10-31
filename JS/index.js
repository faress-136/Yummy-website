let mainRow = document.getElementById("mainRow");
let searchSection = document.getElementById("searchId");

function checkNav() {
  let x = $(".side-navbar").offset().left;
  // console.log(x);
  let sideMenu = document.getElementById("sideMenu");
  if (x == 0) {
    // maafool
    // console.log("hi");
    $(sideMenu).addClass("open-menu").removeClass("close-menu");
    let width = $("#sideMenu").innerWidth(); //250
    $(".side-navbar").animate({ left: `${width}px` }, 470);
    $("#item1").animate({ opacity: "1", paddingTop: "25px" }, 1000);
    $("#item2").animate({ opacity: "1", paddingTop: "25px" }, 1200);
    $("#item3").animate({ opacity: "1", paddingTop: "25px" }, 1400);
    $("#item4").animate({ opacity: "1", paddingTop: "25px" }, 1600);
    $("#item5").animate({ opacity: "1", paddingTop: "25px" }, 1800);
  } else {
    //maftooh
    // console.log("bye");
    $(sideMenu).addClass("close-menu").removeClass("open-menu");
    let width = $("#sideMenu").innerWidth(); //250
    $(".side-navbar").animate({ left: `0` }, 566);
    $(".box-nav li").animate({ opacity: "0", paddingTop: "500px" }, 700);
  }
}

$(".menu-logo").click(function () {
  checkNav();
});

$(document).ready(function () {
  $(".sk-chase").fadeOut(500, function () {
    $("#loading").remove();
    $("body,html").css({ overflow: "auto" });
    search("");
  });
});

async function search(key) {
  $(".mini-loading").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
  );
  let allMeals = await meals.json();
  displayMeals(allMeals.meals);
//   console.log(allMeals.meals);
  $(".mini-loading").fadeOut(200);
}

async function searchLetter(letter) {
  $(".mini-loading").fadeIn(100);
  let mealsWithLetter = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  mealsWithLetter = await mealsWithLetter.json();
  mealsWithLetter = mealsWithLetter.meals;
//   console.log(mealsWithLetter);
  displayMeals(mealsWithLetter);
  $(".mini-loading").fadeOut(200);
}

function searchInput() {
  mainRow.innerHTML = ``;
  checkNav();
  searchSection.innerHTML = `<div class="row ">
            <div class="col-md-6">
                <input class="form-control text-center" id="searchName"  type="text" placeholder="Search By Name">
            </div>

            <div class="col-md-6">
                <input class="form-control text-center" id="firstLetter" maxlength="1"  type="text" placeholder="Search By First Letter">
            </div>
        </div>`;
  let searchName = document.getElementById("searchName");
  let firstLetter = document.getElementById("firstLetter");
  searchName.addEventListener("input", function (e) {
    let getSearchName = e.target.value;
    search(getSearchName);
    // console.log("Change on searchName");
  });

  firstLetter.addEventListener("input", function (e) {
    let letter = e.target.value;
    searchLetter(letter);
    // console.log("Change on firstLetter");
  });
}

async function getCategories() {
  $(".mini-loading").fadeIn(100);
  let catg = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let allcatg = await catg.json();
  allcatg = allcatg.categories;
  checkNav();
  displayCategories(allcatg);
  $(".mini-loading").fadeOut(200);
}

async function chosenCatg(catgName) {
  $(".mini-loading").fadeIn(100);
  let catg = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catgName}`
  );
  catg = await catg.json();
  let thisCatg = catg.meals;
  displayMeals(thisCatg);
  $(".mini-loading").fadeOut(200);
}

async function getAreas() {
  // strArea
  // <i class="fa-solid fa-city fa-3x"></i>
  $(".mini-loading").fadeIn(100);
  let area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  area = await area.json();
  area = area.meals;
  checkNav();
  showAreas(area);
  $(".mini-loading").fadeOut(200);
}

async function chosenArea(area) {
  $(".mini-loading").fadeIn(100);
  let thisarea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  thisarea = await thisarea.json();
  thisarea = thisarea.meals;
  displayMeals(thisarea);
  $(".mini-loading").fadeOut(200);
}

async function getIngredients() {
  $(".mini-loading").fadeIn(100);
  let ingredients = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  ingredients = await ingredients.json();
  let myIngredients = ingredients.meals.splice(0, 20);
  // console.log(myIngredients);
  checkNav();
  showIngredients(myIngredients);
  $(".mini-loading").fadeOut(200);
}

async function chosenIngredient(ing) {
  $(".mini-loading").fadeIn(100);
  let thisIng = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  thisIng = await thisIng.json();
  thisIng = thisIng.meals;
  displayMeals(thisIng);
  $(".mini-loading").fadeOut(200);
}

function showIngredients(ing) {
  searchSection.innerHTML = ``;
//   console.log("Ingredients Function");
  let cartona = ``;
  for (let index = 0; index < ing.length; index++) {
    cartona += `<div class="col-md-6 col-lg-3">
        <div class="my-img position-relative" onclick="chosenIngredient('${
          ing[index].strIngredient
        }')">
            <i class="fa-solid fa-bowl-food fa-3x ingredient-icon"></i>
            <h2 class="pt-1 text-white">${ing[index].strIngredient}</h2>
            <p class="m-0 p-0 text-white">${ing[index].strDescription
              .split(" ")
              .slice(0, 15)
              .join(" ")}</p>
        </div>

     </div>`;
  }

  mainRow.innerHTML = cartona;
}

function showAreas(area) {
  searchSection.innerHTML = ``;
  let cartona = ``;
  for (let index = 0; index < area.length; index++) {
    if (index >= 20) {
      break;
    } else {
      cartona += `<div class="col-md-6 col-lg-3">
        <div class="my-img position-relative" onclick="chosenArea('${area[index].strArea}')">
            <i class="fa-solid fa-city fa-3x  icon-color"></i>
            <h2 class="text-white">${area[index].strArea}</h2>
        </div>

     </div>`;
    }
  }
  mainRow.innerHTML = cartona;
}

function displayCategories(catg) {
  searchSection.innerHTML = ``;

  //strCategoryThumb
  //strCategory
  //strCategoryDescription
  //idCategory
  let cartona = ``;
  for (let index = 0; index < catg.length; index++) {
    cartona += `<div class="col-md-6 col-lg-3">
        <div class="my-img position-relative" onclick="chosenCatg('${
          catg[index].strCategory
        }')">
             <img class="img-fluid rounded" src=${
               catg[index].strCategoryThumb
             } alt="">
             <div class="layer-img d-flex align-items-center justify-content-center rounded">
                 <div class="name-meal p-1">
                     <h2>${catg[index].strCategory}</h2>
                     <p class="m-0 p-0">${catg[index].strCategoryDescription
                       .split(" ")
                       .slice(0, 15)
                       .join(" ")}</p>
                 </div>
             </div>
        </div>

     </div>`;
  }
  mainRow.innerHTML = cartona;
}

function displayMeals(myMeals) {
  let cartona = "";
  for (let index = 0; index < myMeals.length; index++) {
    cartona += `<div class="col-md-6 col-lg-3">
        <div class="my-img position-relative" onclick="mealId(${myMeals[index].idMeal})">
             <img class="img-fluid rounded" src=${myMeals[index].strMealThumb} alt="">
             <div class="layer-img d-flex align-items-center rounded">
                 <div class="name-meal p-2">
                     <h2>${myMeals[index].strMeal}</h2>
                 </div>
             </div>
        </div>

     </div>`;
  }
  mainRow.innerHTML = cartona;
}

async function mealId(id) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  mealObject = await meal.json();
  meal = mealObject.meals;
  mealInfo(meal[0]);
}

function mealInfo(specificMeal) {
  searchSection.innerHTML = ``;
  let recpItems = "";
  let tagNotations = "";
  let cartona = "";

  for (let index = 1; index <= 20; index++) {
    if (specificMeal[`strIngredient${index}`] != "") {
      recpItems += ` <li class="my-2 mx-1 p-1 recp-box rounded">${
        specificMeal[`strMeasure${index}`]
      }  ${specificMeal[`strIngredient${index}`]}</li>`;
    }
  }

  let tags;
  if (specificMeal.strTags != null) {
    tags = specificMeal.strTags.split(",");
  } else {
    tags = 0;
  }
  // console.log(tags);
  for (let index = 0; index < tags.length; index++) {
    tagNotations += `<li class="mt-2 mb-3 mx-1 p-1 tag-box rounded">${tags[index]}</li>`;
  }

  cartona += `<div class="col-md-4 text-white">
    <img class="w-100" src=${specificMeal.strMealThumb} alt="thumb" srcset="">
    <h1>${specificMeal.strMeal}</h1>
    </div>
    <div class="col-md-8 text-white text-start">
    <h2>Instructions</h2>
    <p>${specificMeal.strInstructions}</p>

    <p class="pt-2"><span class="fw-bold">Area : </span> ${specificMeal.strArea}</p>
    <p ><span class="fw-bold">Category : </span> ${specificMeal.strCategory}</p>

    <h3>Recipes :</h3>

    <div class="recp-items">
        <ul class="list-unstyled d-flex flex-wrap justify-content-start align-items-center">

        </ul>
    </div>

    <h3 class="my-1 p-1">Tags :</h3>

    <ul class="list-unstyled d-flex" id='tags'>
       
    </ul>

    <a class="btn btn-success me-2" target="_blank" href="${specificMeal.strSource}">Source</a>
    <a class="btn btn-red text-white" target="_blank" href="${specificMeal.strYoutube}">Youtube</a>

    </div>`;
  mainRow.innerHTML = cartona;
  document.querySelector(".recp-items ul").innerHTML = recpItems;
  document.getElementById("tags").innerHTML = tagNotations;
}

function contactFunction() {
  searchSection.innerHTML = ``;
  checkNav();
  let cartona = `<div class="p-2">
    <h2 class="text-white">Contact Us</h2>
    <div class="row pt-5 ">
        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow text-center" type="text" id="name" oninput="nameValidation()" placeholder="Enter Your Name">
                <div class="alert alert-danger my-1 d-none" id="nameError">Special Characters and Numbers not allowed</div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow text-center" id="email" type="text" oninput="emailValidation()" placeholder="Enter Email">
                <div class="alert alert-danger my-1 d-none" id="emailError">
                    Enter valid Email ex: xxx@yahoo.com
                </div>

            </div>
        </div>

        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow  text-center" type="text" id="phone" oninput="phoneValidation()" placeholder="Enter Phone">
                <div class="alert alert-danger my-1 d-none" id="phoneError">Enter valid Phone Number</div>

            </div>
        </div>

        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow  text-center" type="text" id="age" oninput="ageValidation()" placeholder="Enter Age">
                <div class="alert alert-danger my-1 d-none" id="ageError">Enter valid Age</div>

            </div>
        </div>

        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow text-center" type="password" id="password" oninput="passwordValidation()" placeholder="Enter Password">
                <div class="alert alert-danger my-1 d-none" id="passwordError">
                    Enter valid password Minimum eight characters, at least one letter and one number.
                </div>

            </div>
        </div>

        <div class="col-md-6">
            <div class="margin-input">
                <input class="form-control shadow text-center" type="password" id="repassword" oninput="rePass()" placeholder="Re-Enter Password">
                <div class="alert alert-danger my-1 d-none" id="repassError">ReEnter Password correct</div>

            </div>
        </div>
    </div>
    <button class="btn btn-outline-danger mt-4" id="finalBtn" disabled type="submit">Submit</button>

</div>`;

  mainRow.innerHTML = cartona;
}
function passedRegex(id, inputId) {
  $(`#${id}`).removeClass("d-block");
  $(`#${id}`).addClass("d-none");
  $(`#${inputId}`).addClass("validInput");
}
function failedRegex(id, inputId) {
  $(`#${id}`).removeClass("d-none");
  $(`#${id}`).addClass("d-block");
  $(`#${inputId}`).removeClass("validInput");
}

let nameFlag = 0;
let emailFlag = 0;
let phoneFlag = 0;
let ageFlag = 0;
let passFlag = 0;
let repassFlag = 0;

function nameValidation() {
  finalCheck();
  let myname = document.getElementById("name");
  let nameRegex = /^[a-zA-Z ]+$/gm;
  if (nameRegex.test(myname.value)) {
    passedRegex("nameError", "name");
    nameFlag = 1;
  } else {
    failedRegex("nameError", "name");
    nameFlag = 0;
  }
}

function emailValidation() {
  finalCheck();
  let myemail = $("#email");
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
  if (emailRegex.test(myemail.val())) {
    passedRegex("emailError", "email");
    emailFlag = 1;
  } else {
    failedRegex("emailError", "email");
    emailFlag = 0;
  }
}

function phoneValidation() {
  finalCheck();
  let phoneRegex = /^[0-9]{11}$/gm;
  let myphone = $("#phone");
  if (phoneRegex.test(myphone.val())) {
    passedRegex("phoneError", "phone");
    phoneFlag = 1;
  } else {
    failedRegex("phoneError", "phone");
    phoneFlag = 0;
  }
}

function ageValidation() {
  finalCheck();
  let ageRegex = /^[1-9][0-9]?$|^100$/gm;
  let myage = $("#age");
  if (ageRegex.test(myage.val())) {
    passedRegex("ageError", "age");
    ageFlag = 1;
  } else {
    failedRegex("ageError", "age");
    ageFlag = 0;
  }
}

function passwordValidation() {
  finalCheck();
  let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
  let mypass = $("#password");
  if (passRegex.test(mypass.val())) {
    passedRegex("passwordError", "password");
    passFlag = 1;
  } else {
    failedRegex("passwordError", "password");
    passFlag = 0;
  }
  return mypass.val();
}

function rePass() {
  let myRepass = $("#repassword");
  let oldpass = passwordValidation();
  if (myRepass.val() == oldpass) {
    passedRegex("repassError", "repassword");
    repassFlag = 1;
  } else {
    failedRegex("repassError", "repassword");
    repassFlag = 0;
  }
  finalCheck();
}

function finalCheck() {
  if (
    nameFlag == 1 &&
    emailFlag == 1 &&
    phoneFlag == 1 &&
    ageFlag == 1 &&
    passFlag == 1 &&
    repassFlag == 1
  ) {
    // console.log("We are Doneeee");
    $("#finalBtn").removeAttr("disabled");
  } else {
    // console.log("Not Yetttt");
    $("#finalBtn").attr("disabled", "true");
  }
}
