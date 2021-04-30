/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  //option의 상태에 따라 public private를 나누고 접근 권한을 분리한다.
  //option true 이면 로그인한 유저만 접근가능
  //option false 이면
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        //Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
