import React, { useEffect, useState } from 'react';
import Link from './Link';
import useFetch from '../hooks/useFetch';
import { serverUrl } from '../util';
import Modal from './Modal';
import Loading from './Loading';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const { loading, error, data } = useFetch(`${serverUrl}/links`);
  const [modal, setModal] = useState({
    active: false,
    title: '',
    content: '',
    toggle: () => setModal({ ...modal, active: false })
  });

  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('shortyToken');
    history.push('/login');
  }

  const gotoAdd = (e) => {
    e.preventDefault();
    history.push('/add')
  }

  useEffect(() => {
    document.title = 'Shorty | app';
  }, []);

  let linksList = null;

  if (data != null) {
    linksList = data.links.map((link) => (
      <Link
        id={link._id}
        title={link.title}
        key={link._id}
      />
    ));
  }
  

  return (
    <div className="center-items flex-column w-100 h-100">
      <h1 className="text-center color-black upper my-1">your links</h1>
      <button
        className="btn bg-blue w-75 color-white m-1 max-w-500"
        onClick={gotoAdd}
      >
        {'add new link'}
      </button>

      <button
        className="btn bg-red w-75 color-white m-1 max-w-500"
        onClick={logout}
      >
        {'Log out'}
      </button>
      
      {loading && <Loading active={loading} />}
      {error && 
        <Modal
          active={true}
          title="Error"
          content={`${error.message}. Try to refresh the page.`}
          toggle={modal.toggle}
        />
      }
      <div className="w-75 max-w-500">
        {data && linksList}
      </div>
    </div>
  );
}

export default Main;