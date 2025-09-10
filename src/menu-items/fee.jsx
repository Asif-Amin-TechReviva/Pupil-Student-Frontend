// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I24Support, MessageProgramming ,Bank} from 'iconsax-react';
import { color } from '@mui/system';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support,
  bank : Bank
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const Fee= {
  id: 'group-pages',
  // title: <FormattedMessage id="fee" />,
  type: 'group',
  children: [
    {
      id: 'fee',
      title: <FormattedMessage id="Fee" />,
      type: 'collapse',
      icon: icons.bank,
      children: [
        {
          id: 'Fee-Enquiry',
          title: <FormattedMessage id="All-Payments" />,
          type: 'item',
          url: '/fee/all-payments',
          breadcrumbs: false,

          // target: true
        },  {
          id: 'Fee-Enquiry',
          title: <FormattedMessage id="Pay-Online" />,
          type: 'item',
          url: '/fee/online-payments',
          breadcrumbs: false,

          // target: true
        },   
      ]
    },
   
  ]
};

export default Fee;
