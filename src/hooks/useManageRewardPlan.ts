import { useContext } from 'react'
import { ManageRewardContext } from '../pages/manageReward/ManageRewardPage';

export const useManageRewardPlan = () => {
  const manageRewardPlan = useContext(ManageRewardContext)

  if(!manageRewardPlan) {
    throw new Error('useManageRewardPlan must be used inside ManageRewardProvider');
  }

  return manageRewardPlan
}