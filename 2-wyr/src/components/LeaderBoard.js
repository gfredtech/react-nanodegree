import React, { useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { getCounts } from '../utils/leaderboard';
import { saveLastVisitedPage } from '../actions/history';

const LeaderBoard = ({
  logoutUser,
  isAuthenticated,
  user,
  allUsers,
  location,
  questions,
  saveLastVisitedPage,
  clearLastVisitedPage,
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

  const [answerCount, askCount] = getCounts(allUsers, questions);

  const sortedUsers = allUsers.sort((userA, userB) => {
    const aSize = answerCount[userA.id] + askCount[userA.id];
    const bSize = answerCount[userB.id] + askCount[userB.id];
    return bSize - aSize;
  });

  return (
    <Card bordered={false} title={<Navbar />} extra={logoutButton}>
      {sortedUsers.map(u => (
        <Card
          key={u.id}
          style={{ width: 400, margin: 'auto', marginBottom: 40 }}
          cover={<img src={u.avatarURL} alt={'avatar'} />}
        >
          <Card.Meta
            avatar={<Avatar src={u.avatarURL} alt={'avatar'} />}
            title={u.name}
            description={
              <span>
                <div>{`Answered Questions: ${answerCount[u.id]}`}</div>
                <div>{`Questions Asked: ${askCount[u.id]}`}</div>
              </span>
            }
          />
        </Card>
      ))}
    </Card>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  questions: state.questions.questions,
  allUsers: state.auth.allUsers,
});

export default connect(mapStateToProps, {
  logoutUser,
  saveLastVisitedPage,
})(LeaderBoard);
