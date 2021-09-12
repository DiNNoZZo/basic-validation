import React from 'react';
import Message from './UI/Message';
import Card from './UI/Card';

import './UsersList.scss';

//do we have users?
const UsersList = (props) => {
  if (props.users.length === 0) {
    return <Message message="There are no more users left." />;
  }

  //delete user
  const deleteUserHandler = (e) => {
    const deleteEl = e.target.closest('.user__item');
    props.deleteUser(deleteEl);
  };

  return (
    <Card className="users__list">
      <ul>
        {props.users.map((user) => {
          return (
            <li
              key={user.id}
              id={user.id}
              className="user__item"
              onClick={deleteUserHandler}
            >
              <p className="user user--name">
                {user.name} <span>({user.age} years old)</span>
              </p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default UsersList;
