/*il file registrazione.js, è responsabile della visualizzazione del form di registrazione. 
include campi per il nome, il cognome, l'email e la password, oltre a bottoni per registrarsi e per tornare alla pagina di accesso. 
Ogni campo include anche un alert per mostrare eventuali messaggi di errore riguardanti la validità dei dati inseriti.*/

// Importazione del componente React
import { Component } from 'react';
import $ from 'jquery'; // Importazione della libreria jQuery

// Definizione del componente Registrazione
class Registrazione extends Component {

    render(){
        return(
            <>
                {/* Container per il form di registrazione */}
                <div className='container' style={{"width": "38rem"}}>
                    {/* Campo per il nome */}
                    <div className='col'> 
                        <div className="mb-3">
                            <label htmlFor="exampleInputNome1" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" aria-describedby="nomeHelp"/>
                            {/* Alert per campo vuoto */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.visnome}} role="alert" >
                                Non lasciare il campo vuoto.
                            </div>
                        </div>
                    </div>
                    {/* Campo per il cognome */}
                    <div className='col'> 
                        <div className="mb-3">
                            <label htmlFor="exampleInputCognome1" className="form-label">Cognome</label>
                            <input type="text" className="form-control" id="cognome" aria-describedby="cognomeHelp"/>
                            {/* Alert per campo vuoto */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.viscognome}} role="alert" >
                                Non lasciare il campo vuoto.
                            </div> 
                        </div>
                    </div>
                    {/* Campo per l'email */}
                    <div className='col'> 
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                            {/* Messaggio di aiuto per l'email */}
                            <div id="emailHelp" className="form-text">Non condivideremo mai la tua email con nessun altro.</div>
                            {/* Alert per email non valida */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.visemail}} role="alert" >
                                Inserire una email valida.
                            </div>
                        </div>
                    </div>
                    {/* Campo per la password */}
                    <div className='col'> 
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwd"/>
                            {/* Alert per password non valida */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.vispasswd}} role="alert">
                                Inserire una password di almeno 8 caratteri, una maiuscola ed un numero.
                            </div>
                        </div>
                    </div>
                    {/* Bottone per la registrazione */}
                    <button onClick={() => this.props.OnRegister($('#nome').val(),$('#cognome').val(),$('#email').val(),$('#passwd').val())} className="btn btn-primary">Registrati</button>
                    {/* Bottone per tornare alla pagina di accesso */}
                    <button onClick={() => this.props.OnGoToAccesso()}className="btn btn-link">Accedi</button>
                </div>
            </>
        );
    }
}

// Esportazione del componente Registrazione per renderlo disponibile ad altri moduli
export default Registrazione;
