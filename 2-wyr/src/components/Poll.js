import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { saveQuestionAnswer } from '../actions/questions';
import { Avatar, Button, Card, Radio } from 'antd';
import { getUsers, logoutUser } from '../actions/auth';
import Navbar from './Navbar';
import { saveLastVisitedPage } from '../actions/history';

const Poll = ({
  isAuthenticated,
  saveQuestionAnswer,
  user,
  questions,
  allUsers,
  logoutUser,
  location,
  saveLastVisitedPage,
}) => {
  const { question_id } = useParams();
  const [option, setOption] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => await saveLastVisitedPage(location.pathname))();
  }, [location.pathname, saveLastVisitedPage]);

  const handleChange = ({ target: { value } }) => {
    if (!isAnswered) setOption(value);
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  } else if (done) {
    return <Redirect to="/dashboard" />;
  }

  const question = questions.filter(q => q.id === question_id)[0];
  if (!question) {
    return <Redirect to="/404" />;
  }
  const isAnswered =
    question.optionOne.votes
      .concat(question.optionTwo.votes)
      .filter(id => id === user.id).length !== 0;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isAnswered) {
      await saveQuestionAnswer({
        authedUser: user.id,
        qid: question_id,
        answer: option === 1 ? 'optionOne' : 'optionTwo',
      });
      setDone(true);
    }
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

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
    <div>
      <Card title={<Navbar />} extra={logoutButton}>
        <form
          style={{
            display: 'flex',
            flexWrap: true,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            size={69}
            src={
              allUsers &&
              allUsers.filter(u => u.id === question.author)[0].avatarURL
            }
            alt={'avatar'}
          />
          <div style={{ marginTop: 20 }}>
            {`${allUsers &&
              allUsers.filter(u => u.id === question.author)[0].name} asks:`}
          </div>
          <p style={{ marginTop: 10, textAlign: 'center' }}>
            <b>Would You Rather</b>
          </p>
          <Radio.Group
            onChange={handleChange}
            value={
              isAnswered
                ? question.optionOne.votes.filter(id => id === user.id)
                    .length !== 0
                  ? 1
                  : 2
                : option
            }
          >
            <Radio style={radioStyle} value={1}>
              {question.optionOne.text}
            </Radio>
            {isAnswered && (
              <div>
                <p style={{ textAlign: 'center' }}>
                  {`Number of voters for this option: ${question.optionOne.votes.length}`}
                </p>
                <p style={{ textAlign: 'center' }}>
                  {`% voters for this option: ${(
                    (question.optionOne.votes.length / allUsers.length) *
                    100
                  ).toFixed(1)}%`}
                </p>
              </div>
            )}
            <Radio style={radioStyle} value={2}>
              {question.optionTwo.text}
            </Radio>
            {isAnswered && (
              <div>
                <p style={{ textAlign: 'center' }}>
                  {`Number of voters for this option: ${question.optionTwo.votes.length}`}
                </p>
                <p style={{ textAlign: 'center' }}>
                  {`% voters for this option: ${(
                    (question.optionTwo.votes.length / allUsers.length) *
                    100
                  ).toFixed(1)}%`}
                </p>
              </div>
            )}
          </Radio.Group>
          {!isAnswered && (
            <Button
              disabled={option === 0}
              type="primary"
              style={{ margin: '20px auto' }}
              onClick={handleSubmit}
            >
              Save Answer
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  allUsers: state.auth.allUsers,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, {
  saveQuestionAnswer,
  getUsers,
  logoutUser,
  saveLastVisitedPage,
})(Poll);
