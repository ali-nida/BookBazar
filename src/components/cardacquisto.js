// Importazione della dipendenza Component da React
import { Component } from 'react';

// Definizione del componente CardAcquisto come classe estesa da Component
class CardAcquisto extends Component {

    // Funzione di renderizzazione del componente
    render() {
        return (
            <>
                {/* Contenitore della singola carta di acquisto */}
                <div className='row m-3'>
                    <div className='col'>
                        {/* Visualizzazione dei dettagli dell'ordine */}
                        <p className="card-title">
                            Codice Ordine: {this.props.ordini.Id_Acquisto}
                            <br/>volumi totali acquistati: {this.props.ordini.qtot}
                            <br/>Data ordine: {this.props.ordini.dataacquisto}
                            <br/>Prezzo ordine: {this.props.ordini.ptot}€
                        </p>
                    </div>
                    <div className='col'>   
                        {/* Bottone per visualizzare l'ordine */}
                        <button onClick={() => this.props.OnGoToVisualizzaOrdine(this.props.ordini)} className="btn btn-light m-2">
                            Visualizza Ordine
                        </button>
                    </div>
                    <hr /> {/* Linea divisoria */}
                </div>
            </>
        );
    }

}

// Esportazione del componente CardAcquisto per renderlo disponibile ad altri moduli
export default CardAcquisto;
