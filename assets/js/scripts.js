document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) {
    return;
  }

  const nameError = document.getElementById("name-error");
  const itemDetailsError = document.getElementById("item-details-error");

  const fields = document.querySelectorAll(
    "#name, #email, #phone, #request-type, #item-details, #pickup-date, #allergy-notes"
  );

  fields.forEach(function (field) {
    const savedValue = localStorage.getItem(field.id);
    
    if (savedValue) {
      field.value = savedValue;
    }

    field.addEventListener("input", function () {
      localStorage.setItem(field.id, field.value);
    });
  });

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
      return;
    }

    fields.forEach(function (field) {
      localStorage.removeItem(field.id);
    });
  });
});
