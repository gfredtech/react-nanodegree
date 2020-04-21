import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUsers } from '../actions/auth';
import { loginUser } from '../actions/auth';
import LoginBadge from './LoginBadge';
import { fetchQuestions } from '../actions/questions';

const Landing = ({
  isAuthenticated,
  user,
  allUsers,
  getUsers,
  loginUser,
  fetchQuestions,
  lastVisitedPage,
}) => {
  useEffect(() => {
    getUsers();
    fetchQuestions();
  }, [getUsers, fetchQuestions]);

  if (isAuthenticated && user) {
    return (
      <Redirect
        to={lastVisitedPage.length !== 0 ? lastVisitedPage : '/dashboard'}
      />
    );
  }

  return (
    <div>
      <div className="list">
        <section className="login-section">
          <h2 className="title">Select a User to Login</h2>
          <div className="ln-row">
            {allUsers.map(u => (
              <LoginBadge
                key={u.id}
                user={u}
                onUserClick={() => {
                  loginUser(u.id);
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  allUsers: state.auth.allUsers,
  lastVisitedPage: state.history.history,
});

export default connect(mapStateToProps, {
  getUsers,
  fetchQuestions,
  loginUser,
})(Landing);
