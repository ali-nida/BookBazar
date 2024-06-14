/*gestisce la fase di checkout del processo di acquisto. 
Il componente visualizza i recapiti disponibili dell'utente e consente di confermare l'ordine. 
Se non viene selezionato un recapito, viene mostrato un messaggio di avviso. 
Una volta confermato l'ordine con successo, viene visualizzato un messaggio di successo 
e l'utente viene reindirizzato alla pagina del carrello.*/

// Importazione della dipendenza Component da React
import { Component } from 'react';
// Importazione del componente CardCheckout
import CardCheckout from './cardcheckout';

// Definizione della classe Checkout come componente esteso da Component
class Checkout extends Component {

    // Stato iniziale del componente
    state = {
        recapito: {
            rec: []
        },
        successMessage: ""
    };

    // Metodo chiamato quando il componente è stato montato nel DOM
    componentDidMount() {
        // Richiesta al server per ottenere il recapito dell'utente
        var getRecapito = {"Id_Utente" : this.props.utente.Id_Utente};
        fetch('http://127.0.0.1:5556/recapitoUtente', {
            method: 'POST',
            body: JSON.stringify(getRecapito),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            // Verifica se è stato restituito un recapito valido
            if(data[0].Id_Recapito !== "-1"){
                this.setState({ recapito: { rec: data } });
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // Variabile di controllo per la visibilità del messaggio di avviso
    control = "hidden";
 
    // Metodo per gestire la conferma dell'ordine
    handleConfermaOrdine = btn => {
        // Verifica se è stato selezionato un recapito effettivo
        if(this.props.Id_Recapito_Effettivo !== -1){
            // Nasconde il messaggio di avviso
            this.control = "hidden";
            // Inserimento dell'ordine nel database
            var Acquisto = {"Id_Utente" : this.props.utente.Id_Utente,"Id_Recapito": this.props.Id_Recapito_Effettivo};
            fetch('http://127.0.0.1:5556/aggiungiAcquisto', {
                method: 'POST',
                body: JSON.stringify(Acquisto),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => res.json())
            .then((data) => {
                // Verifica se l'ordine è stato inserito con successo
                if(data[0].state === "true"){
                    // Visualizza un messaggio di successo e reindirizza all'area carrello
                    this.setState({ successMessage: "Ordine Avvenuto con successo!" });
                    this.props.OnGoToCarrello();
                }
                else{
                    // Avvisa che alcuni prodotti non sono disponibili nella quantità desiderata
                    alert("Alcuni prodotti non sono disponibili per la quantità desiderata..");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
            // Mostra il messaggio di avviso se non è stato selezionato un recapito effettivo
            this.control = "visible";
        }
        // Aggiorna lo stato della variabile di controllo per la visibilità del messaggio di avviso
        this.setState({ control: this.control });
    }

    // Metodo per renderizzare il componente
    render(){
        // Estrazione degli elementi di stato
        const { recapito, successMessage, control } = this.state;

        return(
            <>
                <div className='container'>
                    <div className='row m-3'>
                        {/* Mappa dei recapiti dell'utente per visualizzarli */}
                        {recapito.rec.map(rec => (
                            <CardCheckout 
                                key={rec.Id_Recapito}
                                rec={rec}
                                OnRecapitoEffettivo={this.props.OnRecapitoEffettivo}
                            />
                        ))}
                    </div>
                    <div className='row p-3'>
                        <div className='col'>
                            {/* Bottone per confermare l'ordine */}
                            <button onClick={() => this.handleConfermaOrdine()} className="btn btn-success">Conferma e Acquista</button>
                            {/* Messaggio di avviso per selezionare un recapito */}
                            <h5 style={{visibility: control}}> SELEZIONARE UN INDIRIZZO DI SPEDIZIONE!!</h5>
                            {/* Visualizzazione del messaggio di successo */}
                            {successMessage && <p>{successMessage}</p>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// Esportazione del componente Checkout per renderlo disponibile ad altri moduli
export default Checkout;
