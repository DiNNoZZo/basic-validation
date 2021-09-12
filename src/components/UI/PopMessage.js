import React, { useRef } from 'react';

import Card from './Card';
import Button from './Button';

import classes from './PopMessage.module.scss';

const PopMessage = (props) => {
  const popTimeLabel = useRef(null);

  return (
    <div className={classes['pop__background']} onClick={props.closedPop}>
      <Card className={classes['container--pop']}>
        <div className={classes['pop__message']}>
          <h2 className={classes.title}>{props.title}</h2>
          <p className={classes.message}>{props?.message}</p>
        </div>
        <div className="pop__time" ref={popTimeLabel}></div>
        <Button className={classes['button--pop']} onClick={props.closedPop}>
          Ok
        </Button>
      </Card>
    </div>
  );
};

export default PopMessage;
