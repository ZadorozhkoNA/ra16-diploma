import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './css/style.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/About';
import Contacts from './components/Contacts';
import Cart from './components/Cart';
import Order from './components/Order';
import Page404 from './components/Page404';
import TopSales from './components/TopSales';
import Catalog from './components/Catalog';
import FormSearch from './components/FormSearch';
import ProductInfo from './components/ProductInfo';
import ButtonAdd from './components/ButtonAdd';
import {UrlContext, QueryContext, SearchContext, ItemContext, CrateContext} from './context/Context';
import {staticUrl} from './data/staticUrl'; //Объект со статическими url для обращения к серверу
import {VIEW_ITEM} from './data/viewItemForCatalog';


function App() {

  const [next, setNext] = useState(''); //Состояние для кнопки "загрузить еще"
  const [categoryId, setCategoryId] = useState(''); //Состояние выбора категории
  const [leng, setLength] = useState(''); //Состояние для кнопки "загрузить еще"
  const [intupValue, setInputValue] = useState(''); //Состояние строки формы поиска (для отображения)
  const [search, setSearch] = useState(''); //Состояние строки формы поиска (для передачи)
  const [itemId, setItemId] = useState(''); //Состояние передачи id товара
  const [units, setUnits] = useState([]); //Набор в корзине

  if (!sessionStorage.items) sessionStorage.setItem('items', '');

  useEffect(()=>{
    if (sessionStorage.items) setUnits(JSON.parse(sessionStorage.items));
  }, []);

  useEffect(() => {
    sessionStorage.items = '';
    sessionStorage.items = JSON.stringify(units);
  }, [units]);

  //Сборка юнитов для корзины 
  const handleUnits = (obj = {}) => {
    let flag = false;
    let array = units.map(item => {
      if (item.id === obj.id && item.size === obj.size) {
        item.count = Number(item.count) + Number(obj.count);
        flag = true;
      }
      return item;
    });
    if (flag) {
      setUnits(array)
    } else {
      setUnits(prevState => [...prevState, obj]);
    }
  }

  //Удаление всех юнитов из корзины
  const DelAllUnits = () => {
    setUnits([]);
    sessionStorage.items = '';
  }

  //Удалить юнит из корзины
  const handleDelUnit = (id) => {
    if (!id) return;
    let array = units.filter(item => {
      if (Number(item.id) !== Number(id)) return item
    });
    setUnits(array);
  }

  //Передача данных для кнопки "загрузить еще"
  const getLength = (array = []) => {
    setLength(array.length)
  }

  // Передача id для загрузки дополнительных товаров
  const handleCatalogItem = (event) => {
    event.preventDefault();
    setNext(ptevState => Number(ptevState) + VIEW_ITEM);
  }

  // Передача id для выбора категории
  const handleCategory = (id) => {
    setCategoryId(id);
    setNext(''); //Обнулить состояние кнопки "загрузить еще"
  }

  //Состояние строки поиска
  const handleValue = (event) => {
    event.preventDefault();
    setInputValue(event.currentTarget.value.trim());
  }

  //Передача данных из строки поиска
  const handleSearch = (event) => {
    event.preventDefault();
    const string = event.currentTarget.searchString.value.trim().toLowerCase();
    setSearch(string);
    setNext(''); //Обнулить состояние кнопки "загрузить еще"
  }
  
  //Установка id товара для карточки товара
  const handleItemId = (id) => {
    setItemId(id);
  }

  return (
    // Передача стационарных url
    <UrlContext.Provider value = {{...staticUrl}} >

    {/* //Передача  данных для поиска и сортировки*/}
    <QueryContext.Provider value = {{next, categoryId, leng, search, handleCategory, handleCatalogItem, getLength}} >
    
    {/* Передача функции для формы поиска */}
    <SearchContext.Provider value = {handleSearch} >

    {/* Передача id определенного товара */}
    <ItemContext.Provider value = {{itemId, handleItemId}} >

    {/* Передача данных для корзины */}
    <CrateContext.Provider value = {{units, handleUnits, handleDelUnit, DelAllUnits}}>

      <Router>
        {intupValue.length > 0 ? <Redirect to='/catalog.html' /> : null}
        
        {/*Шапка сайта*/}
        <Header>
          <Nav />
          <FormSearch 
            classString={'header-controls-search-form form-inline invisible'} 
            handleValue={handleValue}
            intupValue={intupValue}
          />
        </Header>
        
        {/*Основной контент сайта*/}
        <Main>
            <Switch>
              <Route path='/about.html' exact component={About} />
              <Route path='/contacts.html' exact component={Contacts} />
              <Route path='/cart.html' exact render = {() => (
                <>
                  <Cart /> 
                  <Order />
                </>
              )} />
              
              <Route path='/catalog/:id.html' component = {ProductInfo} />
              <Route path='/catalog.html' exact render = {() => (
                  <Catalog >
                    <ButtonAdd />
                    <FormSearch 
                      classString={'catalog-search-form form-inline'} 
                      handleValue={handleValue}
                      intupValue={intupValue}
                    />
                  </Catalog>
              )}/>

              <Route path='/' exact render = {() => (
                <>
                  <TopSales />
                  <Catalog>
                    <ButtonAdd />
                  </Catalog>
                </>
              )} exact />
              <Route component={Page404} />
            </Switch>    
        </Main>

        {/*Подвал сайта*/}
        <Footer />
      </Router>

    </CrateContext.Provider>
    </ItemContext.Provider>
    </SearchContext.Provider> 
    </QueryContext.Provider>
    </UrlContext.Provider>
  );
}

export default App;
