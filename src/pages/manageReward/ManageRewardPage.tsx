import React, { createContext } from 'react';
import { useProviderManageRewardPlan } from '../../hooks/useProviderManageRewardPlan';
import { BasicDataForm } from './components/BasicDataForm/BasicDataForm';

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
      <div>
        Revenue shate values
        {/* {criteria.length ? <p>Tabelka</p> : <p>Create</p>} */}
      </div>
    </ManageRewardProvider>
  );
};
