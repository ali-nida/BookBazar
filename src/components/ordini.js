/*esegue una richiesta al server per ottenere gli ordini dell'utente o tutti gli ordini se l'utente è un amministratore. 
Successivamente, mostra gli ordini o un messaggio se non ci sono ordini disponibili.*/

// Importazione del componente React
import { Component } from 'react';
// Importazione del componente CardAcquisto
import CardAcquisto from './cardacquisto';

// Definizione del componente Ordini
class Ordini extends Component {

    // Inizializzazione dell'oggetto "acquisto" con un array vuoto di ordini
    acquisto = {
        ordini : []
    }

    // Variabile per gestire la visualizzazione degli ordini
    visualizza = "true";

    // Metodo chiamato quando il componente è montato
    componentDidMount() {
        // Se l'utente è un amministratore
        if(this.props.admin === 1){
            // Richiesta GET per ottenere tutti gli ordini
            fetch('http://127.0.0.1:5556/acquisti/:getAll', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => res.json())
            .then((data) => {
                // Se non ci sono ordini
                if(data[0].Id_Acquisto === "-1"){
                    this.visualizza = "false"; // Imposta la visualizzazione a falso
                    const visualizza = this.visualizza;
                    this.setState({visualizza}); // Aggiorna lo stato
                }
                else{
                    this.acquisto.ordini = data; // Aggiorna l'array degli ordini
                    const acquisto = this.acquisto;
                    this.setState({acquisto}); // Aggiorna lo stato
                }
            })
            .catch((err) => {
                console.log(err.message);
            });

        }
        else{
            // Altrimenti se l'utente è un utente normale
            var getOrdini = {"Id_Utente" : this.props.utente.Id_Utente};
            // Richiesta POST per ottenere gli ordini dell'utente
            fetch('http://127.0.0.1:5556/getOrdini', {
                method: 'POST',
                body: JSON.stringify(getOrdini),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => res.json())
            .then((data) => {
                // Se non ci sono ordini
                if(data[0].Id_Acquisto === "-1"){
                    this.visualizza = "false"; // Imposta la visualizzazione a falso
                    const visualizza = this.visualizza;
                    this.setState({visualizza}); // Aggiorna lo stato
                }
                else{
                    this.acquisto.ordini = data; // Aggiorna l'array degli ordini
                    const acquisto = this.acquisto;
                    this.setState({acquisto}); // Aggiorna lo stato
                }
            }) 
            .catch((err) => {
                console.log(err.message);
            });

        }
    }

    render(){
        // Se la visualizzazione è attiva
        if(this.visualizza === "true"){
            // Renderizza gli ordini
            return(
                <>
                    <div className='container'>
                        {this.acquisto.ordini.map(ordini => (
                            <CardAcquisto 
                            key={ordini.Id_Acquisto}
                            ordini={ordini}
                            OnGoToVisualizzaOrdine={this.props.OnGoToVisualizzaOrdine}/>
                        ))}
                    </div>
                </>
            );
        }
        // Altrimenti se non ci sono ordini
        return(
            // Visualizza un messaggio
            <h3>Non ci sono ordini</h3>
        );
        
    }
}

// Esportazione del componente Ordini per renderlo disponibile ad altri moduli
export default Ordini;
