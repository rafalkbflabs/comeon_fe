import React, { createContext } from 'react';
import { useProviderManageRewardPlan } from '../../hooks/useProviderManageRewardPlan';
import { BasicDataForm } from './components/BasicDataForm/BasicDataForm';
import { RevenueShareValues } from './components/RevenueShareValues/RevenueShareValues';

export const ManageRewardContext = createContext<ManageRewardContextData |  null>(null);

const ManageRewardProvider = ({ children }: {children: React.ReactNode}) => {
  const value = useProviderManageRewardPlan();

  return (
    <ManageRewardContext.Provider value={value}>{children}</ManageRewardContext.Provider>
  );
};

type ManageRewardContextData = ReturnType<typeof useProviderManageRewardPlan>

export const ManageRewardPage = () => {

  return (
    <ManageRewardProvider>
      <BasicDataForm />
      <RevenueShareValues />
    </ManageRewardProvider>
  );
};
