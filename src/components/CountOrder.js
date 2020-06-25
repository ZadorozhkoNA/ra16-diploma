import React from 'react';

export default function CountOrder(props) {
    return (
        <p>Количество: <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={props.minus}>-</button>
            <span className="btn btn-outline-primary">{props.count}</span>
            <button className="btn btn-secondary" onClick={props.plus}>+</button>
            </span>
        </p>
    )
}
