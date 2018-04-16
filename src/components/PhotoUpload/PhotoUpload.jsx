import React from 'react';

import './PhotoUpload.css';

const photoUpload = (props) => {
  return (
    <div className="PhotoDiv">
      <div className="Title">{props.title}</div>
      <div className="IDPhoto" style={{backgroundImage: `url(${props.IDPhoto})`}}></div>
      <div className="IDMessage">Drop image of <br/>ID front here</div>
    </div>
  );
};

export default photoUpload;