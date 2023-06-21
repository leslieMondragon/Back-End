const form = document.getElementById("registerForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const object = {};

  data.forEach((value, key) => {
    object[key] = value;
  });

  fetch("/api/session/register", {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => {
      if (json.status == "Ok") {
        Swal.fire({
          icon: "",
          title: "Account created succesfully",
        });
        setTimeout(function () {
          location.replace("/login");
        }, 900);
      } else {
        Swal.fire({
          icon: "",
          title: "Cuenta no creada",
          text: json.error || "Ya existe una cuenta con ese email",
        });
      }
    });
});
