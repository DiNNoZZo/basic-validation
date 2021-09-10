import React, { useState, useRef } from 'react';

import PopMessage from './PopMessage';

import './AddPeopleForm.scss';

const AddPeopleForm = (props) => {
  //states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorDes, setErrorDes] = useState('');

  //refs
  const inputName = useRef(null);

  //validations
  const validationStr = (string) => {
    if (string.length < 3) {
      setErrorMsg('Must contain at least 3 characters.');
      setErrorDes(
        'The name you enter is too short, the menu must contain 3 or more characters.'
      );

      return false;
    }

    return true;
  };

  const validationNum = (number) => {
    if (isNaN(number) || number === '') {
      setErrorMsg('Enter your age.');
      setErrorDes('Empty field and letters do not express your age 😎.');

      return false;
    }

    if (+number === 0) {
      setErrorMsg('You must have more than 0.');
      setErrorDes(
        'If you are already sitting here, you must be over 0 years old 😋.'
      );

      return false;
    }

    if (+number < 0) {
      setErrorMsg('Your age is a positive number.');
      setErrorDes("If your age is a negative number, then I don't know 😁.");

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
  const closedPop = (boolean) => {
    if (boolean) {
      setErrorMsg('');
      setErrorDes('');
    }
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
    <form className="form container" onSubmit={submitHandler}>
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
            type="text"
            name="age"
          ></input>
        </li>
        <li className="form__item">
          <button className="button button--age" name="submit">
            Add user
          </button>
        </li>
      </ul>
      {errorMsg.length > 0 && (
        <PopMessage
          message={errorMsg}
          description={errorDes}
          closedPop={closedPop}
        />
      )}
    </form>
  );
};

export default AddPeopleForm;
