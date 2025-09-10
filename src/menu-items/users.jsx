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

const users= {
  id: 'group-pages',
  title: <FormattedMessage id="users" />,
  type: 'group',
  children: [
    {
      id: 'Users',
      title: <FormattedMessage id="Users" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'Students',
          title: <FormattedMessage id="Students" />,
          type: 'item',
          url: '/users/students',
          // target: true
        },
        {
          id: 'Teachers',
          title: <FormattedMessage id="Teachers" />,
          type: 'item',
          url: '/users/teachers',
          // target: true
        },
        {
            id: 'Cashiers',
            title: <FormattedMessage id="Cashiers" />,
            type: 'item',
            url: '/cashier/cashier-list',
            // target: true
          },
          
      ]
    },
   
  ]
};

export default users;
