import React from 'react';

export default function Item(props) {
    const item = props.item;

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
            <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
            <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{String(item.price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} руб.</p>
                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
            </div>
            </div>
        </div>
    )
}
