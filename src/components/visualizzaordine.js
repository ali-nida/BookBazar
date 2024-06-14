/* Utilizza una richiesta HTTP per ottenere i prodotti associati all'ordine e li visualizza utilizzando il componente CardVisualizzaOrdine. 
Il componente mostra un pulsante per tornare alla lista degli ordini precedenti. */

import { Component } from 'react';
import CardVisualizzaOrdine from './cardvisualizzaordine';

class VisualizzaOrdine extends Component{

    // Inizializzazione dell'oggetto ordine con campo prodotti
    ordine = {
        prodotti: [
            // Definizione dei prodotti dell'ordine
            //{Id_Utente: 1, Id_Prodotto: 0, quantità: 0, nome: "", nvol: 0, src_image: "", prezzo : ""},
        ]
    }

    componentDidMount() {
        // Richiesta per ottenere i prodotti dell'ordine dall'API
        var getAcquisti = {"Id_Acquisto" : this.props.ordineacquisto.Id_Acquisto};
        fetch('http://127.0.0.1:5556/getProdottiOrdine', {
            method: 'POST',
            body: JSON.stringify(getAcquisti),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            // Se ci sono prodotti nell'ordine, aggiornare lo stato dell'oggetto ordine
            if(data[0].Id_Acquisto !== "-1"){
                this.ordine.prodotti = data;
                const ordine = this.ordine;
                this.setState({ordine});
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
 
    render(){
        return(
            <>
                <div className="container">
                    {/* Bottone per tornare alla lista degli ordini */}
                    <button onClick={() => this.props.OnGoToOrdini(this.props.admin)} className='btn btn-primary'>
                        Indietro
                    </button>
                    {/* Mapping dei prodotti dell'ordine e renderizzazione di ciascun CardVisualizzaOrdine */}
                    {this.ordine.prodotti.map(prodotti => (
                        <CardVisualizzaOrdine 
                            key={prodotti.Id_Prodotto}
                            prodotti={prodotti}
                        />
                    ))}
                    <hr />
                </div>
            </>
        );
    }
}

export default VisualizzaOrdine;
