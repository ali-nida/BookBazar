/*verifica la validità dei dati inseriti durante la registrazione. 
La funzione controlla la validità dell'email e della password, oltre ai campi nome e cognome. 
Se il flag ct è impostato su 1, la funzione restituirà lo stato di validazione, 
altrimenti restituirà stop, che indica lo stato dei campi.*/

// Definizione della funzione Control per la validazione dei dati di registrazione
function Control(email, passwd, nome, cognome, ct) {
    
    // Oggetto per memorizzare lo stato di validazione dei campi
    var stop = { "email": "false", "passwd": "false", "nome": "false", "cognome": "false" };

    // Funzione per verificare se un campo è vuoto
    function isVuoto(x) {
        if ((x === "") || (x === "undefined")) {
            return true;
        }
        return false;
    }

    // Funzione per verificare se un valore corrisponde a un'espressione regolare
    function verificaRegEx(x, myRegEx) {
        if (!(myRegEx.test(x))) {
            return false;
        }
        return true;
    }

    // Controllo del campo email
    if (isVuoto(email)) {
        stop.email = "true"; // Imposta lo stato a "true" se l'email è vuota
    } 
    // Verifica del formato dell'email tramite espressione regolare
    var myRegEx = /^[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}$/;
    if (!verificaRegEx(email, myRegEx)) {
        stop.email = "true"; // Imposta lo stato a "true" se il formato dell'email non è valido
    }
    
    // Controllo del campo password
    if (isVuoto(passwd)) {
        stop.passwd = "true"; // Imposta lo stato a "true" se la password è vuota
    }
    // Verifica del formato della password tramite espressioni regolari
    myRegEx = /^[A-z0-9\+\.\?-_]{8}/; // Almeno 8 caratteri
    if (!verificaRegEx(passwd, myRegEx)) {
        stop.passwd = "true"; // Imposta lo stato a "true" se il formato della password non è valido
    }
    myRegEx = /[0-9]/; // Almeno un numero
    if (!verificaRegEx(passwd, myRegEx)) {
        stop.passwd = "true"; // Imposta lo stato a "true" se il formato della password non è valido
    }
    myRegEx = /[A-Z]/; // Almeno una lettera maiuscola
    if (!verificaRegEx(passwd, myRegEx)) {
        stop.passwd = "true"; // Imposta lo stato a "true" se il formato della password non è valido
    }
    
    // Controllo del flag ct
    if (ct === 1) {
        return stop; // Restituisce lo stato di validazione se ct è 1
    }
    
    // Controllo dei campi nome e cognome
    if (isVuoto(nome)) {
        stop.nome = "true"; // Imposta lo stato a "true" se il campo nome è vuoto
    } 
    if (isVuoto(cognome)) {
        stop.cognome = "true"; // Imposta lo stato a "true" se il campo cognome è vuoto
    }
    
    // Restituisce lo stato di validazione
    return stop;
}

// Esportazione della funzione Control per renderla disponibile ad altri moduli
export default Control;
