import React, {useContext} from 'react';
import headerLogo from '../img/header-logo.png';
import {Link} from 'react-router-dom';
import {CrateContext} from '../context/Context';

export default function Header(props) {
    const units = useContext(CrateContext).units;
    const children = React.Children.toArray(props.children)
    return (
        <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src={headerLogo} alt="Bosa Noga" />
                    </a>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        
                        {children[0]}
                        {children[1]}

                        <div>
                            <Link to={'/cart.html'}>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    {/* Do programmatic navigation on click to /cart.html */}
                                    <div className="header-controls-pic header-controls-cart">
                                        {units.length > 0 && <div className="header-controls-cart-full">{units.length}</div>}
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    </header>
    )
}
