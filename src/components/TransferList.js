import React from 'react';
import "../assets/wallet.css";

// Recibimos el props transfers
const TransferList = ({transfers}) => (
    <table className="table">
        <tbody>
            {/* creamos la lsita de transfer */}
            { 
                transfers.map( (transfer) => (
                    <tr key={transfer.id}>
                        <td>{transfer.description}</td>
                        <td className={transfer.amount > 0 ? 'text-success' : 'text-danger'}>
                            {transfer.amount}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
)

export default TransferList;