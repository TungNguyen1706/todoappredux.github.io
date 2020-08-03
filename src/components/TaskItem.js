import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {
    constructor(props){
        super(props);
      }

    onChangeStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDelete = () =>{
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
    onUpdate = () =>{
        this.props.onOpenForm();
        this.props.onEditItem(this.props.task);
    }
    
    confirmDelete = () => {
        confirmAlert({
          title: 'XÁC NHẬN !!!',
          message: 'Bạn có chắn chắn muốn xóa?',
          buttons: [
            {
              label: 'Có',
              onClick: this.onDelete 
            },
            {
              label: 'Không',
            }
          ]
        });
      };
    
    render(){
    
        let {task,index}= this.props;
       
    return (
        
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{task.name}</td>
            <td>
            <span 
                className= {task.status===true?'badge badge-success badge-focus':'badge badge-danger badge-focus'}
                onDoubleClick = {this.onChangeStatus}
            >
               {task.status===true?'Kích hoạt':'Ẩn'}
            </span>
            </td>
            <td>
              <button onClick={this.onUpdate} type="button" className="btn btn-dark btn-sm mr-1"><i className="icofont-ui-edit "></i></button>
              <button onClick={this.confirmDelete} type="button" className="btn btn-outline-dark btn-sm mr-1" ><i className="icofont-ui-delete"></i></button>
            </td>
        </tr>
                    
    );
  }
};
const mapStateToProps = state => {
  return {
   
  }
}
const mapDispatchToProps = (dispatch,props) => {
  return {
     onUpdateStatus : (id) => {
         dispatch(actions.updateStatus(id));
     },
     onDeleteTask : (id)=>{
       dispatch(actions.deleteTask(id));
     },
     onCloseForm : () => {
      dispatch(actions.closeForm());
    },
      onOpenForm : () => {
      dispatch(actions.openForm());
    },
    
    onEditItem : (task) => {
      dispatch(actions.editItem(task));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);






