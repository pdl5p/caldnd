import * as React from 'react';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';

class UnconnectedDraggable extends React.Component<any, any> {

    draggable: any;
    size: any;

  constructor(props) {
    super(props);

    const {x, y, zoom, changeCoord, ...rest} = props;

    this.state = {
      dragging: false,
    };
    this.size = 30;
  }

  render() {
    return (
      <g className={this.state.dragging ? "dragging" : "draggable"} 
        ref={(draggable) => { this.draggable = draggable; }}
        transform={`translate(${this.props.x},${this.props.y})`}>
        <rect x={-this.size/2} y={-this.size/2} width={this.size} height={this.size}/>
        <text x={this.size/2} y={-this.size/2} textAnchor="left" stroke="none">
          {`${this.props.x}, ${this.props.y}`} 
        </text>
      </g>
    );
  }
  
  componentDidMount() {
    const mouseEventToCoordinate = mouseEvent => ({x: mouseEvent.clientX, y: mouseEvent.clientY});
    const touchEventToCoordinate = touchEvent => {
      touchEvent.preventDefault();
      return {x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY};
    };
    
    // Event handling using Reactive JS
    let mouseDowns = Rx.Observable.fromEvent(this.draggable, "mousedown").map(mouseEventToCoordinate);
    let mouseMoves = Rx.Observable.fromEvent(window, "mousemove").map(mouseEventToCoordinate);
    let mouseUps = Rx.Observable.fromEvent(window, "mouseup");
    
    let touchStarts = Rx.Observable.fromEvent(this.draggable, "touchstart").map(touchEventToCoordinate);
    let touchMoves = Rx.Observable.fromEvent(this.draggable, "touchmove").map(touchEventToCoordinate);
    let touchEnds = Rx.Observable.fromEvent(window, "touchend");
    
    let dragStarts = mouseDowns.merge(touchStarts);
    let moves = mouseMoves.merge(touchMoves);
    let dragEnds = mouseUps.merge(touchEnds);
    
    let drags = dragStarts.concatMap(dragStartEvent => {
      const xDelta = this.props.x - dragStartEvent.x*this.props.zoom;
      const yDelta = this.props.y - dragStartEvent.y*this.props.zoom;
      return moves.takeUntil(dragEnds).map(dragEvent => {
        const x = dragEvent.x*this.props.zoom + xDelta;
        const y = dragEvent.y*this.props.zoom + yDelta;
        return {x, y};
      })
    });
    
    dragStarts.forEach(() => {
      this.setState({dragging: true});
    });
    
    drags.forEach(coordinate => {
      this.props.changeCoord(coordinate.x, coordinate.y);
    });
    
    dragEnds.forEach(() => {
      this.setState({dragging: false});
    });
  }
}

const mapStateToProps = ({ simpleDrag: state}, ownProps) => {
  return {
    zoom: state.zoom
  }
}

export default connect(mapStateToProps)(UnconnectedDraggable);