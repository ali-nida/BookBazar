import { Component } from 'react';

class CardHome extends Component {
 
//dg  src={this.props.prodotto.src_image}
    render(){
        const image = "http://localhost:3000/assets/imgs/" + this.props.prodotto.src_image;//assets/imgs/my-hero-accademia-1.jpg"
        return (
            <>
              <div className='col mb-3'> 
                <div className="card" style={{"width": "15rem"}}>
                    <button onClick={() => this.props.OnGoToProdotto(this.props.prodotto)} className="btn">
                        <img src={image} className="card-img-top" alt="" style={{"width": "10rem"}}/>
                    </button>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.prodotto.nome} vol° {this.props.prodotto.nvol}</h5>
                        <p className="card-text">{this.props.prodotto.descrizione}</p>
                        <button onClick={() => this.props.OnCarrello(this.props.prodotto)} className={this.props.prodotto.stato === "disponibile" ? "btn btn-primary" : "btn"}>
                        {this.props.prodotto.stato === "disponibile" ? "Aggiugi al carrello" : "Prodotto non disponibile"}
                        </button>
                    </div>
                </div>
              </div>
            </>
        );
    }
    
}

export default CardHome;