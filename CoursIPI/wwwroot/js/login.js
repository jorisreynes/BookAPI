const uri = 'api/Login';

const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const username = usernameField.value;
    const password = passwordField.value;

    const authData = {
        username: username,
        password: password
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })
    .then(response => {
        if (response.ok) {
            response.text().then(data => {
                localStorage.setItem('accessToken', data);

                window.location.href = 'index.html';
            });
        } else {
            console.error('Échec de l\'authentification');
        }
    })
        .catch(error => {
            console.error('Erreur de la requête', error);
        });
});
