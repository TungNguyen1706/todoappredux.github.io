import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
           <nav className="navbar  navbar-dark bg-dark mb-3">
            <div className= "container-fluid">
                    <a className="navbar-brand" href="#">TODO LIST</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>       
            </div>
          </nav>
        </div>
        
         
    );
  }
}

export default Navbar;



