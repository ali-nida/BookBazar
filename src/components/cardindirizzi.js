import { Component } from 'react';

class CardIndirizzi extends Component {
 
    render(){

        return(

            <>
                <div className='col'>
                    <div className="card" style={{"width": "20rem"}}>
                       <div className='card-body'>
                            <p className="card-text"> {this.props.rec.via} {this.props.rec.ncivico}</p>
                            <p className="card-text"> {this.props.rec.città} </p>
                            <p className="card-text"> {this.props.rec.provincia} </p>
                            <p className="card-text"> {this.props.rec.cap} </p>
                            <p className="card-text"> {this.props.rec.telefono} </p>
                            <p className="card-text"> {this.props.rec.note} </p>
                            <button onClick={() => this.props.OnRemoveRecapito(this.props.rec)} className="btn btn-danger">Elimina recapito</button>
                       </div>    
                    </div>
                </div>
            
            </>
        );
    }
}

export default CardIndirizzi;