// create feature

function returnInput(item){
  return `<li class="list-group-item d-flex justify-content-between"><span class="item-text">${item.text}</span>
            <div class="col-3">
              <button class="btn btn-success edit" data-id="${item._id}">Edit</button><button data-id="${item._id}" class="btn btn-danger ms-3 delete">Delete</button>
            </div>
          </li>`

 }

let input = document.querySelector("#input")
document.querySelector("#form").addEventListener("submit", function(e){
  e.preventDefault()
  axios
      .post("/create-item", {
        text: input.value
      })
      .then((resp) =>(
        document.querySelector("#list").insertAdjacentHTML("beforeend", returnInput(resp.data))
      ))
      .catch(function () {
        //erro
        alert("error happens so is success");
      });

})

document.addEventListener("click", function (e) {

  let itemId = e.target.getAttribute("data-id");

  // delete feature
  if (e.target.classList.contains("delete")) {

    if(confirm("Confirm Delete")){
      axios
      .post("/delete-item", {
        id: itemId
      })
      .then(() =>  e.target.parentElement.parentElement.remove())
      .catch(function () {
        //erro
        alert("error happens so is success");
      });
    }
  }
  
  // update feature
  // target refer to the html element that was clicked on
  if (e.target.classList.contains("edit")) {
    let grabbedInput =
      e.target.parentElement.parentElement.querySelector(
        ".item-text"
      ).innerHTML;
    let userInput = prompt("Edit item", grabbedInput);
    //need to create a function because .then() from axios doesn't take (it's supposed to) function in it's argument. but it can call a function. 
    let updateItem = (x) => e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = x
    if(userInput) {    
      axios
      .post("/update-item", {
        text: userInput,
        id: itemId,
      })
      .then(updateItem(userInput))
      .catch(function () {
        //erro
        alert("error happens so is success");
      });

      
    }
  }
});
