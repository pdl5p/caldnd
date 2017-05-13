import * as React from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import Draggable from './Draggable';

class UnconnectedComponent extends React.Component<any, any> {
  
  constructor(props) {
    super(props);
    const {x1, y1, x2, y2, setCoord1, setCoord2} = props;
  }

  render() {
    return (
      <div id='container'>
        <Canvas>
          <Draggable x={this.props.x1} y={this.props.y1} changeCoord={this.props.setCoord1}/>
          <Draggable x={this.props.x2} y={this.props.y2} changeCoord={this.props.setCoord2}/>
        </Canvas>
        <div className='code'>
          <p>Coord 1: {this.props.x1}, {this.props.y1}</p>
          <p>Coord 2: {this.props.x2}, {this.props.y2}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({simpleDrag: state}, ownProps) => {
  return {
    x1: state.x1,
    y1: state.y1,
    x2: state.x2,
    y2: state.y2
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCoord1: (x, y) => {
      dispatch({
        type: 'COORD1',
        x,
        y
      })
    },
    setCoord2: (x, y) => {
      dispatch({
        type: 'COORD2',
        x,
        y
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedComponent);