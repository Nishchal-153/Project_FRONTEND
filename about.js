// JavaScript code for changing team member images on hover
const teamListItems = document.querySelectorAll('.team-list li');

teamListItems.forEach(item => {
  const img = item.querySelector('img');
  const defaultSrc = img.src;
  const hoverSrc = defaultSrc.replace('.jpg', '-hover.jpg');

  item.addEventListener('mouseenter', () => {
    img.src = hoverSrc;
 });

  item.addEventListener('mouseleave', () => {
    img.src = defaultSrc;
  });
});