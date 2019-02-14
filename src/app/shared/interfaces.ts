export interface Contract {
  id: number;
  taskName: string;
  owner: string;
  createdDateTime: Date;
  expectedDate: string;
  expectedTime: string;
  status: string;
  define: string;
  expectations: string;
  actions: string;
  timeline: string;
  stakes: string;
  renegotiation: string;
  closedDate: string;
  closedTime: string;
  quality: number;
  lessons: string;
}

export interface ContractResolved {
  contract: Contract;
  error?: any;
}

export interface ContractListResolved {
  contracts: Contract[];
  error?: any;
}
