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
import { authSelector, logoutUser } from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';

function Index({ match }: any) {
  const { data } = useSelector(authSelector);
  const { user } = data;
  const history = useHistory();

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  // State cleanup
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
    document.title = 'Dashboard';
  }, [user]);

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
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            // {
            //   className: 'trigger',
            //   onClick: toggle
            // }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Switch>
            <Route path={'/account'} exact={true} component={() => <Quiz />} />
            <Route
              path={'/account/quiz'}
              exact={true}
              component={() => <Quiz />}
            />
            <Route
              path={'/account/scoreboard'}
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
