import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="1">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/subscription">Subscription</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
