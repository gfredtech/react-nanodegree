import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card } from 'antd';
import { logoutUser } from '../actions/auth';
import Home from './Home';
import Navbar from './Navbar';

const Dashboard = ({ isAuthenticated, user, logoutUser }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  const logoutButton = (
    <span>
      <span style={{}}>
        Hello,{' '}
        <span>
          <b>{`${user.name}`}</b>
        </span>
      </span>
      &nbsp; &nbsp;
      <Button onClick={() => logoutUser()}>Logout</Button>
      &nbsp; &nbsp;
    </span>
  );

  if (user)
    return (
      <Card bordered={false} title={<Navbar />} extra={logoutButton}>
        <Home />
      </Card>
    );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Dashboard));
