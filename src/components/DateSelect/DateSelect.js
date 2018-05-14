import React from 'react';
import DatePicker from 'material-ui/DatePicker';

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
  formatDate(date){


  return (date.getMonth() + 1) + "/" + date.getFullYear() + "/" +  date.getDate();
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
      <DatePicker formatDate={this.formatDate}
        hintText="Select date"
        hintStyle={{color:'whitesmoke'}}
        inputStyle={{ color:'whitesmoke'}}
        value={this.state.controlledDate}
        onChange={(event, date) => {
          console.log('some eventssss', event, 'dateeeeeeee', date)
          this.setState({controlledDate: date})
          this.props.onChange(date)
        }}
      />
 

    );
  }
}






