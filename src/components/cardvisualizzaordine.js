import { Component } from 'react';

class CardVisualizzaOrdine extends Component{
 
    render(){
        const image = "http://localhost:3000/assets/imgs/" + this.props.prodotti.src_image;
        return(
            
            <>
                <hr />
                <div className="row">
                    <div className="col">
                        <img src={image}  style={{"width": "6rem"}} className="img-fluid rounded-start" alt="" />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <p className="card-title">{this.props.prodotti.nome} vol {this.props.prodotti.nvol}</p>
                            <p className="card-text"> {this.props.prodotti.prezzo}€ </p>
                        </div>
                    </div>
                    <div className="col">
                        <p className="card-title">Id_Utente: {this.props.prodotti.Id_Utente}</p>
                    </div>
                </div>
            
            </>
        );
    }

}


export default CardVisualizzaOrdine;