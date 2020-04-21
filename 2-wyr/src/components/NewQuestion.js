import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { saveQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { logoutUser } from '../actions/auth';
import { saveLastVisitedPage } from '../actions/history';

const NewQuestion = ({
  location,
  user,
  saveQuestion,
  isAuthenticated,
  logoutUser,
  saveLastVisitedPage,
}) => {
  const [inputs, setInputs] = useState({
    inputOne: '',
    inputTwo: '',
  });

  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => await saveLastVisitedPage(location.pathname))();
  }, [location.pathname, saveLastVisitedPage]);

  const handleSubmit = async e => {
    e.preventDefault();
    await saveQuestion({
      optionOneText: inputs.inputOne,
      optionTwoText: inputs.inputTwo,
      author: user.id,
    });
    setDone(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  } else if (done) {
    return <Redirect to="/dashboard" />;
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
    <Card bordered={false} title={<Navbar />} extra={logoutButton}>
      <div style={{}}>
        <p style={{ textAlign: 'center' }}>
          <b>Would You Rather</b>
        </p>
        <form
          style={{
            display: 'flex',
            flexWrap: true,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Input
            style={{ width: '20%' }}
            name="inputOne"
            onChange={handleChange}
            value={inputs.inputOne}
            type="text"
            placeholder="Option 1"
          />
          <p style={{ margin: '5px auto' }}>OR</p>
          <Input
            style={{ width: '20%' }}
            name="inputTwo"
            onChange={handleChange}
            value={inputs.inputTwo}
            type={'textArea'}
            placeholder="Option 2"
          />
          <Button
            type="primary"
            disabled={
              inputs.inputOne.trim() === '' || inputs.inputTwo.trim() === ''
            }
            style={{ margin: '20px auto' }}
            onClick={handleSubmit}
          >
            Save Question
          </Button>
        </form>
      </div>
    </Card>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, {
  saveQuestion,
  logoutUser,
  saveLastVisitedPage,
})(NewQuestion);
