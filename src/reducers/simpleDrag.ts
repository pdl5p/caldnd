

const initialState = {
  // Component specific state
  x1: 110,
  y1: 120,
  x2: 190,
  y2: 180,
  
  // Canvas and draggable specific state
  canvasWidth: 500,
  canvasHeight: 500,
  width: 400,
  height: 400,
  zoom: 1 
};

const reducer = (state = initialState, action) => {
  function overrideCoord(x, y) {
    x = Math.min(x, state.width);
    y = Math.min(y, state.height);
    x = Math.max(x, 0);
    y = Math.max(y, 0);
    x = Math.round(x);
    y = Math.round(y);
    return {x, y};
  }
  switch (action.type) {
    case 'COORD1': {
        const {x, y} = overrideCoord(action.x, action.y);
        return Object.assign({}, state, {
          x1: x,
          y1: y
        });
      }
    case 'COORD2': {
        const {x, y} = overrideCoord(action.x, action.y);
        return Object.assign({}, state, {
          x2: x,
          y2: y
        });
      }
    case 'RESIZE':
      const minSize = Math.min(action.width, action.height);
      if(minSize <= 500) {
        return Object.assign({}, state, {
          canvasWidth: minSize,
          canvasHeight: minSize,
          zoom: state.width/minSize
        });
      }else{
        return state;
      }
    default:
      return state;
    }
};

export default reducer;
export { reducer as simpleDrag };