import React, { Component } from 'react';
import { connect } from 'react-redux';


class MileageItemList extends Component {

    

          render() {
            console.log('Juy-na');
    
            // let deleteButton = if ()
            return (
                <div>
                    <img src={this.props.item.image_url} height="42" width="42" />
                    <button onClick={this.clickHandler}>Delete</button>
                </div>
            );
        }
    
}

    export default connect(mapStateToProps)(MileageItemList);