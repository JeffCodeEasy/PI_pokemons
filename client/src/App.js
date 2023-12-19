import './App.css';
import NavBar from './components/NavBar/NavBar';
import {Home, Landing, Form, Detail} from './views';
import {Route, useLocation} from 'react-router-dom';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/>}

      <Route exact path="/" component={Landing} />

      <Route exact path="/home">
        <Home/>
      </Route>

      <Route exact path="/detail/:id" render={()=> <Detail />} />
      
      <Route exact path="/form" component={Form} />
    </div>
  );
}

export default App;
