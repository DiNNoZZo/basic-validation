import React, { useState } from 'react';
import AddPeopleForm from './components/AddPeopleForm';

import './App.scss';
import UsersList from './components/UsersList';

const DUMMY_USERS = [
  {
    id: 1,
    name: 'John',
    age: 28,
  },
  {
    id: 2,
    name: 'Eva',
    age: 21,
  },
];

function App() {
  const [users, setUsers] = useState(DUMMY_USERS);

  const getNewUser = (user) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  const deleteUser = (deleteUser) => {
    const newUsers = users.filter((user) => user.id !== +deleteUser.id);
    setUsers([...newUsers]);
  };

  return (
    <div className="App">
      <AddPeopleForm users={users} getNewUser={getNewUser} />
      <UsersList users={users} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
