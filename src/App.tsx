import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';
import { ManageRewardPage } from './pages/manageReward/ManageRewardPage';

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header className="header">Manage Reward Plan</Header>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <ManageRewardPage />
          
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
