// JavaScript code for search bar function
const searchForm = document.querySelector('.search-form');
const productList = document.querySelector('.product-list');

searchForm.addEventListener('submit', e => {
e.preventDefault();

const searchTerm = searchForm.querySelector('input').value.toLowerCase().trim();
const products = productList.getElementsByTagName('li');

Array.from(products).forEach(product => {
const title = product.querySelector('h2').textContent.toLowerCase();


if (title.includes(searchTerm)) {
  product.style.display = 'block';
} else {
  product.style.display = 'none';
}
});
});