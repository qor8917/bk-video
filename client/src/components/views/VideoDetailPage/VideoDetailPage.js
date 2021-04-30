import { Col, List, Row, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);
  useEffect(() => {
    axios.post('/api/video/getVideoDetail', variable).then((r) => {
      if (r.data.success) {
        setVideoDetail(r.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오기를 실패 했습니다.');
      }
    });
  }, []);

  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe userTo={VideoDetail.writer._id} />
    );
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', padding: '3rem' }}>
            <video
              style={{ width: '100%' }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                description={VideoDetail.description}
              />
            </List.Item>
            {/* comments */}
            <Comment postId={videoId} />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default VideoDetailPage;
