const filterInput = document.getElementById('filter__input');
const listItems = document.querySelectorAll('.listItem');

filterInput.addEventListener('input', function () {
  const filterValue = filterInput.value.toLowerCase();
  listItems.forEach(function (item) {
    const text = item.innerText.toLowerCase();
    if (text.includes(filterValue)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
});

