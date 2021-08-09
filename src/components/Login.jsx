import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { Link, useHistory } from 'react-router-dom';
import { serverUrl } from '../util';
import Loading from './Loading';
import Modal from './Modal';

const Login = () => {
  const username = useInput('');
  const password = useInput('');
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [modal, setModal] = useState({
    active: false,
    title: '',
    content: '',
    toggle: () => setModal({ ...modal, active: false })
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.value !== '' && password.value !== '') {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        const json = await response.json();
        setLoading(false);

        if (response.ok) {
          if (json && json.token) {
            localStorage.setItem('shortyToken', json.token);
            history.push('/app');
          }
        } else {
          setModal({
            ...modal,
            active: true,
            title: 'Error',
            content: json.message
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        setModal({
          ...modal,
          active: true,
          title: 'Error',
          content: err.message
        });
      }

    } else {
      setModal({
        ...modal,
        active: true,
        title: 'Empty fields',
        content: 'Please fill all fields'
      });
    }

  }

  useEffect(() => {
    document.title = "Shorty | login"
  }, [])

  return (
    <div className="center-items flex-column w-100 h-100vh">
      <Loading active={loading} />
      <Modal {...modal} />
      <h1 className="color-black upper">Login</h1>
      <p className="color-grey text-center px-2">connect to your account to manage your links</p>
      <form className="card shadow flex-column w-75">
        <label htmlFor="username" className="lebel">username</label>
        <input type="text"
          className="input"
          id="username"
          name="username"
          {...username}
        />

        <label htmlFor="password" className="lebel">password</label>
        <input type="password"
          className="input"
          id="password"
          name="password"
          autoComplete="true"
          {...password}
        />

        <button
          className="btn w-100 bg-blue color-white my-1"
          onClick={handleLogin}
        >login</button>

        <span>{'you don\'t have an account? click '}
          <Link
            to="/register"
            className="link text-center my-1"
          >here</Link>
          {' to register'}
        </span>
      </form>
    </div>
  );
}

export default Login;