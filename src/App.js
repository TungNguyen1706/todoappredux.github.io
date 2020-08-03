import React, { Component } from 'react';
import './App.css';

import Control from './components/Control';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onToogleForm = () =>{
       
        let {itemEditting} =this.props;
        if(itemEditting && itemEditting.id !== ''){
            // editting
            this.props.onOpenForm();
        }
        else{
            //add item
            this.props.onToogleForm();
        }
        this.props.onClearTask({
            id: '',
            name : '',
            status: false
        })

    };

    render()
    {
        let {isDisplayForm} = this.props;
    return (

      <div>
          <Navbar />
        <div className= "container">
          <div className="row">
            <div className= {isDisplayForm ? 'col-xs-12 col-md-4': ''} >
                <TaskForm  /> 
            </div>
            {/* end them cong viec */}
            <div className= {isDisplayForm ? 'col-xs-12 col-md-8': 'col-xs-12 col-md-12'}>
              <div className="row ">
                <button onClick={this.onToogleForm} type="button" className={isDisplayForm?'btn btn-danger ml-3 mt-2':'btn btn-dark ml-3'}>
                    <i className="icofont-ui-add">&nbsp;</i>
                    Thêm công việc
                </button>
              </div>
                < Control/>
                < TaskList />            
            </div>
          </div>
          </div>
      </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditting : state.itemEditting
    }
  }
const mapDispatchToProps = (dispatch,props) => {
return {
    onToogleForm : () => {
        dispatch(actions.toogleForm())
    },
    onClearTask : (task) =>{
        dispatch(actions.editItem(task))
    },
    onOpenForm : () => {
    dispatch(actions.openForm())
    }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
