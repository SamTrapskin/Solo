import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';


import moment from 'moment';

      const style = {
        margin: 12,
      };
      const mapStateToProps = (state) => ({
        user: state.user
      });
  
     
  

  class UserPage extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        hidden: true
      };
    }
    componentDidMount() {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
      if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push('home');
      }
    }

    logout = () => {
      this.props.dispatch(triggerLogout());
      // this.props.history.push('home');
    };
   

  
    render() {
      let content = null;

      if (this.props.user.userName) {
        content = (
          <div>
            <h1 id="welcome">Welcome, {this.props.user.userName}!</h1>

                <FormControl
                  type="text"
                  placeholder="Item"
                  onChange={this.handleChange}
                  />
                  <FormControl
                  type="number"
                  placeholder="Item Price"
                  onChange={this.handleChange}
                  />
                  <FormControl
                  type="text"
                  placeholder="Item link / notes"
                  onChange={this.handleChange}
                  />
                  <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <Button bsStyle="primary" bsSize="large" active>
                  Add Item
                  </Button>
                       
          
            <button onClick={this.logout}>Log Out</button>
            <table className="Awesome">
              <tbody>
                <tr>
                  <th>Lame</th>
                  <th>Soo Lame</th>
                  <th>uggghh</th>
                </tr>

                <tr>
                  <td>Ummm</td>
                </tr>
                <tr>
                <td>hhhhhhhhunnnnv</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

		return (
			<div>
				<Nav />
				{content}
			</div>
		);
	}
 }

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);




