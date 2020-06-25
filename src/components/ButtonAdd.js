import React, {useContext} from 'react';
import {QueryContext} from '../context/Context';
import {VIEW_ITEM} from '../data/viewItemForCatalog';

export default function ButtonAdd() {
    const query = useContext(QueryContext);
    if (query.leng < VIEW_ITEM ) return null

    return (
        <div className="text-center">
            <button onClick={query.handleCatalogItem} className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
    )
}
