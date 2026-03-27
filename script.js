let resultat = document.getElementById('resultat');
let boutons = document.querySelectorAll('button');

boutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
        let valeur = bouton.textContent;
        if(valeur === 'C') {
            resultat.value = '';
        } else if (valeur === '=') {
            try {
                resultat.value = eval(resultat.value);
            } catch(error) {
                resultat.value = 'Erreur';
            }
        } else {
            resultat.value += valeur;
        }
    });
});
