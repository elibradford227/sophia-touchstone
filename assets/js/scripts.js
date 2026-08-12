document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) {
    return;
  }

  const nameError = document.getElementById("name-error");
  const itemDetailsError = document.getElementById("item-details-error");

  form.addEventListener("submit", function (event) {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const itemDetails = document.getElementById("item-details").value.trim();

    nameError.innerHTML = "";
    itemDetailsError.innerHTML = "";

    if (name.length < 2 || name.length > 100) {
      nameError.innerHTML = "Name must be between 2 and 100 characters.";
      isValid = false;
    }

    if (itemDetails.length < 10 || itemDetails.length > 500) {
      itemDetailsError.innerHTML = "Item details must be between 10 and 500 characters.";
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});
