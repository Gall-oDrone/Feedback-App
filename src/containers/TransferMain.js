import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransferForm from '../components/TransferForm';
import TransferList from '../components/TransferList';
import { walletBalanceURL, TransactionListURL} from "../constants"
import "../assets/wallet.css";
// importamos la url

let url = ""
let transfer = {
    id: 1,
    description: "Corso",
    amount: 34,
    id: 2,
    description: "Corso",
    amount: 21,
    id: 3,
    description: "Corso",
    amount: 88,

}
class Example extends Component{

    // Creamos el constructor
    constructor(props){
        super(props)
        // definimos el state
        this.state = {
            money:0.0,
            transfers: [{id: 1,
                description: "Corso",
                amount: 34},
                {id: 2,
                description: "Corso",
                amount: 21},
                {id: 3,
                description: "Corso",
                amount: 88}],
            error: null,
            /**
             * Creamos el estado de los datos del componente
             * del formulario por el momento hardcodeamos el
             * wallet_id
             */
            form: {
                description:'',
                amount: '',
                wallet_id: 1
            }
        }
        // https://es.reactjs.org/docs/faq-functions.html#bind-in-render
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // realizamos la peticion
    async componentDidMount(){
        try {
            // hacemos la peticion por get
            let res = await fetch(`${url}/api/wallet`)
            // almacenamos la respeusta en data
            let data = await res.json()
            // actualizamos el state
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
            console.log(this.state);
        } catch (error) {
            
        }
    }

    // Actualizamos el state del form
    handleChange(e){
        console.log(e.target.value)
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    async handleSubmit(e){
        e.preventDefault()
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            // hacemos la peticion por get
            let res = await fetch(`${url}/api/transfer`, config)
            // almacenamos la respeusta en data
            let data = await res.json()

            this.setState({
                transfers: this.state.transfers.concat(data),
                money: this.state.money + (parseInt(data.amount))
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12-m-t-md">
                        {/* mostramos el valos del state en money */}
                        <p className="title"> $ {this.state.money} </p>
                    </div>
                    <div className="col-md-12">
                        {/* Le pasamos los props al componente */}
                        <TransferForm 
                            form={this.state.form} 
                            onChange={this.handleChange} // le pasamos la funcion
                            onSubmit={this.handleSubmit} // le pasamos la funcion
                        />
                    </div>
                </div>
                <div className="m-t-md">
                    {/* le pasamos props al componente */}
                    <TransferList transfers={this.state.transfers}/>
                </div>
            </div>
        );
    }
}

export default Example;
/**
 * Si en la vista existe un elemento con id example
 * rendeara el componente.
 */
// if (document.getElementById('example')) {
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }