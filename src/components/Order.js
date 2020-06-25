import React, {useState, useEffect, useContext} from 'react';
import {CrateContext, UrlContext} from '../context/Context';

export default function Order() {
    const units = useContext(CrateContext).units;
    const url = useContext(UrlContext).urlOrder
    const del = useContext(CrateContext).DelAllUnits
    const [disabled, setDisabled] = useState('disabled'); //Скрытие элементов (если нет доступных размеров)
    const [dataPOST, setDataPOST] = useState(false);

    const [form, setForm] = useState({
        phone: '',
        address: '',
        agreement: false
    });

    useEffect(() => {
        (form.phone && form.address && form.agreement) ? setDisabled('') : setDisabled('disabled');
    }, [form])

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    const handleUserData = (event) => {
        event.preventDefault(); 
        let order = {}
        order.owner = {phone: form.phone, address: form.address};
        order.items = units;

        fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(order)
            })
            .then(res => {
                if (200 <= res.status && res.status < 300 ) {
                    del();
                    setForm({phone: '', address: '', agreement: false});
                    setDataPOST(true)
                }
            });
    }

      return (
        <section className="order">
            {!dataPOST && <h2 className="text-center">Оформить заказ</h2>}
            {dataPOST && <h2 className="text-center" style={{color: 'green'}}>Заказ оформлен</h2>}
            <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
                <form className="card-body" onSubmit={handleUserData}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control" id="phone" name="phone"  placeholder="Ваш телефон" 
                            onChange={handleChange}
                            value={form.phone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address" name="address" placeholder="Адрес доставки" 
                            onChange={handleChange}
                            value={form.address}
                        />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" name="agreement" 
                            onChange={handleChange}
                            checked={form.agreement}
                        />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                    <button disabled={disabled}  type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>

                </div>
        </section>
    )
}
