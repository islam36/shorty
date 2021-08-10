import React, {useEffect} from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = "Shorty | not found";
  }, []);

  return (
    <div className="container_404">
      <h1>Sorry 😥 <br/>
        The page you requested is not found
      </h1>
    </div>
  );
};

export default NotFound;