import * as React from 'react';

import { SideLink, Actions } from '@twilio/flex-ui';

export default class DashboardButton extends React.Component{

    render() {
        return <SideLink
            {...this.props}
            icon='Dashboard'
            iconActive='DashboardBold'
            isActive={this.props.activeView === 'dashboard'}
            onClick={() => Actions.invokeAction('NavigateToView', {viewName: 'dashboard'})}>Realtime Dashboard</SideLink>
            ;
    }
}
