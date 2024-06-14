import { Component } from 'react';

class CardCarrello extends Component {


    render(){
        const image = "http://localhost:3000/assets/imgs/" + this.props.qcar.src_image;

        return(
 
            <> 
                <hr />
                <div className="row">
                    <div className="col">
                        <img src={image}  style={{"width": "8rem"}} className="img-fluid rounded-start" alt="" />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <p className="card-title">{this.props.qcar.nome} vol {this.props.qcar.nvol}</p>
                            <p className="card-text"> {this.props.qcar.prezzo}€ </p>
                        </div>
                    </div>
                    <div className="col">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button onClick={() => this.props.OnAddQuantità(this.props.qcar,"up")} className="page-link">⬆</button>
                                </li>
                                <li className="page-item"><button className="page-link" disabled>{this.props.qcar.quantità}</button></li>
                                <li className="page-item">
                                    <button onClick={() => this.props.OnAddQuantità(this.props.qcar,"down")} className="page-link">⬇</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col">
                        <p className="card-title">{Math.round((this.props.qcar.quantità * this.props.qcar.prezzo) * 100) / 100}€</p>
                    </div>
                    <div className="col">
                        <button onClick={() => this.props.onRemove(this.props.qcar)} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    
                </div>
            </>
        );
    }
}


export default CardCarrello;