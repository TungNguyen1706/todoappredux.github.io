import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';
import * as actions from './../actions/index';


class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus: -1 
        };
    }
    onChange = (event) =>{
        let target = event.target;
        let name = target.name;
        let value = target.value === 'checkbox'? target.checked : target.value;
      
        let filter = {
            name :   name === "filterName" ? value : this.state.filterName,
            status : name === "filterStatus" ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        });
       
    }
    
  render(){
    let {tasks,filterTable,keyword,sort}= this.props;
    
    // search
    if(keyword){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ;
        })
    }
    //filter on table
     if(filterTable){
        if(filterTable.name){
                tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1 ;
            })
        }
        tasks = tasks.filter((task)=>{
        if(filterTable.status === -1 ){
            return task;
        }
        else {
            return task.status === (filterTable.status === 1 ? true : false);
        }
        })
    };
    // sort 
    if(sort.by === 'name'){
        tasks.sort((a,b)=>{
            if(a.name.toLowerCase()>b.name.toLowerCase()) return sort.value;
            else if (a.name.toLowerCase()<b.name.toLowerCase()) return -sort.value;
            else return 0;
        })
    }else{
        tasks.sort((a,b)=>{
            if(a.status>b.status) return -sort.value;
            else if (a.status<b.status) return sort.value;
            else return 0;
        })
    }

    let elmTask = tasks.map((task,index)=>{
        return  < TaskItem 
                    key={task.id}
                    index = {index}
                    task = {task}     
                />
    })
    return (
        <div className="row">
            <div className="col-12">
                <div className="row ml-md-1">
                    <table className="table table-hover table-striped text-center">
                        <thead className="thead-dark">
                        <tr>
                            <th className="w-10" scope="col">STT</th>
                            <th className="w-45" scope="col">Tên</th>
                            <th className="w-20" scope="col">Trạng thái</th>
                            <th className="w-25" scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" />
                            <td><input value={this.state.filterName} onChange={this.onChange} name="filterName" className="form-control" /></td>
                            <td>
                            <select value={this.state.filterStatus} onChange={this.onChange} name="filterStatus" className="form-control">
                                <option value={-1}>Tất Cả</option>
                                <option value={1}>Kích Hoạt</option>
                                <option value={0}>Ẩn</option>
                            </select>
                            </td>
                            <td />
                        </tr>
                           {elmTask}
                       
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
};

const mapStateToProps = (state)=>{
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);






