import { Button, Col, Row } from 'antd';
import React, { createContext } from 'react';
import { useManageRewardPlan } from '../../hooks/useManageRewardPlan';
import { useProviderManageRewardPlan } from '../../hooks/useProviderManageRewardPlan';
import { BasicDataForm } from './components/BasicDataForm/BasicDataForm';
import { RevenueShareValues } from './components/RevenueShareValues/RevenueShareValues';
import './ManageRewardPageStyles.less';

export const ManageRewardContext = createContext<ManageRewardContextData | null>(
  null
);

export const ManageRewardProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useProviderManageRewardPlan();

  return (
    <ManageRewardContext.Provider value={value}>
      {children}
    </ManageRewardContext.Provider>
  );
};

type ManageRewardContextData = ReturnType<typeof useProviderManageRewardPlan>;

export const ManageRewardPage = () => {
  return (
    <ManageRewardProvider>
      <ManageRewardPageWrapper />
    </ManageRewardProvider>
  );
};

const ManageRewardPageWrapper = () => {
  const { name, criteria } = useManageRewardPlan();

  const data = {
    name,
    criteria,
  };

  const isDataEmpty = name === '' || criteria.length === 0;

  const sendData = async () => {
    try {
      await fetch('https://example.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
    } catch (e) {
      alert(JSON.stringify({ data }));
    }
  };

  return (
    <div className="manage-reward-page">
      <BasicDataForm />
      <RevenueShareValues />
      <Row>
        <Col span={6} offset={22}>
          <Button
            type="default"
            className="send-data"
            onClick={() => sendData()}
            disabled={isDataEmpty}
          >
            Send Data
          </Button>
        </Col>
      </Row>
    </div>
  );
};
