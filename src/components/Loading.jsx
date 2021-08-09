import React from 'react';

const Loading = ({active}) => {
  if (active) {
    return (
      <div className="w-100 h-100vh bg-modal z-10 t-0 l-0 fixed overflow-auto center-items">
        <div className="lds-ring bg-white round-corners">
          <div></div><div></div><div></div><div></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Loading;