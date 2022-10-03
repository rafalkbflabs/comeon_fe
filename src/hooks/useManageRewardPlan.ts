import { useContext } from 'react'
import { ManageRewardContext } from '../pages/manageReward/ManageRewardPage';

type Criteria = {
  product:  string;
  from: string;
  to: string;
  criterion: string;
  percantage: string;
}

export const useManageRewardPlan = () => {
  const manageRewardPlan = useContext(ManageRewardContext)

  if(!manageRewardPlan) {
    throw new Error('useManageRewardPlan must be used inside ManageRewardProvider');
  }

  return manageRewardPlan
}