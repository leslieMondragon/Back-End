const form = document.getElementById("loginForm");

form.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(form);
    const object = {};

    data.forEach((value, key) => {
        object[key] = value;
    })

    if (object.email == "" || object.password == "") {
        Swal.fire({
            title: 'Fill all inputs'
        })
    } else {
        fetch('/api/session/login', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json()).then(json => {
            if (json.status == 'Ok') {
                Swal.fire({
                    title: 'Logged in'
                })
                setTimeout(function() {location.replace('/');}, 900);

            } else {
                Swal.fire({
                    title: 'Credenciales incorrectas',
                    text: json.error || "Verifica que la cuenta y contraseña sean correctas"
                })
            }
        })
    }
})