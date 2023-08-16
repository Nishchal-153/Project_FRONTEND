// Function to load products
function loadProducts() {
  $.get('http://localhost:3000/products', function(products) {
    $('#products').empty();
    products.forEach(product => {
      // Display the product on the page
      // Add buttons for updating and deleting
    });
  });
}

// Function to add a product
$('#add-product-form').submit(function(e) {
  e.preventDefault();
  const product = {
    name: $('#name').val(),
    price: $('#price').val(),
    category: $('#category').val(),
    inStock: $('#inStock').is(':checked')
  };

  $.post('http://localhost:3000/products', product, function() {
    loadProducts();
    $('#add-product-form')[0].reset();
  });
});

// Add functions for updating and deleting products using $.ajax

// Load products on page load
loadProducts();