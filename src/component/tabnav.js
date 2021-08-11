import React from 'react';
import ReactDOM from 'react-dom';

class TabNav extends React.Component {
  render() {
    return (
      <div style={{ width: '100%',height: '90%' }}>
        <ul className="nav nav-tabs">
          {

            this.props.tabs.map(tab => {
              const active = (tab === this.props.selected ? 'active ' : '');
              return (
                <li style={{ cursor: 'pointer' }}  className="nav-item" key={tab}>
                  <a className={"nav-link " + active } onClick={ () => this.props.setSelected(tab) }>
                    {tab}
                  </a>
                </li>
              );
            })

          }

        </ul>
        {this.props.children}
      </div>
    );
  }
}
export default TabNav;