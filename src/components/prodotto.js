/*mostra le informazioni del prodotto, tra cui nome, descrizione, data di pubblicazione e prezzo. 
Include anche un pulsante per aggiungere il prodotto al carrello, 
con il testo del pulsante che varia a seconda dello stato di disponibilità del prodotto.*/

// Importazione del componente React
import { Component } from 'react';

// Definizione del componente Prodotto
class Prodotto extends Component {

    render(){
        // Costruzione dell'URL dell'immagine del prodotto
        const image = "http://localhost:3000/assets/imgs/" + this.props.prodotto.src_image;
        return( 
            <>
                {/* Separatore */}
                <hr />
                {/* Card per il prodotto */}
                <div className="card mb-3 m-3" style={{"width": "50rem"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            {/* Link per navigare alla serie del prodotto */}
                            <button onClick={() => this.props.OnGoToSerie()} className="btn btn-link" style={{textAlign : "left"}}>
                                volume {this.props.prodotto.nvol} di 5
                            </button>
                            {/* Immagine del prodotto */}
                            <img src={image}  style={{"width": "10.5rem"}} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                {/* Titolo del prodotto */}
                                <h5 className="card-title">{this.props.prodotto.nome} vol {this.props.prodotto.nvol}</h5>
                                {/* Descrizione del prodotto */}
                                <p className="card-text">{this.props.prodotto.descrizione}</p>
                                {/* Data di pubblicazione del prodotto */}
                                <p className="card-text">{this.props.prodotto.datapubblicazione}</p>
                                {/* Prezzo del prodotto */}
                                <p className="card-text">{this.props.prodotto.prezzo}€</p>
                            </div>
                            {/* Bottone per aggiungere il prodotto al carrello */}
                            <button onClick={() => this.props.OnCarrello(this.props.prodotto)} className={this.props.prodotto.stato === "disponibile" ? "btn btn-primary m-2" : "btn m-2"}>
                                {/* Testo del bottone basato sullo stato del prodotto */}
                                {this.props.prodotto.stato === "disponibile" ? "Aggiungi al carrello" : "Prodotto non disponibile"}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

// Esportazione del componente Prodotto per renderlo disponibile ad altri moduli
export default Prodotto;
