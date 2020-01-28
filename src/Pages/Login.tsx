import React, { ChangeEvent } from 'react';
import { default as data } from '../LoginCredientials.json';
import { ILoginParams, IDictionary } from '../Interface/IKbStoreProps.js';

class Login extends React.Component<any, ILoginParams> {
    private routeMapping: IDictionary<string> = {};

    constructor(props) {
        super(props);

        this.state = {
            UserId: '',
            Password: '',
            IsError: false
        }
        this.SetRouteMappings();
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="wrapper">
                    <div className="form-signin" role="login_form">
                        <h2 className="form-signin-heading" role="header">Please login</h2>
                        <input type="text" className="form-control" value={this.state.UserId} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ UserId: event.target.value })}
                            name="username" placeholder="User Id" />
                        <input type="password" className="form-control" value={this.state.Password} onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ Password: event.target.value })}
                            name="password" placeholder="Password" />

                        <button className="btn btn-lg btn-primary btn-block" onClick={this.OnClick} type="submit">Login</button>

                        {this.state.IsError && <div className="error" role="error">Invalid Username or password</div>}

                    </div>
                </div>
            </div>
        );
    }

    private SetRouteMappings() {
        this.routeMapping["User"] = "/User";
        this.routeMapping["Admin"] = "/Admin";
    }

    private OnClick = () => {
        let loginData = data.UserContext;

        var result = loginData.filter(item => item.UserId === this.state.UserId &&
            item.Password === this.state.Password)[0];
        
        result && this.routeMapping[result.Role] ?
            this.props.history.push(this.routeMapping[result.Role]) :
            this.ShowError();
    }

    private ShowError() {
        this.setState({ IsError: true, UserId: '', Password: '' })
    }
}

export default Login;
