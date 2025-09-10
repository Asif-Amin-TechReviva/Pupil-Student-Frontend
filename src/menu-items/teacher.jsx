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

const teacher= {
  id: 'group-pages',
  title: <FormattedMessage id="Teacher" />,
  type: 'group',
  children: [
    {
      id: 'Teacher',
      title: <FormattedMessage id="Teacher" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'Teacher',
          title: <FormattedMessage id="Add Teacher" />,
          type: 'item',
          url: '/teacher/add-teacher',
          // target: true
        },
        {
          id: 'list',
          title: <FormattedMessage id="Teacher List" />,
          type: 'item',
          url: '/teacher/teacher-list',
          // target: true
        },
        
          
      ]
    },
   
  ]
};

export default teacher;
