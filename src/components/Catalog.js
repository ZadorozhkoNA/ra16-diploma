import React, {useEffect, useContext} from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import Item from './Item';
import ItemNav from './ItemNav';
import {nanoid} from 'nanoid';
import {UrlContext, QueryContext} from '../context/Context';
import Preloader from './Preloader';

export default function Catalog(props) {

    const children = React.Children.toArray(props.children)

    const url = useContext(UrlContext);
    const query = useContext(QueryContext);

    // Формирование строки с запросами
    let urlQuery = `${url.urlCatalog}?q=${query.search}&categoryId=${query.categoryId}&offset=${query.next}`;

    const [dataCatalog, loadingCatalog, errorCatalog] = useJsonFetch(urlQuery); //Получение элементов в соответствии с запросом url
    const [dataCategory, loadingCategory, errorCategory] = useJsonFetch(url.urlCategory); //Получение категорий

    useEffect(()=>{
        query.getLength(dataCatalog)
    }, [dataCatalog]);

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {children[1]} {/* Форма поиска*/}
            
            {/* Список категорий */}
            <ul className="catalog-categories nav justify-content-center">
                {loadingCategory && Preloader()}
                {dataCategory && <ItemNav item={{id: '', title: 'Все'}} handleCategory={query.handleCategory} />}
                {dataCategory && dataCategory.map(item => <ItemNav key={nanoid()} item={item} handleCategory={query.handleCategory} />)}
                {`Error...` && errorCategory}
            </ul>

            {/* Список элементов */}
            <div className="row">
                {loadingCatalog && Preloader()}
                {dataCatalog && dataCatalog.map(item => <Item key={nanoid()} item={item} />)}
                {`Error...` && errorCatalog}
            </div>

            {children[0]} {/* Кнопка "загрузить еще"*/}
        </section>
    )
}
