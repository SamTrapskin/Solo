import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpenseTableList extends Component {

    render() {
        console.log('Juy-na');

    // let deleteButton = if ()
    return (
        <div>
            <tr>{this.props.data.data.item_description}</tr> 
            {/* <button onClick={this.clickHandler}>Delete</button> */}
        </div>
    );
  }
}


export default connect(mapStateToProps)(ExpenseTableList);