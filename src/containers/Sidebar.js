import React, { Component } from 'react';

import {observer} from 'mobx-react';

@observer
class Sidebar extends Component {
  render() {
    return (
        <div className="hs-sidebar">
            sidebar
        </div>
    );
  }
}

export default Sidebar;
