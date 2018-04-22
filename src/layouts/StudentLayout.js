import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { getRoutes } from '../utils/utils';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import Authorized from '../utils/Authorized';
import logo from '../assets/logo.svg';
import GlobalHeader from '../components/GlobalHeader';

const { Header, Content, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

const style = {
  logo: {
    width: '32px',
    display: 'inline',
  },
  avatar: {
    width: '32px',
  },
};

class StudentLayout extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
    } = this.props;
    console.log('student location', location);
    return (
      <Layout className="layout">
        <Header style={{ padding: 0 }}>
          <GlobalHeader
            pathname={location.pathname}
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            hideCollapseIcon={true}
            showLogo={true}
            />
        </Header>
        {/* <Header style={{ height: '65px' }}>
          <Row style={{ height: '63px' }} type="flex" justify="space-between">
            <Col span={2} >
              <img style={style.logo} src={logo} />
            </Col>
            <Col span={20}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">
                  <Link
                    to={'/student/buy'}
                  >我是买家</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link
                    to={'/student/sell'}
                  >我是卖家</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={2}>
              <img style={style.avatar} src={logo} />
            </Col>
          </Row>
        </Header> */}
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '16px 0' }}></div>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {getRoutes(match.path, routerData).map(item => (
              // item.component
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/exception/403"
              />
            ))}
          </div>
          {/* <Redirect exact from="/" to={'/student/buy'} /> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Made with Ant Design
    </Footer>
      </Layout>)
  }
}
export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(StudentLayout);