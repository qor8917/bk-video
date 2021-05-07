import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import Form from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';

const PrivateOption = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const CategoryOption = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');
  const [thunmbnaliPath, setthunmbnaliPath] = useState('');
  const [Duration, setDuration] = useState('');
  const [FilePath, setFilePath] = useState('');
  const onChangeTitle = (e) => {
    const { value } = e.target;
    setVideoTitle(value);
  };
  const onChangeDesc = (e) => {
    const { value } = e.target;
    setDescription(value);
  };
  const onChangePrivate = (e) => {
    const { value } = e.target;
    setPrivate(value);
  };
  const onChangeCate = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  const onDrop = (files) => {
    //ajax를 통해 이미지 업로드
    let formData = new FormData();
    formData.append('file', files[0]);
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    axios.post('/api/video/uploadfiles', formData, config).then((r) => {
      if (r.data.success) {
        let variables = {
          url: r.data.url,
          fileName: r.data.fileName,
        };

        setFilePath(r.data.url);

        axios.post('/api/video/thumbnail', variables).then((r) => {
          if (r.data.success) {
            setDuration(r.data.fileDuration);
            setthunmbnaliPath(r.data.url);
          } else {
            alert('썸네일 생성에 실패 했습니다.');
          }
        });
      } else {
        alert('비디오 업로드를 실패 했습니다.');
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      catogory: Category,
      duration: Duration,
      thumbnail: thunmbnaliPath,
    };
    axios.post('/api/video/uploadVideo', variables).then((r) => {
      if (r.data.success) {
        message.success('성공적으로 업로드 했습니다');
        setTimeout(() => {
          props.history.push('/');
        }, 2000);
      } else {
        alert('비디오 업로드에 실패 하였습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {/* Thumnail */}
          {thunmbnaliPath && (
            <div>
              <img
                src={`http://3.35.64.50:5000/${thunmbnaliPath}`}
                alt="thumbNail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label htmlFor="">Title</label>
        <Input onChange={onChangeTitle} />
        <br />
        <br />
        <label htmlFor="">Description</label>
        <TextArea onChange={onChangeDesc} />
        <br />
        <br />
        <select onChange={onChangePrivate}>
          {PrivateOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onChangeCate}>
          {CategoryOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
