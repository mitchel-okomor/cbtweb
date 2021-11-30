import React, { useState } from 'react';
import './sidebar.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { logoutUser } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Index() {
  const dispatch = useDispatch();

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const items = [
    { title: 'dashboad', url: '/dashboard', icon: <UserOutlined /> },
    { title: 'quiz', url: '/quiz', icon: <UserOutlined /> },
    { title: 'Quiz history', url: '/quiz-history', icon: <UserOutlined /> },
    { title: 'score board', url: '/scoreboard', icon: <UserOutlined /> },
    { title: 'Game', url: '/game', icon: <UserOutlined /> },
    { title: 'Game history', url: '/game-history', icon: <UserOutlined /> },
    { title: 'levels', url: '/dashboard', icon: <UserOutlined /> },
    { title: 'settings', url: '/settings', icon: <UserOutlined /> },
    { title: 'logout', url: '/login', icon: <UserOutlined /> }
  ];

  return (
    // <div className='sidebar p-3'>
    //   <div>
    //     <h2>QUIZ APP</h2>
    //   </div>

    //   <div className='side-menu'>
    //     <h4>Menu</h4>
    //     <ul>
    //       {items.map((item: any) => (
    //         <li key={item.title}>{item.title}</li>
    //       ))}
    //     </ul>
    //   </div>

    //   <div>
    //     <h4>Account</h4>
    //   </div>
    // </div>

    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='logo text-white font-weigth-bold p-4'>BOSKI QUIZ</div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        {items.map((item: any) => {
          if (item.title === 'logout') {
            return (
              <Menu.Item
                key={item.title}
                icon={item.icon}
                onClick={() => dispatch(logoutUser())}
              >
                <NavLink to={item.url}>{item.title.toUpperCase()}</NavLink>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item key={item.title} icon={item.icon}>
                <NavLink to={item.url}>{item.title.toUpperCase()}</NavLink>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
}

export default Index;
