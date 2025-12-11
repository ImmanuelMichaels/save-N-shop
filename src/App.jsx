import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import Footer from './components/Footer/Footer';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/items" element={<Items />} />
           <Route path="/SignUp" element={<SignUp />} />
           <Route path='/Login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
