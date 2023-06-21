const closeSession = async() => {
    let response = await fetch('/api/session/logout', {
        method: 'POST',
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(response);

    if (response.status != 200) {
        Swal.fire({
            title: 'Something went wrong'
        })
        return;
    }

    Swal.fire({
        title: 'Logged out succesfully'
    })

    setTimeout(function() {
        location.replace('/login');
    }, 900);
}