import './App.less';
import { Layout } from 'antd';
import { ManageRewardPage } from './pages/ManageRewardPage/ManageRewardPage';

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header className="header">Manage Reward Plan</Header>
      <Content>
        <ManageRewardPage />
      </Content>
    </Layout>
  );
}

export default App;
