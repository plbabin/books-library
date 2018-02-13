import React, { Component } from 'react';

import {observer} from 'mobx-react';

@observer
class Sidebar extends Component {
  render() {
    return (
        <sidebar className="hs-sidebar">
            sidebar
        </sidebar>
    );
  }
}

export default Sidebar;
