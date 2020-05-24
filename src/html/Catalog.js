import React, {useState} from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import Item from './Item';
import ItemNav from './ItemNav';
import ButtonAdd from './ButtonAdd';
import {nanoid} from 'nanoid';

export default function Catalog(props) {
    const [categoriesId, setCategoriesId] = useState(''); //Состояние выбора категории
    const [next, setNext] = useState(''); //Состояние для кнопки "загрузить еще"
    
    // Передача id для выбора категории
    const handleCategories = (id) => {
        setCategoriesId(id);
        setNext('');
    }

    // Передача id для выбора категории
    const handleCatalogItem = (event) => {
        event.preventDefault();
        setNext(ptevState => Number(ptevState) + 6)
    }

    // Формирование строки с запросами
    let url = `${props.urlCatalog}?categoryId=${categoriesId}&offset=${next}`;

    const [dataCatalog, loadingCatalog, errorCatalog] = useJsonFetch(url); //Получение элементов в соответствии с запросом url
    const [dataCategories, loadingCategories, errorCategories] = useJsonFetch(props.urlCategories); //Получение категорий

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

    // console.log(props.children)

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {props.children}
            {/* Список категорий */}
            <ul className="catalog-categories nav justify-content-center">
                {loadingCategories && preloader()}
                {dataCategories && <ItemNav item={{id: '', title: 'Все'}} handleCategories={handleCategories} />}
                {dataCategories && dataCategories.map(item => <ItemNav key={nanoid()} item={item} handleCategories={handleCategories} />)}
                {`Error...` && errorCategories}
            </ul>

            {/* Список элементов */}
            <div className="row">
                {loadingCatalog && preloader()}
                {dataCatalog && dataCatalog.map(item => <Item key={nanoid()} item={item} />)}
                {`Error...` && errorCatalog}
            </div>

            {/* Кнопка "загрузить еще" */}
            <ButtonAdd handleCatalogItem = {handleCatalogItem} length = {dataCatalog.length} />
        </section>
    )
}
