import React from 'react'

export default function ButtonAdd(props) {

    if (props.length < 6 ) return null

    return (
        <div className="text-center">
            <button onClick={props.handleCatalogItem} className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
    )
}
