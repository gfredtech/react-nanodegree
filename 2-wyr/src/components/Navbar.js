import { Link } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

const Navbar = () => {
  return (
    <span>
      <Link to="/dashboard">
        <Button type={'primary'}>Dashboard</Button>
      </Link>
      &nbsp; &nbsp;
      <Link to="/add">
        <Button type={'primary'}>New Question</Button>
      </Link>
      &nbsp; &nbsp;
      <Link to="/leaderboard">
        <Button type={'primary'}>Leaderboard</Button>
      </Link>
      &nbsp; &nbsp;
    </span>
  );
};

export default Navbar;
