import * as React from 'react';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';

class UnconnectedCanvas extends React.Component<any, any> {

  constructor(props) {
    super(props);
    
    const {canvasWidth, canvasHeight, width, height, resize} = props;
  }
  
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        width={this.props.canvasWidth} height={this.props.canvasHeight} 
        viewBox={`0 0 ${this.props.width} ${this.props.height}`} >
        {this.props.children}
      </svg>
    );
  }
  
  componentDidMount() {
    let resize = Rx.Observable.fromEvent(window, 'resize').map(() => ({
      width: window.innerWidth, 
      height: window.innerHeight
    }));
    
    resize.forEach(({width, height}) => {
      this.props.resize(width, height);
    });
  }
}

const mapStateToProps = ({ simpleDrag: state }, ownProps) => {
  return {
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    width: state.width,
    height: state.height
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resize: (width, height) => {
      dispatch({
        type: 'RESIZE',
        width,
        height
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedCanvas);
