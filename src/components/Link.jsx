import React from 'react';
import { useHistory } from 'react-router-dom';


const Link = ({id, title}) => {
    const history = useHistory();

    return (
        <div className="w-100 shadow bg-white color-black bg-light-blue-hover pointer round-corners p-1 my-1"
            onClick={(e) => {
                history.push(`/edit/${id}`);
            }}
        >
            {title}
        </div>
    );
}

export default Link;