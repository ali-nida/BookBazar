/* l file search.js contiene la definizione della funzione Search, che prende in input un testo di ricerca 
e restituisce un oggetto con i campi nome e nvol che rappresentano il nome del libro e il numero del volume, rispettivamente. 
La funzione suddivide il testo in ingresso per spazi e utilizza espressioni regolari per validare il numero del volume. 
Se il testo è composto da una sola parola, imposta il campo nome a -1 per indicare che non è stato specificato. 
Se l'ultimo elemento non è un numero valido per nvol, imposta nome a -1. Altrimenti, costruisce il nome completo concatenando 
gli elementi rimanenti dello splitting. Infine, restituisce l'oggetto con i campi nome e nvol completati.  */

// Definizione della funzione Search per gestire la ricerca
function Search(testo){
    // Funzione interna per verificare la corrispondenza con espressioni regolari
    function verificaRegEx(x, myRegEx){
        if (!(myRegEx.test(x))){
            return false;
        }
        return true;
    }    

    // Inizializzazione dell'oggetto str con campi nome e nvol
    var str = {"nome": "", "nvol": ""};
    // Divisione del testo in ingresso per spazi
    var splitting = testo.split(' ');

    // Se il testo è composto da una sola parola
    if(splitting.length === 1){
        str.nome = "-1"; // Imposta il nome a -1 per indicare che non è stato specificato
        return str; // Restituisce l'oggetto str con nome impostato a -1
    } 

    // Espressione regolare per controllare che nvol sia composto da 1-3 cifre
    var myRegEx = /^[0-9]{1,3}$/;
    var nome = splitting[0]; // Assegna il primo elemento come nome
    var nvol = splitting[(splitting.length)-1]; // Assegna l'ultimo elemento come nvol
    // Se nvol non corrisponde alla regola definita dall'espressione regolare
    if(!verificaRegEx(nvol, myRegEx)) { 
        str.nome = "-1"; // Imposta il nome a -1 per indicare che nvol non è un numero valido
        return str; // Restituisce l'oggetto str con nome impostato a -1
    }
    str.nvol = nvol; // Imposta nvol nell'oggetto str con il valore valido trovato

    // Concatena i restanti elementi dello splitting per formare il nome completo
    for(var i = 1; i < splitting.length - 1; i++ ){
        nome += " " + splitting[i];
    }
    str.nome = nome; // Imposta il nome nell'oggetto str con il valore completo trovato
    return str; // Restituisce l'oggetto str con nome e nvol completati
}

// Esportazione della funzione Search per renderla disponibile ad altri moduli
export default Search;
