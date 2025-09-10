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

const student= {
  id: 'group-pages',
  title: <FormattedMessage id="Student" />,
  type: 'group',
  children: [
    {
      id: 'Student',
      title: <FormattedMessage id="Student" />,
      type: 'collapse',
      icon: icons.maintenance,
      breadcrumbs: false,
      children: [
        {
          id: 'Students',
          title: <FormattedMessage id="Add Student" />,
          type: 'item',
          url: '/student/create',
      breadcrumbs: false,

          // target: true
        },
        {
          id: 'student',
          title: <FormattedMessage id="Student List" />,
          type: 'item',
          url: '/student/list',
      breadcrumbs: false,

          // target: true
        },
        
          
      ]
    },
   
  ]
};

export default student;
// 'Profile Information'