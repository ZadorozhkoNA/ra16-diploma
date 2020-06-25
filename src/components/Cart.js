import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CrateContext} from '../context/Context';
import {nanoid} from 'nanoid';
import {forPriceStrung} from './forPriceStrung';

export default function Cart() {
    const units = useContext(CrateContext).units;
    const handleDelUnit = useContext(CrateContext).handleDelUnit;
    const countPrice = (array = []) => {
        let count = 0;
        array.forEach(item =>{
            count = count + (Number(item.price) * Number(item.count))
        });
        return count;
    }

    return (
        <section name="cart">

        {countPrice(units) === 0 && <h2 className="text-center">Корзина пуста</h2>}
        {countPrice(units) !== 0 &&
            <>
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
            {units.map((item, index) => {
                return(
                    <tr key = {nanoid()}>
                    <th scope="row">{++index}</th>
                    <td><Link to={`/catalog/${item.id}.html`}>{item.title}</Link></td>
                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{forPriceStrung(item.price)}</td>
                    <td>{forPriceStrung(item.price * item.count)}</td>
                    <td>
                        <button 
                            onClick={()=>handleDelUnit(item.id)}
                            className="btn btn-outline-danger btn-sm">
                                Удалить
                        </button>
                    </td>
                </tr>
                )
            })}    

                <tr>
                    <td colSpan="5" className="text-right">Общая стоимость</td>
                    <td>{forPriceStrung(countPrice(units))}</td>
                </tr>
            </tbody>
        </table>
        </>
        }
        
    </section>
    )
}
