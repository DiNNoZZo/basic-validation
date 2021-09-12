import React, { useState, useRef } from 'react';

import PopMessage from './UI/PopMessage';
import Card from './UI/Card';
import Button from './UI/Button';

import './AddPeopleForm.scss';

const AddPeopleForm = (props) => {
  //states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState();

  //refs
  const inputName = useRef(null);

  //validations
  const validationStr = (string) => {
    if (string.trim().length < 3) {
      setError({
        title: 'Must contain at least 3 characters.',
        message:
          'The name you enter is too short, the menu must contain 3 or more characters.',
      });

      return false;
    }

    return true;
  };

  const validationNum = (number) => {
    if (isNaN(number) || number.trim() === '') {
      setError({
        title: 'Enter your age.',
        message: 'Empty field and letters do not express your age 😎.',
      });

      return false;
    }

    if (+number === 0) {
      setError({
        title: 'You must have more than 0.',
        message:
          'If you are already sitting here, you must be over 0 years old 😋.',
      });

      return false;
    }

    if (+number < 0) {
      setError({
        title: 'Your age is a positive number.',
        message: "If your age is a negative number, then I don't know 😁.",
      });

      return false;
    }

    return true;
  };

  //get Data from inputs
  const getNameHandler = (event) => {
    setName(event.target.value);
  };

  const getAgeHandler = (event) => {
    setAge(event.target.value);
  };

  //closed pop message
  const closedPop = () => {
    setError(null);
  };

  //sending data to create new user
  const submitHandler = (e) => {
    e.preventDefault();

    //generating a higher id
    const id = props.users.reduce((acc, user) => {
      if (acc > user.id) return acc;
      else return user.id + 1;
    }, 0);

    //create data object
    const newUser = {
      id,
      name,
      age,
    };

    //validation
    const isValidNum = validationNum(newUser.age);
    const isValidStr = validationStr(newUser.name);

    if (!isValidStr || !isValidNum) return;

    //send
    props.getNewUser(newUser);

    //clean inputs and focus on the first
    setName('');
    setAge('');

    inputName.current.focus();
  };

  return (
    <div>
      <Card>
        <form className="form" onSubmit={submitHandler}>
          <ul>
            <li className="form__item">
              <label className="label label--name">Name</label>
              <input
                ref={inputName}
                value={name}
                onChange={getNameHandler}
                className="input input--name"
                id="name"
                type="text"
                name="name"
              ></input>
            </li>
            <li className="form__item">
              <label className="label label--age">Age</label>
              <input
                value={age}
                onChange={getAgeHandler}
                className="input input--age"
                id="age"
                type="number"
                name="age"
              ></input>
            </li>
            <li className="form__item">
              <Button
                className="button button--age"
                type="submit"
                name="submit"
              >
                Add user
              </Button>
            </li>
          </ul>
        </form>
      </Card>
      {error && (
        <PopMessage
          title={error.title}
          message={error.message}
          closedPop={closedPop}
        />
      )}
    </div>
  );
};

export default AddPeopleForm;
