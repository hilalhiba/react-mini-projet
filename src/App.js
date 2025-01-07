import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Gallery from './components/gallery/Gallery';
import NavBar from './layout/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GalleryItemDetail from './components/gallery/GalleryItemDetail';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container mt-2">
          <Switch>
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/galleryDetails/:id" component={GalleryItemDetail} />
            <Route component={Gallery} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;