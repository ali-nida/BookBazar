import { Component } from 'react';

class CardCheckout extends Component {

    render(){

 
        return(

            <>
                <div className='col'>
                    <div className="card" style={{"width": "15rem"}}>
                       <div className='card-body'>
                            <p className="card-text"> {this.props.rec.via} {this.props.rec.ncivico}, {this.props.rec.città}</p>
                            <button onClick={() => this.props.OnRecapitoEffettivo(this.props.rec)} className="btn btn-secondary">Seleziona come indirizzo di spedizione</button>
                       </div>    
                    </div>
                </div>
            
            </>
        );
    }

}

export default CardCheckout;
