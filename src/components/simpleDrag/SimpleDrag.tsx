import * as React from 'react';
import { connect } from 'react-redux';

import Component from './Component';

class SimpleDrag extends React.Component<any, any> {

    render() {
        return (
            <Component />
        )
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SimpleDrag);