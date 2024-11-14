const getData = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

const ul = document.getElementById("carousel");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper button");
const leftBtn = document.getElementById("left")
const rightBtn = document.getElementById("right")
const wrapper = document.getElementById("wrapper")

let isDragging = false, startX, startScrollLeft;

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

getData("https://jsonplaceholder.typicode.com/photos").then((photos) => {
  photos.forEach((photo) => {
    const image = photo.url
    const title = photo.title
    if (photo.albumId === 1) {
      ul.insertAdjacentHTML('afterbegin', `<li class="card"><div class="img"><img src=${image} alt="img" draggable="false"></div>
            <h2>${title}</h2></li>`);
    }
  })
})

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -500 : 500;
  });
});

function isElementInView(element, container) {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return (
    elementRect.left >= containerRect.left - 50 &&
    elementRect.right <= containerRect.right + 50
  );
}

carousel.addEventListener("scroll", (event) => {
  const listItems = carousel.querySelectorAll('li')
  if (isElementInView(listItems[0], wrapper)) {
    leftBtn.setAttribute("disabled", "disabled");
  } else {
    leftBtn.removeAttribute("disabled");
  }

  if (isElementInView(listItems[listItems.length - 1], wrapper)) {
    rightBtn.setAttribute("disabled", "disabled");
  } else {
    rightBtn.removeAttribute("disabled");
  }
})

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
