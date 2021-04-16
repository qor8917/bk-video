import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

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

function VideoUploadPage() {
  const [Text, setText] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const onChangePrivate = (e) => {
    const { value } = e.target;
    setPrivate(value);
  };
  const onChangeDesc = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone>
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
          <div>
            <img src="" alt="" />
          </div>
        </div>
        <br />
        <br />
        <label htmlFor="">Title</label>
        <Input onChange={onChange} />
        <br />
        <br />
        <label htmlFor="">Description</label>
        <TextArea onChange={onChange} />
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
        <select onChange={onChangeDesc}>
          {CategoryOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
