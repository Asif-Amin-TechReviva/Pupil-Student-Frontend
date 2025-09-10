import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { Card, Edit2, Logout, Profile, Profile2User } from 'iconsax-react';

export default function ProfileTab({ handleLogout ,handleClose}) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Set initial selectedIndex based on current route
    if (location.pathname.includes('/apps/profiles/account/basic')) return 0;
    if (location.pathname.includes('/apps/profiles/user/personal')) return 1;
    if (location.pathname.includes('/apps/profiles/account/password')) return 3;
    return '';
  });
  const handleListItemClick = (event, index, route = '') => {
    event.stopPropagation();
    setSelectedIndex(index);

    if (route) {
      navigate(route);
    }
    handleClose();
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>  
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0, '/apps/profiles/account/basic')}>
        <ListItemIcon>
          <Profile variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3, '/apps/profiles/account/password')}>
        <ListItemIcon>
          <Profile2User variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <Logout variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
