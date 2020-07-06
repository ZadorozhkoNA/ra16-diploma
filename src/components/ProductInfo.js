import React, {useContext, useState, useEffect} from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import {UrlContext, CrateContext} from '../context/Context';
import Preloader from './Preloader';
import CountOrder from './CountOrder';
import {nanoid} from 'nanoid';
import {Link} from 'react-router-dom';
import {COUNT_MIN, COUNT_MAX} from '../data/countProduct';


export default function ProductInfo({match}) {
    const url = useContext(UrlContext);
    const addUnit = useContext(CrateContext);

    const [data, loading, error] = useJsonFetch(`${url.urlCatalog}/${match.params.id}`);
    const [sizesArray, setSizesArray] = useState([]); //Массив размеров
    const [disabled, setDisabled] = useState(''); //Скрытие элементов (если нет доступных размеров)
    const [size, setSize] = useState('');//Выбранный размер
    const [count, setCount] = useState(1); //Выбор кол-ва товара
    const [unit, setUnit] = useState({
        id: null,
        title: null,
        price: null,
        count: null,
        size: null,
    });

    //Кнопка увеличения кол-ва товара
    const handleCountPlus = (event) => {  
        event.preventDefault();     
        if (count < COUNT_MAX) setCount(prevState => prevState + 1 );
        if (count >= COUNT_MAX) setCount(COUNT_MAX);
    }

    //Кнопка уменьшения кол-ва товара
    const handleCountMinus = (event) => {  
        event.preventDefault();     
        if (count > COUNT_MIN) setCount(prevState => prevState - 1 );
        if (count <= COUNT_MIN) setCount(COUNT_MIN);
    }

    //загрузка изображения товара если изображения нет, то будет заглушка 1x1 пиксель
    const productImg = (info) => {
        let srcImg = 'http://placehold.it/1x1';
        if (Array.isArray(info.images)) srcImg=info.images[0];
        return srcImg;
    }

    //Загрузка доступных размеров товара
    const productSizes = (info) => {
        let sizesArray = [];
        if (Array.isArray(info.sizes)) {
            sizesArray = info.sizes.filter(item => item.avalible);
        }

        // Тестовые данные для отсутствия размеров или создания доп размеров
        // sizesArray = sizesArray.concat([{size: "20 US", avalible: true}, {size: "18 US", avalible: true}]);
        // sizesArray = [];

        size === '' ? setDisabled('disabled') : setDisabled('');
        setSizesArray(sizesArray);
    }

    //Изменяем состояние выбранного товара
    useEffect(()=>{
        productSizes(data);
        setUnit({
            id: data.id,
            title: data.title,
            price: data.price,
            count: count,
            size: size,
        });
    }, [data, size, count]);

    return (       
        <section className="catalog-item">
            {loading && Preloader()}
            {`Error...` && error}
            {data && (
                <>
                    <h2 className="text-center">{data.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={productImg(data)} className="img-fluid" alt={data.title} />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                            <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{data.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{data.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{data.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{data.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{data.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{data.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: 
                                    {sizesArray.map(item => 
                                        <span 
                                            key={nanoid()} 
                                            onClick={() => setSize(item.size)}
                                            className={"catalog-item-size " + (size === item.size ? "selected" : "")}
                                        >
                                            {item.size}
                                        </span>
                                    )}
                                </p>
                                    {<CountOrder plus={handleCountPlus} minus={handleCountMinus} count={count} />} {/* Кнопки изменения кол-ва товара */}
                            </div>
                            <Link to='/cart.html'>
                                <button 
                                    disabled={disabled} 
                                    onClick={()=>addUnit.handleUnits(unit)}
                                    className='btn btn-danger btn-block btn-lg'>
                                        В корзину
                                </button>
                            </Link>
                        </div>
                    </div> 
                </>
            )}
        </section>
    )
}
