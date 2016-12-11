import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/social/person';

const NavigationBar = (props) => (
  <AppBar
    title={props.title || 'Home'}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><Person /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Log out" onTouchTap={props.onLogout} />
      </IconMenu>
    }
    showMenuIconButton={false}
  />
);

export default NavigationBar;
