import React, { useEffect } from 'react';
import { Button, Card } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import Navbar from './Navbar';
import { saveLastVisitedPage } from '../actions/history';

const NotFound = ({
  user,
  isAuthenticated,
  location,
  saveLastVisitedPage,
  logoutUser,
}) => {
  useEffect(() => {
    (async () => await saveLastVisitedPage(location.pathname))();
  }, [location.pathname, saveLastVisitedPage]);

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
  return (
    <Card title={<Navbar />} extra={logoutButton}>
      <p style={{ textAlign: 'center', fontSize: 30 }}>
        <b>This Poll cannot be found</b>
      </p>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { saveLastVisitedPage, logoutUser })(
  NotFound
);
