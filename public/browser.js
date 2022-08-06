document.addEventListener("click", function (e) {
  //target refer to the html element that was clicked on
  if (e.target.classList.contains("edit")) {
    let grabbedInput =
      e.target.parentElement.parentElement.querySelector(
        ".item-text"
      ).innerHTML;
    let userInput = prompt("Edit item", grabbedInput);

    let itemId = e.target.getAttribute("data-id");
    function grabbingInput(x) {
      e.target.parentElement.parentElement.querySelector(
        ".item-text"
      ).innerHTML = x;
    }
    axios
      .post("/update-item", {
        text: userInput,
        id: itemId,
      })
      .then(grabbingInput(userInput))
      .catch(function () {
        //erro
        alert("error happens so is success");
      });
  }
});
