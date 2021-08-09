import React from 'react';

const Modal = ({title, active, content, toggle}) => {

  if (active) {
    return (
      <div className="w-100 h-100vh bg-modal z-10 t-0 l-0 fixed overflow-auto center-items">
        <div className="bg-white p-2 round-corners m-auto w-75 flex-column max-w-500">
          <div className="w-100 flex-row mb-1">
            <h3 className="mr-auto upper text-left">{title}</h3>
            <h3
              className="pointer"
              onClick={(e) => toggle()}
            >&times;</h3>
          </div>
          {content}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Modal;