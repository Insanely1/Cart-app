import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
  databaseURL: "https://playground-58978-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "movies")



const cart = document.getElementById('cart');
const button = document.getElementById('button');
const list = document.getElementById("list");


button.addEventListener('click', function (e) {
  let cartValue = cart.value;

  push(shoppingListInDB, cartValue)

  clearCart();

});



onValue(shoppingListInDB, function (snapshot) {



  if (snapshot.exists()) {
    let listArray = Object.entries(snapshot.val());

    clearListElement();

    for (let i = 0; i < listArray.length; i++) {
      const element = listArray[i];
      const eleID = element[0];
      const eleValue = element[1];


      addDataToCart(element);

    }

  }else{
 list.innerHTML= "no item";  
  }

})

function clearListElement() {
  list.innerHTML = null;
}

function clearCart() {
  cart.value = null
}


function addDataToCart(cartEntries) {

  let cartID = cartEntries[0];
  let cartValue = cartEntries[1];
  // list.innerHTML += `<li>${cartValue}</li>`

  let newEl = document.createElement('li');
  newEl.textContent = cartValue;

  newEl.addEventListener('click', function () {

    let locationOfTheItem = ref(database, `movies/${cartID}`)
    remove(locationOfTheItem);

  });


  list.append(newEl);




}





