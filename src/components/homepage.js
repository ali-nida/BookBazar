/*Questa pagina mostra una serie di prodotti selezionati e i prodotti più venduti. 
I dati dei prodotti sono recuperati dal server tramite richieste HTTP*/

// Importazione del componente React, dell'immagine della copertina del libro, del componente CardHome e dell'immagine del banner
import { Component } from 'react';
import bookcover from '../images/signore degli anelli.jpg';
import CardHome from './cardhome';
import banner from '../images/banner.jpg';

// Definizione del componente HomePage
class HomePage extends Component {

  // Inizializzazione dei dati relativi alle nostre gemme e ai prodotti più venduti
  le_nostre_gemme = {
    prodotto: [
      {Id_Prodotto: 1, Id_serie: 1, nome: "Il Signore degli Anelli", nvol:"3", stato: "disponibile", quantita: 50, datapubblicazione: "1954-07-29", descrizione: "Il classico epico fantasy di J.R.R. Tolkien che narra delle avventure di Frodo Baggins nell'Anello del Potere.", src_image: bookcover, prezzo: 25.99},
      {Id_Prodotto: 2, Id_serie: 2, nome: "Harry Potter e la Pietra Filosofale", nvol: "2", stato: "disponibile", quantita: 100, datapubblicazione: "1997-06-26", descrizione: "Il primo libro della serie di Harry Potter, che racconta le sue avventure nel Mondo Magico.", src_image: bookcover, prezzo: 19.99},
      {Id_Prodotto: 3, Id_serie: 3, nome: "Cronache del ghiaccio e del fuoco: Il Trono di Spade", nvol: "3", stato: "disponibile", quantita: 47, datapubblicazione: "1996-08-06", descrizione: "Il primo libro della saga epica di George R.R. Martin, piena di intrighi politici, guerre e draghi.", src_image: bookcover, prezzo: 22.50},
      {Id_Prodotto: 4, Id_serie: 4, nome: "1984", nvol: "1", stato: "disponibile", quantita: 50, datapubblicazione: "1949-06-08", descrizione: "Il romanzo distopico di George Orwell che dipinge un futuro cupo e totalitario.", src_image: bookcover, prezzo: 15.99},
      {Id_Prodotto: 5, Id_serie: 5, nome: "Orgoglio e Pregiudizio", nvol: "1", stato: "disponibile", quantita: 47, datapubblicazione: "1813-01-28", descrizione: "Il classico di Jane Austen che narra le vicende della famiglia Bennet nel contesto della società inglese del XIX secolo.", src_image: bookcover, prezzo: 12.99},
    ]
  }
  most_seller = {
    prodotto: [
      {Id_Prodotto: 6, Id_serie: 6, nome: "Il Piccolo Principe", nvol: 2, stato: "disponibile", quantita: 50, datapubblicazione: "1943-04-06", descrizione: "Il celebre racconto di Antoine de Saint-Exupéry che racconta l'incontro tra un pilota e un piccolo principe proveniente da un altro pianeta.", src_image: bookcover, prezzo: 10.50},
      {Id_Prodotto: 7, Id_serie: 7, nome: "Le Cronache di Narnia: Il Leone, la Strega e l'Armadio", nvol: 1, stato: "disponibile", quantita: 50, datapubblicazione: "1950-10-16", descrizione: "Il primo libro della serie fantasy di C.S. Lewis che narra le avventure dei fratelli Pevensie nel magico mondo di Narnia.", src_image: bookcover, prezzo: 18.99},
      {Id_Prodotto: 8, Id_serie: 8, nome: "Moby Dick", nvol: 2, stato: "disponibile", quantita: 55, datapubblicazione: "1851-10-18", descrizione: "Il romanzo di Herman Melville che narra la caccia al leggendario capodoglio bianco da parte del capitano Ahab.", src_image: bookcover, prezzo: 16.99},
      {Id_Prodotto: 9, Id_serie: 9, nome: "Il Grande Gatsby", nvol: 3, stato: "disponibile", quantita: 65, datapubblicazione: "1925-04-10", descrizione: "Il romanzo di F. Scott Fitzgerald che racconta la storia del misterioso milionario Jay Gatsby durante gli anni del proibizionismo.", src_image: bookcover, prezzo: 14.50},
      {Id_Prodotto: 10, Id_serie: 10, nome: "Anna Karenina", nvol: 1, stato: "disponibile", quantita: 60, datapubblicazione: "1877-12-02", descrizione: "Il romanzo di Lev Tolstoj che narra la storia tragica di Anna Karenina, una donna dell'alta società russa.", src_image: bookcover, prezzo: 13.99},
    ]
  }

  // Metodo chiamato quando il componente è stato montato
  componentDidMount() {
    var get5le_nostre_gemme = {opzione: 'ultimeuscite'};
    var get5most_seller = {opzione: 'mostseller'};

    // Recupera i dati dei prodotti "Le nostre gemme" dal server
    fetch('http://127.0.0.1:5556/prodotti/:get5prodotti', {
      method: 'POST',
      body: JSON.stringify(get5le_nostre_gemme),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then(res => res.json())
      .then((data) => {
        this.le_nostre_gemme.prodotto = data;
        const le_nostre_gemme = this.le_nostre_gemme;
        this.setState({le_nostre_gemme});
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Recupera i dati dei prodotti "I più venduti" dal server
    fetch('http://127.0.0.1:5556/prodotti/:get5prodotti', {
      method: 'POST',
      body: JSON.stringify(get5most_seller),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then(res => res.json())
      .then((data) => {
        this.most_seller.prodotto = data;
        const most_seller = this.most_seller;
        this.setState({most_seller});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  
  // Metodo di rendering del componente
  render(){
    return (
      <>
        {/* Contenuto della homepage */}
        <div className='container'>
          {/* Titolo e benvenuto */}
          <h2>Home Page   {this.props.utente.Id_Utente === -1 ? "" : ",    Bentornato " + this.props.utente.nome}</h2>
          {/* Banner */}
          <img src={banner} className="card-img-top" alt="" style={{"width": "81rem"}}/>
          <hr />
          {/* Sezione "Le nostre gemme" */}
          <h2>Le nostre gemme</h2>
          <div className='row'>
            {/* Mappa dei prodotti "Le nostre gemme" */}
            {this.le_nostre_gemme.prodotto.map(prodotto => (
              <CardHome 
                key={prodotto.Id_Prodotto}
                prodotto={prodotto}
                OnCarrello={this.props.OnCarrello}
                OnGoToProdotto={this.props.OnGoToProdotto}/>
            ))}
          </div>
          <hr />
          {/* Sezione "I più venduti" */}
          <h2>I più venduti</h2>
          <div className='row'>
            {/* Mappa dei prodotti "I più venduti" */}
            {this.most_seller.prodotto.map(prodotto => (
              <CardHome 
                key={prodotto.Id_Prodotto}
                prodotto={prodotto}
                OnCarrello={this.props.OnCarrello}
                OnGoToProdotto={this.props.OnGoToProdotto}/>
            ))}
          </div>
        </div>
      </>
    );
  }
}

// Esportazione del componente HomePage per renderlo disponibile ad altri moduli
export default HomePage;
