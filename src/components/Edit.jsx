import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { serverUrl } from '../util';
import Loading from './Loading';
import Modal from './Modal';
import { FaClipboardList } from 'react-icons/fa';


const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    title: '',
    content: '',
    toggle: () => setModal({ ...modal, active: false })
  });

  const title = useRef('');
  const originalLink = useRef('');
  const shortLink = useRef('');
  const token = localStorage.getItem('shortyToken');



  const cancelClick = (e) => {
    e.preventDefault();
    history.push('/app');
  }

  const copyToClipboard = (e) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${location.hostname}/${shortLink.current.value}`)
      .then(() => {
        setModal({
          ...modal,
          active: true,
          title: 'Copied!',
          content: 'short link copied to clipboard!'
        });

        setTimeout(() => {
          setModal({
            ...modal,
            active: false
          })
        }, 1000);
      })
      .catch((err) => console.log(err));
    }
  }

  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      if (title.current.value === '' || originalLink.current.value === '') {
        setModal({
          ...modal,
          active: true,
          title: 'Empty fields',
          content: 'Please fill all fields'
        });

        return;
      }

      setLoading(true);
      const response = await fetch(`${serverUrl}/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.current.value,
          link: originalLink.current.value
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
    } catch (err) {
      console.log(err);
      setLoading(false);
      setModal({
        ...modal,
        active: true,
        title: 'Error',
        content: `${err.message}`
      });
    }
  }


  const deleteLink = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/links/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      setLoading(false);

      if (response.ok) {
        history.push('/app');
      } else {
        setModal({
          ...modal,
          title: 'Error',
          content: `${json.message}`
        });
      }
    } catch(err) {
      console.log(err);
      setLoading(false);
      setModal({
        ...modal,
        title: 'Error',
        content: `${err.message}`
      });
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/links/${id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();
        setLoading(false);

        if (response.ok) {
          title.current.value = json.link.title;
          originalLink.current.value = json.link.link;
          shortLink.current.value = json.link.shortLink;
        } else {
          if (response.status === 404) {
            history.push('/notFound');
            return;
          }
          
          setModal({
            ...modal,
            active: true,
            title: 'Error',
            content: (<div>
              {json.message}. Try to refresh the page or Click <Link to="/app">here</Link> to go back to your list of links.
            </div>)
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        setModal({
          ...modal,
          active: true,
          title: 'Error',
          content: (<div>
            {err.message}. Try to refresh the page or Click <Link to="/app">here</Link> to go back to your list of links.
          </div>)
        });
      }
    }

    document.title = "Shorty | edit";
    fetchData();
  }, []);


  return (
    <div className="center-items flex-column w-100 h-100">
      <Loading active={loading} />
      <Modal {...modal} />
      <h1 className="color-black upper">Edit link</h1>

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

        <label htmlFor="shortLink" className="label">shortLink</label>
        <div className="relative">
          <input type="text"
            className="input"
            id="shortLink"
            name="shortLink"
            disabled
            ref={shortLink}
          />
          <FaClipboardList
            className="input-icon-right pointer color-blue"
            size={"1rem"}
            onClick={copyToClipboard}
          />
        </div>

        <div className="flex-row flex-colum-sm ">
          <button className="btn bg-blue color-white w-33 my-1 w-100-sm"
            onClick={saveChanges}
          >
            save changes
          </button>

          <button className="btn bg-red color-white w-33 m-1 w-100-sm"
            onClick={deleteLink}
          >
            delete link
          </button>

          <button className="btn bg-transparent outline-blue color-blue w-33 my-1 w-100-sm"
            onClick={cancelClick}
          >
            cancel
          </button>
        </div>
      </form>

    </div>
  );
}

export default Edit;