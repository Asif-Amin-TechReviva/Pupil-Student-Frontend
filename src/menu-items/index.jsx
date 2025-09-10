// // project-imports
// import applications from './applications';
// import widget from './widget';
// import formsTables from './forms-tables';
// import samplePage from './sample-page';
// import chartsMap from './charts-map';
// import support from './support';
// import pages from './pages';

import Home from './home';
import Fee from './fee';
import Academics from './academics';
import ResourceSharing from './resource-sharing';
import Communication from './communication';
import BusCancelation from './busCancelation';
import AttendanceAndLeave from './attendanceAndLeave';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [Fee, Academics,AttendanceAndLeave ]
  // items: [Home, Fee, Academics, ResourceSharing, Communication, BusCancelation]
};
//Fee,ResourceSharing, Communication, BusCancelation
export default menuItems;
