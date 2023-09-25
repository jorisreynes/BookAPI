const uri = 'api/Login';

// Récupération des éléments du formulaire
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

// Écouteur d'événement pour le formulaire
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    // Récupération des valeurs des champs de formulaire
    const username = usernameField.value;
    const password = passwordField.value;

    // Création de l'objet JSON avec les données d'authentification
    const authData = {
        username: username,
        password: password
    };

    // Envoi des données au serveur via une requête POST
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
                // Stockez le token dans le localStorage
                localStorage.setItem('accessToken', data.token);

                // Redirigez l'utilisateur vers la page souhaitée (par exemple, index.html)
                window.location.href = 'index.html';
                //alert("OK");
            });
        } else {
            // La requête a échoué, affichez un message d'erreur ou effectuez une autre action appropriée
            console.error('Échec de l\'authentification');
        }
    })
        .catch(error => {
            // Gestion des erreurs de la requête
            console.error('Erreur de la requête', error);
        });
});
