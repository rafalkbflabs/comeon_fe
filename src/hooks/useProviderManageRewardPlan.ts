import { useState } from 'react'

export type Criteria = {
  product:  string;
  from: string;
  to: string;
  criterion: string;
  percantage: string;
}

export const useProviderManageRewardPlan = () => {
  const [name, setName] = useState('');
  const [criteria, setCriteria] = useState<Criteria[]>([]);


  return {
    name,
    setName,
    criteria,
    setCriteria
  }
}