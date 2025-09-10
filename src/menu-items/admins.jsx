// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I24Support, MessageProgramming } from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const admin = {
  id: 'group-pages',
  title: <FormattedMessage id="Admin" />,
  type: 'group',
  children: [
    {
      id: 'Admin',
      title: <FormattedMessage id="Admin" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'AddCashier',
          title: <FormattedMessage id="Add Cashier" />,
          type: 'item',
          url: '/admin/add-cashier',
          // target: true
        },
        {
          id: 'List',
          title: <FormattedMessage id="List" />,
          type: 'item',
          url: '/admin/list',
          // target: true
        },
       
          
      ]
    },
    
  ]
};

export default admin;
