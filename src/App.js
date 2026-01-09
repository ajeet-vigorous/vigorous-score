
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import SocketIframe1 from './pages/Socket-iframe/SocketIframe1';
import SocketIframe2 from './pages/Socket-iframe/SocketIframe2';
import SocketIframe3 from './pages/Socket-iframe/SocketIframe3';
import SocketIframe4 from './pages/Socket-iframe/SocketIframe4';
import SocketIframe5 from './pages/Socket-iframe/SocketIframe5';
import SocketIframe6 from './pages/Socket-iframe/SocketIframe6';
import SocketIframe7 from './pages/Socket-iframe/SocketIframe7';
import SocketIframe8 from './pages/Socket-iframe/SocketIframe8';
import SocketIframe9 from './pages/Socket-iframe/SocketIframe9';
import SocketIframe10 from './pages/Socket-iframe/SocketIframe10';
import SocketIframe11 from './pages/Socket-iframe/SocketIframe11';
import SocketIframe12 from './pages/Socket-iframe/SocketIframe12';
import SocketIframe13 from './pages/Socket-iframe/SocketIframe13';
import SocketIframe14 from './pages/Socket-iframe/SocketIframe14';
import SocketIframe15 from './pages/Socket-iframe/SocketIframe15';
import SocketIframe16 from './pages/Socket-iframe/SocketIframe16';
import SocketIframe17 from './pages/Socket-iframe/SocketIframe17';
import SocketIframe18 from './pages/Socket-iframe/SocketIframe18';
import SocketIframe19 from './pages/Socket-iframe/SocketIframe19';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/socket-iframe-1/:crex?/:eventId?' element={<SocketIframe1 />} />
        <Route path='/socket-iframe-2/:crex?/:eventId?' element={<SocketIframe2 />} />
        <Route path='/socket-iframe-3/:crex?/:eventId?' element={<SocketIframe3 />} />
        <Route path='/socket-iframe-4/:crex?/:eventId?' element={<SocketIframe4 />} />
        <Route path='/socket-iframe-5/:crex?/:eventId?' element={<SocketIframe5 />} />
        <Route path='/socket-iframe-6/:crex?/:eventId?' element={<SocketIframe6 />} />
        <Route path='/socket-iframe-7/:crex?/:eventId?' element={<SocketIframe7 />} />
        <Route path='/socket-iframe-8/:crex?/:eventId?' element={<SocketIframe8 />} />
        <Route path='/socket-iframe-9/:crex?/:eventId?' element={<SocketIframe9 />} />
        <Route path='/socket-iframe-10/:crex?/:eventId?' element={<SocketIframe10 />} />
        <Route path='/socket-iframe-11/:crex?/:eventId?' element={<SocketIframe11 />} />
        <Route path='/socket-iframe-12/:crex?/:eventId?' element={<SocketIframe12 />} />
        <Route path='/socket-iframe-13/:crex?/:eventId?' element={<SocketIframe13 />} />
        <Route path='/socket-iframe-14/:crex?/:eventId?' element={<SocketIframe14 />} />
        <Route path='/socket-iframe-15/:crex?/:eventId?' element={<SocketIframe15 />} />
        {/* <Route path='/socket-iframe-16/:crex?/:eventId?' element={<SocketIframe16 />} /> */}
        <Route path='/socket-iframe-17/:crex?/:eventId?' element={<SocketIframe17 />} />
        <Route path='/socket-iframe-18/:crex?/:eventId?' element={<SocketIframe18 />} />
        <Route path='/socket-iframe-19/:crex?/:eventId?' element={<SocketIframe19 />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
