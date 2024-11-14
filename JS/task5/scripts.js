document.addEventListener("DOMContentLoaded", function () {
  const scrollToTop = document.getElementById("taskOne__button");

  window.addEventListener("scroll", function () {
    window.scrollY >= 300 ? scrollToTop.style.display = "flex" : scrollToTop.style.display = "none";
  });

  scrollToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
  });
});
