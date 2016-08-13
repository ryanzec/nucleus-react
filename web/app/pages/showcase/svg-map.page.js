import React from 'react';














var SvgMapTest = (ComposedComponent) => {
  class SvgMap extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        matrix: [1, 0, 0, 1, 0, 0],
        dragging: false,
      };

      this.onDragStart = this.onDragStart.bind(this);
      this.onDragMove = this.onDragMove.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
      this.onWheel = this.onWheel.bind(this);
    }

    onDragStart(e) {
      // Find start position of drag based on touch/mouse coordinates.
      const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
      const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

      // Update state with above coordinates, and set dragging to true.
      const state = {
        dragging: true,
        startX,
        startY,
      };

      this.setState(state);
    }

    onDragMove(e) {
      // First check if the state is dragging, if not we can just return
      // so we do not move unless the user wants to move
      if (!this.state.dragging) {
        return;
      }

      // Get the new x coordinates
      const positionX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
      const positionY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

      // Take the delta where we are minus where we came from.
      const deltaX = positionX - this.state.startX;
      const deltaY = positionY - this.state.startY;

      // Pan using the deltas
      this.pan(deltaX, deltaY);

      // Update the state
      this.setState({
        startX: positionX,
        startY: positionY,
      });
    }

    onDragEnd() {
      this.setState({
        dragging: false
      });
    }

    onWheel(e) {
      // if (e.deltaY < 0) {
      //   this.zoom(1.05);
      // } else {
      //   this.zoom(0.95);
      // }
    }

    pan(deltaX, deltaY) {
      const matrix = this.state.matrix;

      matrix[4] += deltaX;
      matrix[5] += deltaY;

      this.setState({
        matrix
      });
    }

    zoom(scale) {
      const matrix = this.state.matrix;
      const matrixLength = m.length;

      for (let i = 0; i < matrixLength; i++) {
        matrix[i] *= scale;
      }

      matrix[4] += (1 - scale) * this.props.width / 2;
      matrix[5] += (1 - scale) * this.props.height / 2;

      this.setState({
        matrix
      });
    }

    render() {
      const {
        height,
        width
      } = this.props;

      return (
        <svg
          height={height}
          width={width}
          onMouseDown={this.onDragStart}
          onTouchStart={this.onDragStart}
          onMouseMove={this.onDragMove}
          onTouchMove={this.onDragMove}
          onMouseUp={this.onDragEnd}
          onTouchEnd={this.onDragEnd}
          onWheel={this.onWheel}>
          <g transform={`matrix(${this.state.matrix.join(' ')})`}>
            <ComposedComponent
              {...this.props}
              pan={this.pan}
              zoom={this.zoom}
            ></ComposedComponent>
          </g>
        </svg>
      );
    }
  }

  SvgMap.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  };

  return SvgMap;
}

class MySvgMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseDownX: 0,
      mouseDownY: 0
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event) {
    const mouseDownX = typeof event.clientX === 'undefined' ? event.changedTouches[0].clientX : event.clientX;
    const mouseDownY = typeof event.clientY === 'undefined' ? event.changedTouches[0].clientY : event.clientY;

    this.setState({
      mouseDownX,
      mouseDownY,
    });
  }

  onMouseUp(event) {
    const endX = typeof event.clientX === 'undefined' ? event.changedTouches[0].clientX : event.clientX;
    const endY = typeof event.clientY === 'undefined' ? event.changedTouches[0].clientY : event.clientY;

    if (this.state.mouseDownX === endX && this.state.mouseDownY === endY) {
      console.log('test: ' + event.target.getAttribute('data-test'));
    }
  }

  render() {
    return (
      <g>
        <circle
          r="50"
          fill="teal"
          stroke="black"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          data-test="blah"
        ></circle>
        <rect
          height="100"
          width="100"
          fill="black"
          stroke="teal"
        ></rect>
      </g>
    );
  }
}

MySvgMap = SvgMapTest(MySvgMap);
































class SvgMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-showcase-svg-map">
        <h1>SVG Map</h1>
        <MySvgMap
          style={{border: '1px solid black'}}
          height={1000}
          width={1000}
        />
      </div>
    );
  }
}

SvgMapPage.displayName = 'SvgMapPage';

SvgMapPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SvgMapPage;
