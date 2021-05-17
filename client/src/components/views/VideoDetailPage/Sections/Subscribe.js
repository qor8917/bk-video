import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Subscriber({ userTo, history }) {
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variables = { userTo };
    //구독자수 정보 받아오기
    axios.post('/api/subscribe/subscribeNumber', variables).then((r) => {
      if (r.data.success) {
        setSubscriberNumber(r.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 받아오지 못했습니다.');
      }
    });

    let subscribedvariables = {
      userTo,
      userFrom: localStorage.getItem('userId'),
    };
    //구독 하는지 안하는지 정보 받아오기
    axios.post('/api/subscribe/subscribed', subscribedvariables).then((r) => {
      if (r.data.success) {
        setSubscribed(r.data.subscribed);
      } else {
        alert('구독정보를 받아오지 못했습니다.');
      }
    });
  }, []);

  const onSubscribe = () => {
    if (localStorage.getItem('userId')) {
      //로그인 되어 있지 않다면
      let subscribedvariables = {
        userTo,
        userFrom: localStorage.getItem('userId'),
      };

      if (Subscribed) {
        //이미 구독중이라면
        axios
          .post('/api/subscribe/unSubscribe', subscribedvariables)
          .then((r) => {
            if (r.data.success) {
              setSubscriberNumber(SubscriberNumber - 1);
              setSubscribed(!Subscribed);
            } else {
              alert('구독취소를 실패했습니다.');
            }
          });
      } else {
        //미구독 중이라면
        axios
          .post('/api/subscribe/subscribe', subscribedvariables)
          .then((r) => {
            if (r.data.success) {
              setSubscriberNumber(SubscriberNumber + 1);
              setSubscribed(!Subscribed);
            } else {
              alert('구독하는데 실패했습니다.');
            }
          });
      }
    } else {
      alert('로그인 하세요');
      history.push('/login');
    }
  };

  return (
    <div className="btn_subs">
      <button
        style={{
          backgroundColor: `${Subscribed ? '#cccccc' : '#cc0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={onSubscribe}
      >
        {SubscriberNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscriber;
