/*Il componente mostra tre pulsanti che consentono all'utente di accedere 
alle sezioni relative ai propri ordini, agli indirizzi e ai dati personali. 
Quando l'utente clicca su uno dei pulsanti, vengono chiamate 
le funzioni OnGoToOrdini, OnGoToIndirizzi o OnGoToDatipersonali, passando eventuali parametri necessari.*/

// Importazione della dipendenza Component da React e delle immagini necessarie
import { Component } from 'react';
import calendario from '../images/calendario.png';
import indirizzo from '../images/indirizzo.png'
import datipersonali from '../images/account.png'

// Definizione del componente Account come classe estesa da Component
class Account extends Component {
    render(){
        return(
            <>
                {/* Container per il contenuto dell'account */}
                <div className='container'>
                    {/* Riga per allineare gli elementi al centro */}
                    <div className='row' style={{textAlign : "center"}}>
                        {/* Titolo della sezione */}
                        <h2>Il tuo account</h2><p/><p/>
                        {/* Bottone per visualizzare gli ordini */}
                        <div className="col">
                            <button onClick={() => this.props.OnGoToOrdini(0)} className="btn btn-light" style={{"width": "13rem"}}>
                                <img src={calendario} className="card-img-top" alt="" style={{"width": "5rem"}}/>
                                <h3>I miei ordini</h3>
                            </button>
                        </div>
                        {/* Bottone per gestire gli indirizzi */}
                        <div className="col">
                            <button onClick={() => this.props.OnGoToIndirizzi()} className="btn btn-light" style={{"width": "13rem"}}>
                                <img src={indirizzo} className="card-img-top" alt="" style={{"width": "5rem"}}/>
                                <h3>Indirizzi</h3>
                            </button>
                        </div>
                        {/* Bottone per visualizzare e modificare i dati personali */}
                        <div className="col">
                            <button onClick={() => this.props.OnGoToDatipersonali()} className="btn btn-light" style={{"width": "13rem"}}>
                                <img src={datipersonali} className="card-img-top" alt="" style={{"width": "5rem"}}/>
                                <h3>Dati personali</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// Esporta il componente Account per renderlo disponibile ad altri moduli
export default Account;
