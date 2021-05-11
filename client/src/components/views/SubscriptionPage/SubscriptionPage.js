import React, { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
function SubscriptionPage() {
  const { Title } = Typography;
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    let variables = { userFrom: localStorage.getItem('userId') };
    axios.post('/api/video/getSubscriptionVideo', variables).then((r) => {
      if (r.data.success) {
        setVideo(r.data.videos);
      } else {
        alert('비디오 가져오기를 실패 했습니다');
      }
    });
  }, []);
  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <a href={`/video/post/${video._id}`}>
          <div style={{ position: 'relative' }}>
            <img
              style={{ width: '100%' }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt=""
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: '3rem' }}>{video.views}views</span> -{' '}
        <span> {moment(video.createdAt).format('MMM Do YY')} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}>Subscription</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
