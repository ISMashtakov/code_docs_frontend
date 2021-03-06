import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import CustomSnackbarProvider from './general_items/SnackbarProvider';
import store from './redux/store';
import SignPage from './sign/SignPage';
import DocumentPage from './workspace/DocumentPage';
import MailActivatePage from './sign/MailActivatePage';
import AccountPage from './account/AccountPage';
import ResetPasswordPage from './sign/ResetPasswordPage';
import {LOGIN_PAGE_NAME, SIGNUP_PAGE_NAME, FILE_PAGE_NAME, ACTIVATE_PAGE_NAME, ACCOUNT_PAGE_NAME, PASSWORD_RESET_PAGE_NAME} from './constants'


function App(){
  return(
  <CustomSnackbarProvider>
    <Provider store={store}>
      <style>{`
        body {
          margin: 0px;
          padding: 0px;
          height: 100%;
        }
      `}</style>
      <Router>
        <Switch>
          <Route path={`/${LOGIN_PAGE_NAME}`}> 
            <SignPage isLogin/> 
          </Route>
          <Route path={`/${SIGNUP_PAGE_NAME}`}> 
            <SignPage/>
          </Route>
          <Route path={`/${FILE_PAGE_NAME}`}> 
            <DocumentPage/>
          </Route>
          <Route path={`/${ACTIVATE_PAGE_NAME}`}> 
            <MailActivatePage/>
          </Route>
          <Route path={`/${ACCOUNT_PAGE_NAME}`}> 
            <AccountPage/>
          </Route>
          <Route path={`/${PASSWORD_RESET_PAGE_NAME}`}> 
            <ResetPasswordPage/>
          </Route>
          <Redirect from='/' to={`/${ACCOUNT_PAGE_NAME}`} />
        </Switch>
      </Router>
    </Provider>
  </CustomSnackbarProvider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
