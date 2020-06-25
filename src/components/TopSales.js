import React, {useContext} from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import Item from './Item';
import {nanoid} from 'nanoid';
import {UrlContext} from '../context/Context';
import Preloader from './Preloader';

export default function TopSales() {
    
    const url = useContext(UrlContext);
    const [data, loading, error] = useJsonFetch(url.urlTopSales);

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {loading && Preloader()}
                {data && data.map(item => <Item key={nanoid()} item={item} />)}
                {`Error...` && error}
            </div>
        </section>
    )
}
