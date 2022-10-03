import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header className="header">HEADER</Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
