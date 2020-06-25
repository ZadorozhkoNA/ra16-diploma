import React, {useContext} from 'react';
import {SearchContext} from '../context/Context';

export default function FormSearch(props) {
    const search = useContext(SearchContext);

    return (
        <form data-id="search-form" onSubmit={search} className={props.classString} >
            <input name='searchString' className="form-control" onChange={props.handleValue} placeholder="Поиск" value={props.intupValue} />
        </form>
    )
}
