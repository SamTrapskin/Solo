import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class Alert extends React.Component {
  state = {
    open: false,

  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

//TRASH ICON-TRIGGERS DISPATCH TO EXPENSE SAGA DELETE
handleClickRemove = (id) => {
  console.log('delete expense', this.state);
  this.setState({open: false});

 

  // this.setState({
  // 	openSnackbar: true
  // })
  };



  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="DELETE"
        primary={true}
        onClick={this.handleClickRemove}
        onChange={this.handleClickRemove}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Delete" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Delete Entry!?
        </Dialog>
      </div>
    );
  }
}