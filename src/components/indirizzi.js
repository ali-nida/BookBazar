/*Gli indirizzi vengono recuperati dal server e visualizzati tramite il componente CardIndirizzi. 
È inoltre possibile rimuovere gli indirizzi esistenti e aggiungerne di nuovi.*/

// Importazione del componente React e del componente CardIndirizzi
import { Component } from 'react';
import CardIndirizzi from './cardindirizzi';

// Definizione del componente Indirizzi
class Indirizzi extends Component {
    // Inizializzazione dei dati relativi agli indirizzi recapito
    recapito = {
        rec: []
    }
  
    // Funzione per rimuovere un recapito
    handleRemoveRecapito = rec => {
        // Creazione della richiesta per eliminare il recapito
        var getRecapito = {"Id_Recapito" : rec.Id_Recapito};
        fetch('http://127.0.0.1:5556/delete/:recapito', {
            method: 'POST',
            body: JSON.stringify(getRecapito),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            // Se la rimozione è avvenuta con successo, aggiorna la lista degli indirizzi
            if(data[0].state === "true"){
                this.componentDidMount();
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // Metodo chiamato quando il componente è stato montato
    componentDidMount() {
        // Recupera gli indirizzi recapito dell'utente dal server
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
            // Se sono presenti indirizzi recapito, li memorizza
            if(data[0].Id_Recapito !== "-1"){
                this.recapito.rec = data;
            }
            // Altrimenti, imposta la lista degli indirizzi vuota
            else{
                this.recapito.rec = [];
            }
            // Aggiorna lo stato degli indirizzi recapito nel componente
            const recapito = this.recapito;
            this.setState({recapito});
        })
        .catch((err) => {
            console.log(err.message);
        });

    }

    // Metodo di rendering del componente
    render(){
        return(
            <>
                {/* Contenuto della sezione indirizzi */}
                <div className='container'>
                    {/* Mappa degli indirizzi recapito */}
                    <div className='row m-3'>
                        {this.recapito.rec.map(rec => (
                            <CardIndirizzi 
                                key={rec.Id_Recapito}
                                rec={rec}
                                OnRemoveRecapito={this.handleRemoveRecapito}/>
                        ))}
                    </div>
                    {/* Pulsante per aggiungere un nuovo indirizzo recapito */}
                    <div className='row'>
                        <hr />
                        <button onClick={() => this.props.OnGoToAddRecapito(this.recapito.rec.length)} className="btn btn-info m-3" style={{"width": "20rem"}}>Aggiungi nuovo recapito</button>
                        <div className="form-text">Numero massimo di indirizzi : 3</div>
                    </div>
                </div>
            </>
        );
    }
}

// Esportazione del componente Indirizzi per renderlo disponibile ad altri moduli
export default Indirizzi;
