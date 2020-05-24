import React from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import Item from './Item';
import {nanoid} from 'nanoid';

export default function TopSales(props) {
    const [data, loading, error] = useJsonFetch(props.url);

    const preloader = () => {
        return (
            <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {loading && preloader()}
                {data && data.map(item => <Item key={nanoid()} item={item} />)}
                {`Error...` && error}
            </div>
        </section>
    )
}
