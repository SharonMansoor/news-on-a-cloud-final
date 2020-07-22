import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NewsPreview from './components/NewsPreview';
import AddArticle from './components/AddArticle';
import { Route, Switch } from 'react-router-dom';
import Article from './components/Article';

function App() {
  return (
    <div className="App">
      <Header/>      
      <Switch>
        <Route exact path='/' component={NewsPreview}/>
        <Route path='/admin' component={AddArticle}/>
        <Route path={"/:id"} component={Article} />
      </Switch>
    </div>

    
  );
}

export default App;
