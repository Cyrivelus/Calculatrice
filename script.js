<<<<<<< HEAD
const resultat = document.getElementById('resultat');
const modeButtons = document.querySelectorAll('.mode');
const calcButtons = document.querySelectorAll('.standard .boutons button');
const imcButton = document.getElementById('imc-calc');
const pretButton = document.getElementById('pret-calc');

function setMode(mode) {
    document.querySelectorAll('.panel, .standard').forEach(section => section.classList.remove('active'));
    if (mode === 'standard') {
        document.querySelector('.standard').classList.add('active');
    } else {
        document.getElementById(`${mode}-panel`).classList.add('active');
    }
    modeButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.mode === mode);
    });
}

function round(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function sanitize(expression) {
    return expression.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
}

function evaluateExpression(expression) {
    const sanitized = sanitize(expression);
    if (!sanitized || /[^0-9+\-*/().\s]/.test(sanitized)) {
        throw new Error('Expression invalide');
    }
    return Function(`return ${sanitized}`)();
}

function handleCalcClick(value) {
    switch (value) {
        case 'C':
            resultat.value = '';
            break;
        case 'DEL':
            resultat.value = resultat.value.slice(0, -1);
            break;
        case '=':
            try {
                resultat.value = String(round(evaluateExpression(resultat.value)));
            } catch (error) {
                resultat.value = 'Erreur';
            }
            break;
        case '√':
            try {
                const valeur = round(evaluateExpression(resultat.value || '0'));
                resultat.value = valeur >= 0 ? String(round(Math.sqrt(valeur))) : 'Erreur';
            } catch {
                resultat.value = 'Erreur';
            }
            break;
        case 'x²':
            try {
                const valeur = evaluateExpression(resultat.value || '0');
                resultat.value = String(round(valeur * valeur));
            } catch {
                resultat.value = 'Erreur';
            }
            break;
        case '%':
            resultat.value += '%';
            break;
        case '()':
            resultat.value += '()';
            break;
        default:
            resultat.value += value;
            break;
    }
}

modeButtons.forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
});

calcButtons.forEach(button => {
    button.addEventListener('click', () => handleCalcClick(button.textContent));
});

imcButton.addEventListener('click', () => {
    const poids = parseFloat(document.getElementById('imc-poids').value.replace(',', '.'));
    const taille = parseFloat(document.getElementById('imc-taille').value.replace(',', '.'));
    const resultBox = document.getElementById('imc-result');

    if (!poids || !taille || taille <= 0 || poids <= 0) {
        resultBox.textContent = 'Veuillez entrer un poids et une taille valides.';
        return;
    }

    const imc = poids / (taille * taille);
    let categorie = 'Inconnu';

    if (imc < 18.5) categorie = 'Maigreur';
    else if (imc < 25) categorie = 'Normal';
    else if (imc < 30) categorie = 'Surpoids';
    else categorie = 'Obésité';

    resultBox.textContent = `IMC : ${round(imc)} — ${categorie}`;
});

pretButton.addEventListener('click', () => {
    const montant = parseFloat(document.getElementById('pret-montant').value.replace(',', '.'));
    const monnaie = document.getElementById('pret-monnaie').value;
    const taux = parseFloat(document.getElementById('pret-taux').value.replace(',', '.'));
    const duree = parseFloat(document.getElementById('pret-duree').value);
    const resultBox = document.getElementById('pret-result');

    if (!montant || montant <= 0 || !duree || duree <= 0 || taux < 0) {
        resultBox.textContent = 'Veuillez entrer un montant, un taux et une durée valides.';
        return;
    }

    const mensualites = duree * 12;
    const tauxMensuel = taux / 100 / 12;
    let mensualite;

    if (tauxMensuel === 0) {
        mensualite = montant / mensualites;
    } else {
        mensualite = montant * tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -mensualites));
    }

    const total = mensualite * mensualites;
    const interet = total - montant;
    const signe = monnaie === 'FCFA' ? 'FCFA' : monnaie;

    resultBox.innerHTML = `Mensualité : ${round(mensualite)} ${signe}<br>Total : ${round(total)} ${signe}<br>Intérêts : ${round(interet)} ${signe}`;
});

setMode('standard');
=======
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
>>>>>>> c6170944f6902c81551bdb3bea2c6518f633d328
