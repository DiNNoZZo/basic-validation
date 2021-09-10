import React, { useRef } from 'react';

const PopMessage = (props) => {
  const popBackg = useRef(null);
  const popTimeLabel = useRef(null);

  //closed pop messages
  const closedPopMessage = (e) => {
    if (e.target !== popBackg.current) return;

    props.closedPop(true);
  };

  return (
    <div className="pop__background" ref={popBackg} onClick={closedPopMessage}>
      <aside className="container container--pop">
        <div className="pop__messange">
          <h2 className="notice">{props.message}</h2>
          <p className="description">{props?.description}</p>
        </div>
        <div className="pop__time" ref={popTimeLabel}></div>
      </aside>
    </div>
  );
};

export default PopMessage;
