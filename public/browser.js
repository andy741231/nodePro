document.addEventListener("click", function (e) {
  //target refer to the html element that was clicked on
  if (e.target.classList.contains("edit")) {
    let userInput = prompt("Edit item");
    //let itemId = e.target.getAttribute("data-id");
    axios
      .post("/update-item", {
        text: userInput,
        id: e.target.getAttribute("data-id"),
      })
      .then(function () {
        e.target.parentElement.querySelector(".list-group-item").innerHTML =
          userInput;
        querySelector(".list-group-item").innerHTML = "test";
      })
      .catch(function () {
        //erro
        alert("error happens so is success");
      });
  }
});
