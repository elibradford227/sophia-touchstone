document.addEventListener("DOMContentLoaded", function () {
  const storeHours = {
    Sunday: { open: 9, close: 16, display: "9:00 AM - 4:00 PM" },
    Monday: { open: 7, close: 20, display: "7:00 AM - 8:00 PM" },
    Tuesday: { open: 7, close: 20, display: "7:00 AM - 8:00 PM" },
    Wednesday: { open: 7, close: 20, display: "7:00 AM - 8:00 PM" },
    Thursday: { open: 7, close: 20, display: "7:00 AM - 8:00 PM" },
    Friday: { open: 7, close: 20, display: "7:00 AM - 8:00 PM" },
    Saturday: { open: 8, close: 18, display: "8:00 AM - 6:00 PM" },
  };

  const openStatus = document.getElementById("open-status");

  if (openStatus) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const now = new Date();
    const today = dayNames[now.getDay()];
    const currentHour = now.getHours();
    const todayHours = storeHours[today];

    if (currentHour >= todayHours.open && currentHour < todayHours.close) {
      openStatus.innerHTML = "We're open now! Today's hours: " + todayHours.display;
    } else {
      openStatus.innerHTML = "We're closed right now. Today's hours: " + todayHours.display;
    }

    const dayChecker = document.getElementById("day-checker");
    const dayHoursOutput = document.getElementById("day-hours-output");

    dayChecker.addEventListener("change", function () {
      const selectedDay = dayChecker.value;
      dayHoursOutput.innerHTML = selectedDay + " hours: " + storeHours[selectedDay].display;
    });
  }

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
      console.log(localStorage);
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
