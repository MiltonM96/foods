import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import Detail from './components/Detail/Detail.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component = {LandingPage} />
        <Route path = '/home' component = {Home} />
        <Route path = '/createRecipe' component = {Form} />
        <Route path = '/detail/:detailId' component = {Detail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
