/*Questo file contiene il componente AddRecapito, che è responsabile per l'aggiunta di un nuovo recapito. 
Il componente include una serie di campi di input per inserire i dettagli 
dell'indirizzo, come via, numero civico, città, provincia, CAP, telefono e note per il corriere. 
Quando l'utente fa clic sul pulsante "Aggiungi indirizzo", viene eseguita la funzione handleAddIndirizzo 
per gestire la validazione dei dati e l'invio della richiesta al server per aggiungere l'indirizzo.*/


// Importazione della dipendenza Component da React e della libreria jQuery
import { Component } from 'react';
import $ from 'jquery';

// Importazione del componente ControlRecapito
import ControlRecapito from './controlrecapito';

// Definizione del componente AddRecapito come classe estesa da Component
class AddRecapito extends Component {
    
    // Dichiarazione di variabili per la gestione degli avvisi
    alertrecapito = {"via": "hidden", "ncivico": "hidden","cit":"hidden","pr":"hidden","cap": "hidden","tel": "hidden","note": "hidden",};

    // Funzione per gestire l'aggiunta di un nuovo indirizzo
    handleAddIndirizzo = (via, ncivico, città, provincia, cap, telefono, note) => {
        // Validazione dei dati tramite la funzione ControlRecapito
        var stop = ControlRecapito(via, ncivico, città, provincia, cap, telefono, note);
        
        // Gestione degli avvisi in base alla validazione
        // Via
        if(stop.via === "true") {
            this.alertrecapito.via = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        } 
        else {
            this.alertrecapito.via = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // Numero civico
        if(stop.ncivico === "true") {
            this.alertrecapito.ncivico = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        else {
            this.alertrecapito.ncivico = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // Città
        if(stop.città === "true") {
            this.alertrecapito.cit = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        else {
            this.alertrecapito.cit = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // Provincia
        if(stop.provincia === "true") {
            this.alertrecapito.pr = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        else {
            this.alertrecapito.pr = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // CAP
        if(stop.cap === "true") {
            this.alertrecapito.cap = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        else {
            this.alertrecapito.cap = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // Telefono
        if(stop.telefono === "true") {
            this.alertrecapito.tel = "visible";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        else {
            this.alertrecapito.tel = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        }
        
        // Note
        if(stop.note === "true") {
            //this.alertrecapito.note = "visible";
            //const alertrecapito = this.alertrecapito;
            //this.setState({alertrecapito});
            note = "Nessuna nota.";
        } 
        else {
            this.alertrecapito.note = "hidden";
            const alertrecapito = this.alertrecapito;
            this.setState({alertrecapito});
        } 

        // Se tutti i controlli passano, procedi con l'aggiunta del recapito
        if(stop.via !== "true" && stop.ncivico !== "true" && stop.città !== "true" && stop.provincia !== "true" && stop.cap !== "true" && stop.telefono !== "true") {
            var addrecapito = {"Id_Utente": this.props.utente.Id_Utente, "via": via, "ncivico": ncivico, "città": città, "provincia": provincia, "cap": cap, "telefono": telefono, "note": note};
            
            // Chiamata fetch per l'aggiunta del recapito
            fetch('http://127.0.0.1:5556/inserisciRecapito', {
                method: 'POST',
                body: JSON.stringify(addrecapito),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => res.json())
            .then((data) => {
                if(data[0].state === "true"){
                    this.props.OnGoToIndirizzi();
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }

    // Renderizzazione del componente
    render() {
        return (
            <>
                {/* Contenitore per il form */}
                <div className='container' style={{textAlign : "center"}}>
                    <div className='row'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-8'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputNome1" className="form-label">Via </label>
                                        <input type="text" className="form-control" id="via" aria-describedby="nomeHelp"/>
                                        <div className="alert alert-danger" style={{visibility : this.alertrecapito.via}} role="alert" >
                                            Non lasciare il campo vuoto.
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputNome1" className="form-label">Numero civico</label>
                                        <input type="text" className="form-control" id="ncivico" aria-describedby="nomeHelp"/>
                                        <div className="alert alert-danger" style={{visibility : this.alertrecapito.ncivico}} role="alert" >
                                            Inserire numero.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <p/>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputNome1" className="form-label">Città</label>
                                    <input type="text" className="form-control" id="città" aria-describedby="nomeHelp"/>
                                    <div className="alert alert-danger" style={{visibility : this.alertrecapito.cit}} role="alert" >
                                        Non lasciare il campo vuoto.
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputNome1" className="form-label">Provincia</label>
                                    <input type="text" className="form-control" id="provincia" aria-describedby="nomeHelp"/>
                                    <div className="alert alert-danger" style={{visibility : this.alertrecapito.pr}} role="alert" >
                                        Inserire la sigla.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputNome1" className="form-label">CAP</label>
                                    <input type="text" className="form-control" id="cap" aria-describedby="nomeHelp"/>
                                    <div className="alert alert-danger" style={{visibility : this.alertrecapito.cap}} role="alert" >
                                        Inserire un CAP valido.
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputNome1" className="form-label">Telefono</label>
                                    <input type="text" className="form-control" id="telefono" aria-describedby="nomeHelp"/>
                                    <div className="alert alert-danger" style={{visibility : this.alertrecapito.tel}} role="alert" >
                                        Inserire un numero valido.
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputNome1" className="form-label">Note per il corriere</label>
                                    <input type="text" className="form-control" id="note" aria-describedby="nomeHelp"/>
                                    <div className="alert alert-danger" style={{visibility : this.alertrecapito.note}} role="alert" >
                                        Non lasciare il campo vuoto.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottone per aggiungere l'indirizzo */}
                    <button onClick={() => this.handleAddIndirizzo($('#via').val(),$('#ncivico').val(),$('#città').val(),$('#provincia').val(),$('#cap').val(),$('#telefono').val(),$('#note').val())} className='btn btn-primary'>
                        Aggiungi indirizzo
                    </button>
                </div> 
            </>
        );
    }
}

// Esportazione del componente AddRecapito per renderlo disponibile ad altri moduli
export default AddRecapito;
