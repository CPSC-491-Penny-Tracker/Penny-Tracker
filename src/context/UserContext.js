import React, { Component } from 'react';
import ApiService from '../service/ApiService';
import JwtService from '../service/JwtService';

const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  setSummary: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      error: null,
    };

    const jwtPayload = JwtService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        username: jwtPayload.sub
      };

    this.state = state;
  }

  componentDidMount() {
    if (JwtService.hasAuthToken()) {
      JwtService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    JwtService.clearCallbackBeforeExpiry();
  }

  setUser = user => {
    this.setState({ user });
  };

  setSummary = summary => {
    this.setState({ summary });
  };

  processLogin = authToken => {
    JwtService.saveAuthToken(authToken);
    const jwtPayload = JwtService.parseAuthToken();
    this.setUser({
      username: jwtPayload.sub
    });
    console.log(jwtPayload, 'payload')
    JwtService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  processLogout = () => {
    JwtService.clearAuthToken();
    JwtService.clearCallbackBeforeExpiry();
    this.setUser({});
  };

  processSummary = authToken => {
    JwtService.saveAuthToken(authToken);
    const jwtPayload = JwtService.parseAuthToken();
    this.setSummary({
      store: jwtPayload.sub
    });
    console.log(jwtPayload, 'payload')
    JwtService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  logoutBecauseIdle = () => {
    JwtService.clearAuthToken();
    JwtService.clearCallbackBeforeExpiry();
    this.setUser({ idle: true });
  };

  fetchRefreshToken = () => {
    ApiService.refreshToken()
      .then(res => {
        JwtService.saveAuthToken(res.authToken);
        JwtService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch(err => {
        this.processLogout();
      });
  };

  render() {
    const value = {
      user: this.state.user,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setSummary: this.setSummary
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
