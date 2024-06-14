/*visualizza i dati personali dell'utente, inclusi nome, cognome, email e password. 
Il campo password ha un pulsante associato che permette di cambiare la visualizzazione 
tra testo nascosto e testo visibile.*/

// Importazione del componente React e delle immagini per i pulsanti di visualizzazione e nascondimento della password
import { Component } from 'react';
import show from '../images/show.png';
import hide from '../images/hide.png';

// Definizione del componente DatiPersonali
class DatiPersonali extends Component {

    // Inizializzazione della variabile psw per gestire la visualizzazione/nascondimento della password
    psw = "password";

    // Funzione per gestire il clic sul pulsante di visualizzazione/nascondimento della password
    handlePsw = btn => {
        // Cambia il tipo di input tra "password" e "text" in base allo stato attuale
        if(this.psw === "password"){
            this.psw = "text";
        } else {
            this.psw = "password";
        }
        // Aggiorna lo stato di psw per riflettere il cambio
        const psw = this.psw;
        this.setState({ psw });
    }

    // Metodo di rendering del componente
    render(){

        return(

            <>
                {/* Form per visualizzare i dati personali */}
                <div className='container'>
                    {/* Campo Nome */}
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nome</label>
                        <div className="col-sm-10">
                            {/* Visualizza il nome dell'utente in un campo di testo di sola lettura */}
                            <input type="text" readOnly className="form-control-plaintext" value={this.props.utente.nome}  style={{"width": "15rem"}}/>
                        </div>
                    </div>
                    {/* Campo Cognome */}
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Cognome</label>
                        <div className="col-sm-10">
                            {/* Visualizza il cognome dell'utente in un campo di testo di sola lettura */}
                            <input type="text" readOnly className="form-control-plaintext" value={this.props.utente.cognome}  style={{"width": "15rem"}}/>
                        </div>
                    </div>
                    {/* Campo Email */}
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            {/* Visualizza l'email dell'utente in un campo di testo di sola lettura */}
                            <input type="text" readOnly className="form-control-plaintext" value={this.props.utente.email}  style={{"width": "15rem"}}/>
                        </div>
                    </div>
                    {/* Campo Password */}
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            {/* Visualizza la password dell'utente in un campo di testo di sola lettura */}
                            <input type={this.psw === "text"? "text": "password"}  id="psw" readOnly className="form-control-plaintext" value={this.props.passwordUtente}  style={{"width": "15rem"}}/>
                            {/* Pulsante per cambiare la visualizzazione della password */}
                            <button onClick={() => this.handlePsw()} className='btn btn-light'>
                                <img src={this.psw === "text"? hide: show} className="card-img-top" alt="" style={{"width": "1.3rem"}}/>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// Esportazione del componente DatiPersonali per renderlo disponibile ad altri moduli
export default DatiPersonali;
