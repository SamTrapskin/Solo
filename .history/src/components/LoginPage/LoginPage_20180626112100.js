import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import TextField from 'material-ui/TextField';

const mapStateToProps = (state) => ({
	user: state.user,
	login: state.login
});

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	componentDidMount() {
		this.props.dispatch(clearError());
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.userName) {
			this.props.history.push('/expenses');
		}
	}

	login = (event) => {
		event.preventDefault();

		if (this.state.username === '' || this.state.password === '') {
			this.props.dispatch(formError());
		} else {
			this.props.dispatch(triggerLogin(this.state.username, this.state.password));
		}
	};

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};

	renderAlert() {
		if (this.props.login.message !== '') {
			return (
				<h2 className="alert" role="alert">
					{this.props.login.message}
				</h2>
			);
		}
		return <span />;
	}

	render() {
		return (
			<div>
				{this.renderAlert()}
				<form onSubmit={this.login}>
					<h1 id="login">Hey there!</h1>
					<br />
					<div>
            <label id="username" htmlFor="username">
						<TextField
							inputStyle={{color: 'whitesmoke'}}
							floatingLabelText="Username"
							value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              floatingLabelStyle={{color: 'whitesmoke'}}
						/>
            </label>
					</div>
					<div>
						<label id="password" htmlFor="password">
              <TextField 
              floatingLabelText="Password" 
              floatingLabelStyle={{color: "whitesmoke"}}
              inputStyle={{color: 'whitesmoke'}}
              type="password" 
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              />
						</label>
					</div>
					<div>
						<input type="submit" name="submit" value="Log In" />
          
						<Link className="register" to="/register">Register</Link>
           
					</div>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps)(LoginPage);
