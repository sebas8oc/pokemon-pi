import { Route, useLocation } from 'react-router-dom';
import './App.css';
import {Home, Landing, Detail, Form} from"./Views"
import NavBar from './components/NavBar/NavBar';

function App() {

const location = useLocation();
console.log(location);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path={"/"} component={Landing}/> 
      <Route path={"/home"} component={Home}/>
      <Route path={"/detail"} component={Detail}/>
      <Route path={"/create"} component={Form}/> 
    </div>
  );
}

export default App;
