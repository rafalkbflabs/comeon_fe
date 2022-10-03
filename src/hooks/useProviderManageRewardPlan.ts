import { useState } from 'react'

type Criteria = {
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