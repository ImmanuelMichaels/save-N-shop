import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import Items from './components/Items/Items';
import Footer from './components/Footer/Footer';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import PlatformNavbar from './components/Pages/PlatformNavbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            <SignUp />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
            <Footer />
          </>
        } />
        {/* Platform route WITHOUT regular navbar */}
        <Route path="/platform/*" element={<PlatformNavbar />} />
      </Routes>
    </Router>
  );
};

export default App;
