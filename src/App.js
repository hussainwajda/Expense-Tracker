import './App.css';
import Index from './auth';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Expenses } from './expenses';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Index />}></Route>
          <Route path='/expense-tracker' element={<Expenses />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
