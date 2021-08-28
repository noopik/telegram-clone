import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard, ProfileUser } from '../../components/molecules';
import { StyledHomepage } from './styled';

const HomePage = () => {
  let { path, url } = useRouteMatch();

  console.log('path', path);
  console.log('url', url);
  const [messages, setMessages] = useState([1, 2]);

  return (
    <StyledHomepage>
      <div className="container">
        <Switch>
          <Route exact path={path}>
            <aside>
              <Dashboard />
            </aside>
          </Route>
          <Route path={`/profile`}>
            <aside>
              <ProfileUser />
            </aside>
          </Route>
        </Switch>
        <main>
          {messages.length === 0 && (
            <p>Please select a chat to start messaging</p>
          )}
          {messages.length > 1 && <h1>helo</h1>}
        </main>
      </div>
    </StyledHomepage>
  );
};

export default HomePage;
