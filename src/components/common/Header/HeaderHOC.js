import React, { Component } from 'react';
import Header from './Header';

const HeaderHoc = (WrappedComponent) => {
  return class HeaderHoc extends Component {
    render () {
      return (
        <React.Fragment> 
          <Header headerText={this.props.scene.descriptor.options.title}/>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      )
    }
  }
}
export default HeaderHoc;
