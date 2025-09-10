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

const payments= {
  id: 'group-pages',
  title: <FormattedMessage id="Payments" />,
  type: 'group',
  children: [
    {
      id: 'fee-enquiry',
      title: <FormattedMessage id="Payments" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'Fee Enquiry',
          title: <FormattedMessage id="Fee-Enquiry" />,
          type: 'item',
          url: '/payments/fee-enquiry',
          // target: true
        },   
      ]
    },
   
  ]
};

export default payments;