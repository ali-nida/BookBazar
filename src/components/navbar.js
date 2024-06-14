/*il componente Navbar, rappresenta la barra di navigazione dell'applicazione. 
La barra di navigazione include pulsanti per accedere alla Home, all'Account, al Carrello e per eseguire il logout, 
oltre a un campo di ricerca per cercare prodotti. Alcuni pulsanti sono condizionalmente visualizzati 
in base al ruolo dell'utente e allo stato di accesso. */

// Importazione del componente React e della libreria jQuery
import { Component } from 'react';
import $ from 'jquery';

// Importazione dell'immagine del carrello
import carrello from '../images/carrello.png'

// Definizione del componente Navbar
class Navbar extends Component {

    render(){
        // Rendering del componente Navbar
        return(
            <> 
                {/* Barra di navigazione */}
                <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor : "#e3f2fd"}}>
                    <div className="container-fluid">
                        {/* Titolo del sito */}
                        <h3 className="navbar-brand">BookBazar</h3>
                        {/* Pulsante per espandere la barra di navigazione su dispositivi mobili */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Elementi della barra di navigazione */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* Pulsante per andare alla Home */}
                                <li className="nav-item m-2">
                                    <button onClick={() => this.props.OnGoToHome()}  className="btn btn-outline-primary" aria-current="page">Home</button>
                                </li>
                                {/* Pulsante per andare all'Account */}
                                <li className="nav-item m-2">
                                    <button onClick={() => this.props.OnGoToAccount()} className="btn btn-outline-primary" >Account</button>
                                </li>
                                {/* Pulsante per andare al Carrello */}
                                <li className="nav-item m-2">
                                    <button onClick={() => this.props.OnGoToCarrello()}  className="btn btn-outline-primary">
                                        Carrello
                                        <img src={carrello} className="card-img-top" alt="" style={{"width": "1.3rem"}}/> 
                                    </button>
                                </li>
                                {/* Pulsante per l'amministratore */}
                                <li className="nav-item m-2">
                                    <button onClick={() => this.props.OnGoToOrdini(1)} className="btn btn-outline-warning" style={{visibility : (this.props.ruolo === "admin"? "visible": "hidden")}} >
                                        AMMINISTRATORE
                                    </button>
                                </li>
                                {/* Pulsante per il logout */}
                                <li className="nav-item m-2">
                                    <button onClick={() => this.props.OnLogOut()} className="btn btn-outline-secondary" style={{visibility : (this.props.Id_Utente === -1? "hidden": "visible")}} >
                                        LOGOUT
                                    </button>
                                </li>
                            </ul>
                            {/* Barra di ricerca */}
                            <div className="d-flex" role="search">
                                <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button onClick={() => this.props.OnSearch($('#search').val())} className="btn btn-outline-success">Search</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

// Esportazione del componente Navbar per renderlo disponibile ad altri moduli
export default Navbar;
