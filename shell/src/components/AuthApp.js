import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/AuthApp';

const AuthApp = ({ onSignIn }) => {
  const authRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(authRef.current, {
      initialPath: history.location.pathname,
      onSignIn,
      onNavigate,
    });
    history.listen(onParentNavigate);
  }, []);

  const onNavigate = ({ pathname: nextPathname }) => {
    const { pathname } = history.location;
    if (pathname !== nextPathname) {
      history.push(nextPathname);
    }
  };

  return <div ref={authRef}></div>;
};

export default AuthApp;
