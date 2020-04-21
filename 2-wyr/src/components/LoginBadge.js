import React from 'react';
import { Card } from 'antd';

const LoginBadge = ({ user, onUserClick }) => {
  return (
    <div className="user center" onClick={onUserClick}>
      <Card
        cover={
          <img className="home-avatar" src={user.avatarURL} alt="user-avatar" />
        }
      >
        <Card.Meta title={<span className="name">{user.name}</span>} />
      </Card>
    </div>
  );
};
export default LoginBadge;
