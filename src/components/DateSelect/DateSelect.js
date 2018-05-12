import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';

/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class DateSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
      openSnackbar: false,
      snackbarText: {
        dateconf: 'Date has been entered!'
      }
    };
  }

  handleChange = (event, date) => {
    console.log('we are in a handle change in date select', event, date)
    this.setState({
      controlledDate: date,
    });
    // this.setState({
		// 	openSnackbar: true
		// })
  };

  render() {
    console.log('state and props in date select', this.state, this.props)
    return (
      <DatePicker 
        hintText="Date of purchase"
        hintStyle={{color:'whitesmoke'}}
        inputStyle={{ color:'whitesmoke'}}
        value={this.state.controlledDate}
        onChange={this.props.onChange}
      />
    );
  }
}