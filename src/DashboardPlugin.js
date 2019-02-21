import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import DashboardButton from './DashboardButton';
import Dashboard from './Dashboard';

export default class DashboardPlugin extends FlexPlugin {
  name = 'DashboardPlugin';

  init(flex, manager) {
    //adds the dashboard button to the navbar
    flex.SideNav.Content.add(<DashboardButton key='sidebardashboardbutton'/>);

    //adds the dashboard view
    flex.ViewCollection.Content.add(<flex.View name='dashboard' key='dashboard'><Dashboard key='dashboard'/></flex.View>);

  }
}
