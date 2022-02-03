/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router';
import './dashboard.css';
import Quiz from '../quiz/index.lazy';
import ScoreBoard from '../scoreboard/index.lazy';
import Home from '../home/Index.lazy';
import Sidebar from '../../layout/sidebar/sidebar.lazy';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Avatar, Image } from 'antd';

import { authSelector, fetchUser } from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

function Index({ match }: any) {
  const { data } = useSelector(authSelector);
  const { user } = data;
  const history = useHistory();
  const dispatch = useDispatch();

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  // client-side
  const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  //   socket.on('hello', (args) => {
  //     console.log(args);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Socket disconnected');
  //     console.log(socket.id); // undefined
  //   });

  useEffect(() => {
    // dispatch(fetchUser(''));
    document.title = 'Dashboard';
  }, []);

  // State cleanup
  //   useEffect(() => {
  //     if (!user) {
  //       history.push('/login');
  //     }
  //   }, [user]);

  return (
    // <div className='row dashboard'>
    //   <div className='col-lg-2  col-12 pr-0'>
    //     {' '}
    //     <Sidebar />
    //   </div>
    //   <div className='col-lg-10 col-12'>
    //     <div className='dashboard-header'>

    // 	</div>
    //     <Switch>
    //       <Route path={'/account'} exact={true} component={() => <Quiz />} />
    //       <Route
    //         path={'/account/quiz'}
    //         exact={true}
    //         component={() => <Quiz />}
    //       />
    //       <Route
    //         path={'/account/scoreboard'}
    //         exact={true}
    //         component={() => <ScoreBoard />}
    //       />
    //     </Switch>
    //   </div>
    // </div>
    <Layout>
      <Sidebar />
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => toggle
            }
          )}

          <div className='mr-4'>
            {console.log(user)}
            {user?.firstname}
            <Avatar
              src={
                <Image
                  src='https://joeschmoe.io/api/v1/male/random'
                  style={{ width: 32 }}
                />
              }
            />
          </div>
        </Header>
        <Content
          className='site-layout-background content'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Switch>
            <Route path={'/account'} exact={true} component={() => <Quiz />} />
            <Route path={'/quiz'} component={() => <Quiz />} />
            <Route
              path={'/scoreboard'}
              exact={true}
              component={() => <ScoreBoard />}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Index;
