import React, { Component } from 'react';
import { sortBy } from 'lodash';
import {connect} from 'react-redux';
import * as actions from './../actions/index';


class Sort extends Component {
  constructor(props){
    super(props);
   
  }
  onClick = (sortBy,sortValue) =>{
    this.props.onSort({
      by: sortBy,
      value : sortValue
    });
  }

  render(){
    let {sort} = this.props;
    return (
        <div className="col-4">
            <div className="dropdown " id="sort">
                <button className="btn btn-info dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icofont-chart-histogram-alt"></i>  Sắp xếp
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a onClick={()=>this.onClick('name',1)} type="button" 
                        className={(sort.by==='name'&& sort.value===1)?'dropdown-item sort-selected':'dropdown-item'}>
                      Từ A-&gt;Z
                    </a>
                    <a  onClick={()=>this.onClick('name',-1)} type="button" 
                        className={(sort.by==='name'&&sort.value===-1)?'dropdown-item sort-selected':'dropdown-item'}> 
                       Từ Z-&gt;A
                    </a>
                    <a  onClick={()=>this.onClick('status',1)}type="button" 
                       className={(sort.by==='status'&&sort.value===1)?'dropdown-item sort-selected':'dropdown-item'} >
                      Trạng thái Kích hoạt
                    </a>
                    <a  onClick={()=>this.onClick('status',-1)} type="button" 
                         className={(sort.by==='status'&&sort.value===-1)?'dropdown-item sort-selected':'dropdown-item'}>
                      Trạng thái Ẩn
                    </a>
                </div>
            </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
     sort : state.sort
  }
}
const mapDispatchToProps = (dispatch,props) => {
  return {
   onSort : (sort) =>{
     dispatch(actions.sortTask(sort));
   }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sort);