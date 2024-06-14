/*il file accesso.js,  rappresenta il form di accesso dell'applicazione. 
Il componente accetta alcune props (alertaccesso, OnAccesso, OnRegistrazione) 
e restituisce un form HTML per l'inserimento dell'email e della password, 
con relativi controlli di validazione e messaggi di errore. 
Infine, due pulsanti consentono all'utente di accedere o registrarsi.*/

// Importazione delle dipendenze React e jQuery
import { Component } from 'react';
import $ from 'jquery';

// Definizione del componente Accesso come classe estesa da Component
class Accesso extends Component {
    render(){
        return(
            <>
                {/* Container per il form di accesso */}
                <div className='container' style={{"width": "38rem"}}>
                    <div className='col'> 
                        {/* Campo email */}
                        <div className="mb-3">
                            <div class="form-floating mb-3">
                                <input type="email" id="email" class="form-control" placeholder="" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            {/* Testo informativo */}
                            <div id="emailHelp" className="form-text">Non condivideremo mai la tua email con nessun altro.</div>
                            {/* Alert per errori email */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.visemail}} role="alert" >
                                Inserire una email valida.
                            </div>
                        </div>
                    </div>
                    <div className='col'> 
                        {/* Campo password */}
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwd" />
                            {/* Alert per errori password */}
                            <div className="alert alert-danger" style={{visibility : this.props.alertaccesso.vispasswd}} role="alert">
                                Inserire una password di almeno 8 caratteri, una maiuscola ed un numero.
                            </div>
                        </div>
                    </div>
                    {/* Pulsante per accedere */}
                    <button onClick={() => this.props.OnAccesso($('#email').val(),$('#passwd').val())} className="btn btn-primary">Accedi</button>
                    {/* Pulsante per registrarsi */}
                    <button onClick={() => this.props.OnRegistrazione()} className="btn btn-link m-2">Registrati</button>
                </div>
            </>
        );
    }
}

// Esporta il componente Accesso per renderlo disponibile ad altri moduli
export default Accesso;
