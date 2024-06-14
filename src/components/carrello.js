// Importazione della dipendenza Component da React
import { Component } from 'react';
// Importazione del componente CardCarrello
import CardCarrello from './cardcarrello';

// Definizione della classe Carrello come componente esteso da Component
class Carrello extends Component {

    // Inizializzazione dello stato del carrello e dello stato di vuoto
    carrello = {
        qcar: [
          {Id_Utente: 1, Id_Prodotto: 0, quantità: 0, nome: "", nvol: 0, src_image: "", prezzo: ""},
        ]
    }
    carrelloempty = {state : "true"};

    // Metodo chiamato quando il componente è stato montato nel DOM
    componentDidMount() {
        // Richiesta al server per ottenere il carrello dell'utente
        var idutente = {"Id_Utente": this.props.utente.Id_Utente};
        fetch('http://127.0.0.1:5556/ottieniCarrello', {
            method: 'POST',
            body: JSON.stringify(idutente),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            if (data[0].Id_Utente === "-1") {
                this.carrelloempty.state = "true";
                const carrelloempty = this.carrelloempty;
                this.setState({carrelloempty});
            } else {
                this.carrello.qcar = data;
                const carrello = this.carrello;
                this.carrelloempty.state = "false";
                const carrelloempty = this.carrelloempty;
                this.setState({carrelloempty});
                this.setState({carrello});
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // Metodo per gestire la rimozione di un elemento dal carrello
    handleRemove = qcar1 => {
        // Richiesta al server per rimuovere l'elemento dal carrello
        var DeleteCarrello = {"Id_Utente": qcar1.Id_Utente, "Id_Prodotto": qcar1.Id_Prodotto};
        fetch('http://127.0.0.1:5556/deleteProdottoCarrello', {
            method: 'POST',
            body: JSON.stringify(DeleteCarrello),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            if (data[0].state === "false") {
                // Prodotto NON rimosso perché non disponibile nel magazzino
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
        // Aggiornamento del carrello dopo la rimozione dell'elemento
        this.componentDidMount();
    }

    // Metodo per gestire l'aggiunta o la rimozione di una quantità di un elemento nel carrello
    handleAddQuantità = (qcar1, value) => {
        // Richiesta al server per aggiungere o rimuovere una quantità di un elemento dal carrello
        var aggiungialCarrello = {"Id_Utente": qcar1.Id_Utente, "Id_Prodotto": qcar1.Id_Prodotto, "sign": ""};
        var update = "false";

        if (value === "up") {
            if (qcar1.quantità !== 10) {
                qcar1.quantità++;
                aggiungialCarrello.sign = "+";
                update = "true";
            }
        } else {
            if (qcar1.quantità !== 1) {
                qcar1.quantità--;
                aggiungialCarrello.sign = "-";
                update = "true";
            }
        }
        // Aggiornamento del carrello dopo l'aggiunta o la rimozione della quantità
        if (update === "true") {
            fetch('http://127.0.0.1:5556/aggiungialCarrello', {
                method: 'POST',
                body: JSON.stringify(aggiungialCarrello),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => res.json())
            .then((data) => {
                if (data[0].state === "false") {
                    // Prodotto esaurito nel magazzino
                }
            })
            .catch((err) => {
                console.log(err.message);
            });

            const qcar = this.carrello.qcar.filter(qcarv => qcarv.Id_Prodotto === qcar1.Id_Prodotto);
            this.setState({qcar});
        }
    }
   
    // Metodo per renderizzare il componente in base allo stato dell'utente e del carrello
    render() {
        switch (this.props.utente.Id_Utente) {
            case -1: {
                return (
                    // Messaggio per richiedere l'accesso per visualizzare il carrello
                    <>
                        <h3>Per visualizzare il carrello bisogna accedere</h3>
                    </>
                );
            }
            default: {
                if (this.carrelloempty.state === "true") {
                    // Messaggio di carrello vuoto
                    return (
                        <>
                            <h3>Il carrello è vuoto</h3>
                        </>
                    );
                } else {
                    // Visualizzazione del carrello e dei dettagli dell'ordine
                    const totale = this.carrello.qcar
                        .map(qcar => qcar.quantità * qcar.prezzo)
                        .reduce((prev, curr) => prev + curr, 0)
                        .toFixed(2); // Arrotonda e formatta il totale

                    return (
                        <>
                            <div className='container'>
                                <div className="row">
                                    <div className='col-8'>
                                        {this.carrello.qcar.map(qcar => (
                                            <CardCarrello 
                                                key={qcar.Id_Prodotto}
                                                qcar={qcar}
                                                OnAddQuantità={this.handleAddQuantità}
                                                onRemove={this.handleRemove}
                                            />
                                        ))}
                                        <hr />
                                    </div>
                                    <div className='col-4'>
                                        <div className="card" style={{"width": "18rem"}}>
                                            <div className="card-body">
                                                <h5 className="card-title">Nel Carrello</h5>
                                                <hr />
                                                <p className="card-text">
                                                    {this.carrello.qcar.map(qcar => qcar.quantità).reduce((prev, curr) => prev + curr, 0)} articoli
                                                </p>
                                                <p className="card-text">
                                                    Totale: {totale}€
                                                </p>
                                                <div className="d-grid gap-2">
                                                    <button onClick={() => this.props.OnGoToCheckout()} className="btn btn-info m-2">
                                                        Procedi con il Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }
            }
        }
    }
}

// Esportazione del componente Carrello per renderlo disponibile ad altri moduli
export default Carrello;