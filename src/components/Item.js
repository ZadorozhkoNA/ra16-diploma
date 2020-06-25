import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ItemContext} from '../context/Context';
import {forPriceStrung} from './forPriceStrung';

export default function Item(props) {
    const item = props.item;
    const itemId = useContext(ItemContext);

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{forPriceStrung(item.price)}</p>
                    
                    {/* Кнопка заказать */}
                    <Link to={`./catalog/${item.id}.html`} 
                        onClick={() => {itemId.handleItemId(item.id)}}
                        className="btn btn-outline-primary">
                            Заказать
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}
