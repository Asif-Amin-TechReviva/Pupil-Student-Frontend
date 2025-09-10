// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I24Support, MessageProgramming } from 'iconsax-react';
import { School } from '@mui/icons-material';

// type

// icons
// icons
const icons = {
  // maintenance: MessageProgramming,
  academics: School,
  contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const Academics= {
  id: 'group-pages',
  // title: <FormattedMessage id="Academics" />,
  type: 'group',
  children: [
    {
      id: 'Academics',
      title: <FormattedMessage id="Academics" />,
      type: 'collapse',
      icon: icons.academics,
      children: [
        {
          id: 'View Assignments',
          title: <FormattedMessage id="Assignments" />,
          type: 'item',
          url: '/academics/view-assignments',
          breadcrumbs: false,

          // target: true
        },
        // {
        //   id: 'Exams And Grades',
        //   title: <FormattedMessage id="Exams And Grades" />,
        //   type: 'item',
        //   url: '/academics/view-grades',
        //   breadcrumbs: false,
        //   // target: true
        // },
        {
          id: 'Grades',
          title: <FormattedMessage id="Grades" />,
          type: 'item',
          url: '/academics/grades',
          breadcrumbs: false,
          // target: true
        },
        {
          id: 'Exams',
          title: <FormattedMessage id="Exams" />,
          type: 'item',
          url: '/academics/exams',
          breadcrumbs: false,
          // target: true
        },
        // {
        //   id: 'Bulk Edit',
        //   title: <FormattedMessage id="Bulk Edit" />,
        //   type: 'item',
        //   url: '/cashier/bulk-edit',
        //   // target: true
        // },
       
        
          
      ]
    },
   
  ]
};

export default Academics;
