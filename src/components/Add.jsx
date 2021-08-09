import React, { useRef, useState, useEffect } from 'react';
import Loading from './Loading';
import Modal from './Modal';
import { useHistory } from 'react-router-dom';
import { serverUrl } from '../util';

const Add = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    title: '',
    content: '',
    toggle: () => setModal({ ...modal, active: false })
  });

  useEffect(() => {
    document.title = "Shorty | add"
  }, [])

  const title = useRef('');
  const originalLink = useRef('');
  const token = localStorage.getItem('shortyToken');

  const cancelClick = (e) => {
    e.preventDefault();
    history.push('/app');
  }

  const handleAdd = async (e) => {
    e.preventDefault();

    if (title.current.value === '' || originalLink.current.value === '') {
      setModal({
        ...modal,
        active: true,
        title: 'Empty fields',
        content: 'Please fill all fields'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          link: originalLink.current.value,
          title: title.current.value
        })
      });

      const json = await response.json();
      setLoading(false);

      if (response.ok) {
        history.push('/app');
      } else {
        setModal({
          ...modal,
          active: true,
          title: 'Error',
          content: `${json.message}`
        });
      }
    } catch(err) {
      setLoading(false);
      console.log(err);
      setModal({
        ...modal,
        active: true,
        title: 'Error',
        content: `${err.message}`
      });
    }
  }

  return (
    <div className="center-items flex-column w-100 h-100">
      <Loading active={loading} />
      <Modal {...modal} />
      <h1 className="color-black upper">Add new Link</h1>

      <form className="card shadow flex-column w-75">
        <label htmlFor="title" className="label">title</label>
        <input type="text"
          className="input"
          id="title"
          name="title"
          ref={title}
        />

        <label htmlFor="link" className="label">link</label>
        <input type="text"
          className="input"
          id="link"
          name="link"
          ref={originalLink}
        />

        <div className="flex-row flex-colum-sm">
          <button className="btn bg-blue color-white w-50 m-1 w-100-sm"
            onClick={handleAdd}
          >
            add
          </button>

          <button className="btn bg-transparent outline-blue color-blue w-50 m-1 w-100-sm"
            onClick={cancelClick}
          >
            cancel
          </button>
        </div>
      </form>

    </div>
  );
}

export default Add;