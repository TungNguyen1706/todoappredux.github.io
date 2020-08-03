import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class Control extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
            <div className="row mt-3">
                <Search  />
                {/* end Search */}   
                <Sort />
                {/* end Sort */}  
            </div>
        </div>
        
         
    );
  }
}

export default Control;



