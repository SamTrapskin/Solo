import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
 
// type Props = {
//   open: boolean,
//   onAction: Function,
//   onClose: Function,
// };
 
export default class UserDeletedSnackbar extends Component {
  // props: Props
 
  render() {
    const {
      open,
      onAction,
      onClose,
    } = this.props;
    return (
      <Snackbar
        visible={open}
        message="User deleted."
        action="undo"
        onActionTouchTap={onAction}
        autoHideDuration={3000}
        onRequestClose={onClose}
      />
    );
  }
}