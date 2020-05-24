import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import './App.css';
import './css/style.css';
import Header from './html/Header';
import Nav from './html/Nav';
import Main from './html/Main';
import Footer from './html/Footer';
import About from './html/About';
import Contacts from './html/Contacts';
import Page404 from './html/Page404';
import TopSales from './html/TopSales';
import Catalog from './html/Catalog';
import FormSearch from './html/FormSearch';


function App() {

  const urlTopSales = 'http://localhost:7070/api/top-sales';
  const urlCatalog = 'http://localhost:7070/api/items';
  const urlCategories = 'http://localhost:7070/api/categories';

  return (
    <>
    <Router>
      <Header>
        <Nav />
      </Header>
      <Main>
          <Switch>
            <Route path='/about.html' component={About} />
            <Route path='/contacts.html' component={Contacts} />
            <Route path='/catalog.html' render = {() => (
                <Catalog urlCatalog={urlCatalog} urlCategories={urlCategories} >
                  <FormSearch />
                </Catalog>
            )}/>

            <Route path='/' render = {() => (
              <>
                <TopSales url={urlTopSales} />
                <Catalog urlCatalog={urlCatalog} urlCategories={urlCategories} />
              </>
            )} exact />
            <Route component={Page404} />
          </Switch>    
      </Main>
      <Footer />
    </Router>
    </>
  );
}

export default App;
