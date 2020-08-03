import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';


class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id   :'',
            name : '',
            status: false,
        };
      }
      UNSAFE_componentWillMount(){
        let {itemEditting} = this.props;
        if(itemEditting && itemEditting.id !== null){
              this.setState({
                  id : itemEditting.id,
                  name  : itemEditting.name,
                  status : itemEditting.status
              });
            }
        else{
            this.onClear();
        }
      }
      componentWillReceiveProps(nextProps){
        let {itemEditting} = this.props;
          if(nextProps && nextProps.itemEditting){
              this.setState({
                id : nextProps.itemEditting.id,
                name  : nextProps.itemEditting.name,
                status : nextProps.itemEditting.status
              })
          }else if(!nextProps.itemEditting){
            this.onClear();
          }
      }
      closeForm = () =>{
        this.props.onCloseForm() ;
      }
      onChange = (event) =>{
        let target = event.target;
        let value = target.value;
        let name = target.name;

        //ep kieu
        if( name === "status" ){
             value = target.value === 'true' ? true : false
        };
        this.setState({
            [name]: value
        });
       
      }
      onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.closeForm();

      }
      onClear = () =>{
        this.setState({
            name : '',
            status: false,
        })
      }


  render(){
    let {id} = this.state;

    let {isDisplayForm,itemEditting} = this.props;

    if(!isDisplayForm) return null;
    return (
        <div className="card">
            <div className="card-header bg-warning text-danger">
                {itemEditting.id === '' ? 'Thêm công việc' : 'Cập nhật'}
                <button type="button" className="close text-right" aria-label="Close">
                    <span onClick={this.closeForm} aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên : </label>
                    <input value={this.state.name} onChange={this.onChange} className="form-control" name="name"/>
                </div>
                <div className="form-group">
                    <label>Trạng thái : </label>
                    <select value={this.state.status} onChange={this.onChange} className="form-control" name="status">
                    <option value={true} >Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-danger">Thêm</button>
                <button onClick={this.onClear} type="button" className="btn btn-warning">Hủy bỏ</button>
                </form>
            </div>
        </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditting : state.itemEditting
  }
}
const mapDispatchToProps = (dispatch,props) => {
  return {
    onSaveTask : (task) => {
        dispatch(actions.saveTask(task));
      },
      onCloseForm : () => {
        dispatch(actions.closeForm());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
