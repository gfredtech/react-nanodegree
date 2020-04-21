import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Tabs } from 'antd';

const Home = ({ allUsers, user, questions }) => {
  const { TabPane } = Tabs;

  const answered = [];
  const unanswered = [];

  (() => {
    questions.forEach(question => {
      const votes = question.optionOne.votes.concat(question.optionTwo.votes);
      if (votes.filter(id => id === user.id).length !== 0) {
        answered.push(question);
      } else unanswered.push(question);
    });
  })();

  return (
    <Tabs tabPosition="left">
      <TabPane tab=" Answered" key="1">
        {answered
          .sort(
            (questionA, questionB) => questionB.timestamp - questionA.timestamp
          )
          .map(question => (
            <Question
              key={question.id}
              question={question}
              user={allUsers.filter(u => u.id === question.author)[0]}
            />
          ))}
      </TabPane>
      <TabPane tab="Unanswered" key="2">
        {unanswered
          .sort(
            (questionA, questionB) => questionB.timestamp - questionA.timestamp
          )
          .map(question => (
            <Question
              key={question.id}
              question={question}
              user={allUsers.filter(u => u.id === question.author)[0]}
            />
          ))}
      </TabPane>
    </Tabs>
  );
};

const Question = ({ question, user }) => {
  return (
    <Card
      style={{ marginBottom: 20, width: 500 }}
      key={question.id}
      title={
        <span>
          <Avatar src={user.avatarURL} />
          <span style={{ marginLeft: 10 }}>{`${user.name} asks...`}</span>
        </span>
      }
    >
      <div>
        {`Would You Rather ${question.optionOne.text} or ${question.optionTwo.text}?`}
      </div>
      <Link to={`/question/${question.id}`}>
        <Button type={'primary'} style={{ marginTop: 20 }}>
          View Poll
        </Button>
      </Link>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  allUsers: state.auth.allUsers,
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Home);
