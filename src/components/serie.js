/* Il file serie.js gestisce la visualizzazione dei prodotti all'interno di una serie. 
Utilizza una richiesta HTTP per ottenere più volumi della serie, aggiungendo nuovi prodotti all'array serie.prodotto. 
Il caricamento aggiuntivo viene eseguito solo una volta grazie alla variabile di controllo control. 
Il componente Serie renderizza ogni Prodotto nella serie e mostra un pulsante per caricare ulteriori volumi solo se ci sono ancora volumi da caricare.  */

import { Component } from 'react';
import Prodotto from './prodotto';

class Serie extends Component {

    // Inizializzazione dell'oggetto serie con campo prodotto
    serie = {
        prodotto: [
            // Definizione dei prodotti all'interno della serie
            //{Id_Prodotto: 1, Id_Serie: 100, nome: "signore degli anelli", nvol: 1, stato: "disponibile", quantita: 20, datapubblicazione: "2019-04-10", descrizione: "Descrizione1", src_image: },
        ]
    }

    // Inizializzazione dell'oggetto buttonLoad per il pulsante di caricamento aggiuntivo
    buttonLoad = { state: "visible" }

    // Funzione per gestire l'aggiunta di più volumi alla serie
    handleAddMoreVolumes = btn => {
        // Parametri per la richiesta di aggiunta di più volumi
        var addvol = { "Id_Serie": this.props.serie.Id_Serie, num: this.serie.prodotto.length };
        // Richiesta di aggiunta di più volumi
        fetch('http://127.0.0.1:5556/addMoreVolumes', {
            method: 'POST',
            body: JSON.stringify(addvol),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((data) => {
            // Aggiunta dei nuovi volumi alla serie
            for(var i = 0; i < data.length; i++){
                this.serie.prodotto.push(data[i]);
            }
            const serie = this.serie;
            this.setState({ serie });
            // Nascondi il pulsante di caricamento se il numero totale di volumi è stato raggiunto
            if(this.props.serie.volumitotali === this.serie.prodotto.length){
                this.buttonLoad.state = "hidden";
                const buttonLoad = this.buttonLoad;
                this.setState({ buttonLoad });
                return;
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // Variabile di controllo per evitare il caricamento ripetuto al montaggio del componente
    control = 0;

    componentDidMount() {
        // Esegui il caricamento aggiuntivo solo se non è già stato fatto
        if(this.control === 0){
            this.handleAddMoreVolumes();
            this.control = 1;
            const control = this.control;
            this.setState({ control });
        }
    }

    render(){
        return(
            <>
                {/* Mapping dei prodotti della serie e renderizzazione di ciascun Prodotto */}
                {this.serie.prodotto.map(prodotto => (
                    <Prodotto 
                        serie={this.props.serie}
                        key={prodotto.Id_Prodotto}
                        prodotto={prodotto}
                        OnCarrello={this.props.OnCarrello}
                        OnGoToSerie={this.props.OnGoToSerie}
                    />
                ))} 
                {/* Pulsante per caricare ulteriori volumi, visibile solo se ci sono ancora volumi da caricare */}
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button onClick={() => this.handleAddMoreVolumes()} className="btn btn-secondary m-2"  style={{ visibility: this.buttonLoad.state }}>
                        Carica altro 
                    </button>
                </div>
            </>
        );
    } 
}

export default Serie;
