export interface BillingRecord {
  statementsID: string;
  date: string;
  name: string;
  details: string;
  totalAmount: string;
}

export const BILLS: BillingRecord[] = [
  {
    statementsID: 'PES10015',
    date: '03 May, 2024',
    name: 'Joyce Perry',
    details: 'Project Management',
    totalAmount: '$15,236',
  },
  {
    statementsID: 'PES10016',
    date: '04 May, 2024',
    name: 'Marilyn Ecklund',
    details: 'Chat Web Design',
    totalAmount: '$8,563',
  },
  {
    statementsID: 'PES10017',
    date: '08 May, 2024',
    name: 'Todd Day',
    details: 'PayPayl Charges',
    totalAmount: '$244.5',
  },
  {
    statementsID: 'PES10018',
    date: '11 May, 2024',
    name: 'Mary Diaz',
    details: 'Advanced Pay',
    totalAmount: '$36,322',
  },
  {
    statementsID: 'PES10019',
    date: '27 May, 2024',
    name: 'Betty Gilliam',
    details: 'Admin & Dashboards',
    totalAmount: '$11,741',
  },
  {
    statementsID: 'PES10020',
    date: '05 June, 2024',
    name: 'Robert Olsen',
    details: 'Admin & Dashboards',
    totalAmount: '$13,465',
  },
  {
    statementsID: 'PES10021',
    date: '09 June, 2024',
    name: 'Shirley Elsea',
    details: 'Logo Design',
    totalAmount: '$478.69',
  },
  {
    statementsID: 'PES10022',
    date: '15 June, 2024',
    name: 'Amelia Denehy',
    details: 'App Landing Page',
    totalAmount: '$1,458',
  },
  {
    statementsID: 'PES10023',
    date: '17 June, 2024',
    name: 'Zac Bethel',
    details: 'Crypto Coin',
    totalAmount: '$14,786',
  },
  {
    statementsID: 'PES10024',
    date: '24 June, 2024',
    name: 'Leo Kemp',
    details: 'Admin & Dashboards',
    totalAmount: '$3,499',
  },
  {
    statementsID: 'PES10022',
    date: '15 June, 2024',
    name: 'Amelia Denehy',
    details: 'App Landing Page',
    totalAmount: '$1,458',
  },
  {
    statementsID: 'PES10023',
    date: '17 June, 2024',
    name: 'Zac Bethel',
    details: 'Crypto Coin',
    totalAmount: '$14,786',
  },
];
