import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { Link, useHistory } from 'react-router-dom';
import { serverUrl } from '../util';
import Loading from './Loading';
import Modal from './Modal';

const Register = () => {
  const username = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    title: '',
    content: '',
    toggle: () => setModal({ ...modal, active: false })
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username.value !== '' && password.value !== '' && confirmPassword.value !== '') {
      if (password.value !== confirmPassword.value) {
        setModal({
          ...modal,
          active: true,
          title: 'Error',
          content: 'password confirmation is not equal to password'
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/users`, {
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
        console.log(json);

        if (response.ok) {
          if (json != null) {

            const content = <div>
              {'your account has been created successfully'} <br />
              {'click '}
              <Link to="/login">here</Link>
              {' to go to login page'}
            </div>;

            setModal({
              ...modal,
              active: true,
              title: 'Registeration successful',
              content: content
            });
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
    document.title = "Shorty | register"
  }, [])

  return (
    <div className="center-items flex-column w-100 h-100vh">
      <Loading active={loading} />
      <Modal {...modal} />
      <h1 className="color-black upper mt-1">Register</h1>
      <p className="color-grey text-center px-2">create your shorty account and start to shorten links</p>
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

        <label htmlFor="confirmPassword" className="lebel">confirm password</label>
        <input type="password"
          className="input"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="true"
          {...confirmPassword}
        />

        <button
          className="btn w-100 bg-blue color-white my-1"
          onClick={handleRegister}
        >register</button>

        <span>{'already registered? click '}
          <Link
            to="/login"
            className="link text-center my-1"
          >here</Link>
          {' to login'}
        </span>

      </form>
    </div>
  );
}

export default Register;