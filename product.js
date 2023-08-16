const addToCartButton = document.getElementById("addToCart");
const quantity = document.querySelector(".quantity");

let availableQuantity = parseInt(quantity.textContent.match(/\d+/)[0]);

addToCartButton.addEventListener("click", function() {
  if (availableQuantity > 0) {
    availableQuantity--;
    quantity.textContent = `Available Quantity: ${availableQuantity}`;
    alert("Item added to cart!");
  } else {
    alert("Sorry, this item is out of stock.");
  }
});