import { useState } from 'react';

import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Home, EnhancedEncryption } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    color: '#f44336',
  },
}));

export const NavigationBar = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  return (
    <BottomNavigation
      style={{
        background: '#262525',
      }}
      value={activePage}
      onChange={(event, newPage) => {
        setActivePage(newPage);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} icon={<Home />} to="/bank" />
      <BottomNavigationAction component={Link} icon={<EnhancedEncryption />} to="/bank/crypto" />
    </BottomNavigation>
  );
};
