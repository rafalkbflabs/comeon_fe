import React, { createContext, useContext } from 'react';
import { useManageRewardPlan } from '../../hooks/useManageRewardPlan';
import { useProviderManageRewardPlan } from '../../hooks/useProviderManageRewardPlan';
import { BasicDataForm } from './components/BasicDataForm/BasicDataForm';
import { RevenueShareValues } from './components/RevenueShareValues/RevenueShareValues';

export const ManageRewardContext = createContext<ManageRewardContextData | null>(
  null
);

const ManageRewardProvider = ({ children }: { children: React.ReactNode }) => {
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
    await fetch('https://example.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
  };

  return (
    <>
      <BasicDataForm />
      <RevenueShareValues />
      <button
        type="button"
        onClick={() => sendData()}
        disabled={isDataEmpty}
      >
        Send Data
      </button>
    </>
  );
};
