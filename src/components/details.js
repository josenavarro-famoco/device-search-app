import React, { Component } from 'react';
import './details.css';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
// import Map from './map';

class Details extends Component {

  renderObject = (object) => {
    return (
      <List>
        <ListItem
          primaryText="Famoco ID"
          secondaryText={object.get('famoco_id', '---')}
        />
        <ListItem
          primaryText="Organization"
          secondaryText={object.getIn(['organization', 'name'], '---')}
        />
      {/*<ListItem
          primaryText="IMEI"
          secondaryText={object.getIn(['hardware_details', 'imei'], '---')}
        />
        <ListItem
          primaryText="Wifi MAC"
          secondaryText={object.getIn(['hardware_details', 'wifi_mac'], '---')}
        />
        <ListItem
          primaryText="Bluetooth MAC"
          secondaryText={object.getIn(['hardware_details', 'bluetooth_mac'], '---')}
        />
        <ListItem
          primaryText="Model"
          secondaryText={object.getIn(['hardware_details', 'model'], '---')}
        />
        <ListItem
          primaryText="Batch"
          secondaryText={object.getIn(['hardware_details', 'batch'], '---')}
        />
        <ListItem
          primaryText="OS Version"
          secondaryText={object.getIn(['state_details', 'os_version'], '---')}
        />
        <ListItem
          primaryText="Last Sync"
          secondaryText={object.getIn(['state_details', 'last_sync'], '---')}
        />
        <ListItem
          primaryText="Sync Status"
          secondaryText={object.getIn(['state_details', 'sync_status'], '---')}
        /> */}
      </List>
    );
  }

  renderContent = (value) => {
    switch (typeof value) {
      case 'string':
        return value;
      case 'object':
        return this.renderObject(value);
      default:
        return value;
    }
  }

  render() {
    return (
      <Paper className="details-container" >
        {this.renderContent(this.props.details)}
      </Paper>
    );
  }
}

export default Details;
