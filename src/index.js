import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

class ReactCarouselDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'forwards',
      bigDots: this.getNewBigDots(props),
      changed: false,
      changeCount: 0,
      translate: 0,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { active } = this.props;
    const { direction: directionState, changed, changeCount } = this.state;
    let newBigDots = [];

    let direction = directionState;
    if (nextProps.active !== active) {
      direction = nextProps.active > active ? 'forwards' : 'backwards';
    }

    if (nextProps.active > active) {
      // Forwards
      if (nextProps.length - 3 < nextProps.active) {
        this.setState({
          translate:
            (nextProps.length - (nextProps.visible + 1)) *
            (nextProps.dotHolderWidth + 2 * nextProps.margin),
        });
      }
      if (direction === 'forwards') {
        // Dir doesnt change
        if (changed) {
          // If there was a recent change increment the counter
          if (changeCount >= nextProps.visible - 4 - (nextProps.visible % 2)) {
            // If we reached the limit, remove the changed
            newBigDots = this.getNewBigDots(nextProps, false);
            this.setState({
              bigDots: newBigDots,
              direction: 'forwards',
              changed: false,
              changeCount: 0,
            });
          } else {
            // Else increment the counter
            newBigDots = this.getNewBigDots(nextProps, true);
            this.setState({
              bigDots: newBigDots,
              direction: 'forwards',
              changed: true,
              changeCount: changeCount + 1,
            });
          }
        } else {
          // Simply set the direction and the transform
          newBigDots = this.getNewBigDots(nextProps, false);

          this.setState({
            bigDots: newBigDots,
            translate:
              (nextProps.active - (nextProps.visible - 2)) *
              (nextProps.dotHolderWidth + 2 * nextProps.margin),
            direction: 'forwards',
          });
        }
      } else if (direction === 'backwards') {
        // Change happened in the direction
        if (nextProps.visible > 4) {
          newBigDots = this.getNewBigDots(nextProps, true);
          this.setState({
            bigDots: newBigDots,
            direction: 'forwards',
            changed: true,
            changeCount: changeCount + 1,
          });
        } else {
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ bigDots: newBigDots, direction: 'forwards' });
        }
      }
    } else if (nextProps.active < active) {
      // Backwards
      if (nextProps.length - nextProps.visible < nextProps.active) {
        this.setState({
          bigDots: newBigDots,
          translate:
            (nextProps.length - (nextProps.visible + 1)) *
            (nextProps.dotHolderWidth + 2 * nextProps.margin),
        });
      }
      if (direction === 'backwards') {
        // Dir doesnt change
        if (changed) {
          // If there was a recent change increment the counter
          if (changeCount >= nextProps.visible - 4 - (nextProps.visible % 2)) {
            // If we reached the limit, remove the changed
            newBigDots = this.getNewBigDots(nextProps, false);
            this.setState({
              bigDots: newBigDots,
              direction: 'backwards',
              changed: false,
              changeCount: 0,
            });
          } else {
            // Else increment the counter
            newBigDots = this.getNewBigDots(nextProps, true);
            this.setState({
              bigDots: newBigDots,
              direction: 'backwards',
              changed: true,
              changeCount: changeCount + 1,
            });
          }
        } else {
          // Simply set the direction and the transform
          newBigDots = this.getNewBigDots(nextProps, false);

          this.setState({
            bigDots: newBigDots,
            translate:
              (nextProps.active - 2) *
              (nextProps.dotHolderWidth + 2 * nextProps.margin),
            direction: 'backwards',
          });
        }
      } else if (direction === 'forwards') {
        // Change happened in the direction
        if (nextProps.visible > 4) {
          newBigDots = this.getNewBigDots(nextProps, true);
          this.setState({
            bigDots: newBigDots,
            direction: 'backwards',
            changed: true,
            changeCount: changeCount + 1,
          });
        } else {
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ direction: 'backwards', bigDots: newBigDots });
        }
      }
    }
  };

  getNewBigDots = (nextProps, changed) => {
    const { active } = this.props;
    const { bigDots } = this.state || {};

    let newBigDots = [];
    if (nextProps.active >= active) {
      if (nextProps.visible % 2 === 1) {
        if (nextProps.active < nextProps.visible - 2) {
          let visibleDots = nextProps.visible - 1;
          if (nextProps.removeSmallDots) {
            visibleDots += 1;
          }

          for (let j = 0; j < visibleDots + 1; j += 1) {
            newBigDots.push(j);
          }
        } else if (nextProps.active === nextProps.visible - 2) {
          let j = 0;
          for (j = 0; j < nextProps.visible; j += 1) {
            newBigDots.push(j);
          }
        } else if (nextProps.length - 4 < nextProps.active) {
          for (
            let j = nextProps.length - nextProps.visible;
            j < nextProps.length;
            j += 1
          ) {
            newBigDots.push(j);
          }
        } else if (!changed) {
          for (
            let j = nextProps.active - (nextProps.visible - 3);
            j < nextProps.active + 2;
            j += 1
          ) {
            newBigDots.push(j);
          }
        } else {
          newBigDots = bigDots;
        }
      } else if (nextProps.active < nextProps.visible - 2) {
        let visibleDots = nextProps.visible - 1;
        if (nextProps.removeSmallDots) {
          visibleDots += 1;
        }

        for (let j = 0; j < visibleDots; j += 1) {
          newBigDots.push(j);
        }
      } else if (nextProps.active === nextProps.visible - 2) {
        for (let j = 0; j < nextProps.visible; j += 1) {
          newBigDots.push(j);
        }
      } else if (nextProps.length - 4 < nextProps.active) {
        for (
          let j = nextProps.length - nextProps.visible;
          j < nextProps.length;
          j += 1
        ) {
          newBigDots.push(j);
        }
      } else if (!changed) {
        for (
          let j = nextProps.active - (nextProps.visible - 3);
          j < nextProps.active + 2;
          j += 1
        ) {
          newBigDots.push(j);
        }
      } else {
        newBigDots = bigDots;
      }
    } else if (nextProps.visible % 2 === 1) {
      if (nextProps.active < nextProps.visible - (nextProps.visible - 3)) {
        let visibleDots = nextProps.visible - 1;
        if (nextProps.removeSmallDots) {
          visibleDots += 1;
        }

        for (let j = 0; j <= visibleDots; j += 1) {
          newBigDots.push(j);
        }
      } else if (nextProps.length - nextProps.visible < nextProps.active) {
        for (
          let j = nextProps.length - nextProps.visible;
          j < nextProps.length;
          j += 1
        ) {
          newBigDots.push(j);
        }
      } else if (!changed) {
        for (
          let j = nextProps.active - 1;
          j < nextProps.active + (nextProps.visible - 2);
          j += 1
        ) {
          newBigDots.push(j);
        }
      } else {
        newBigDots = bigDots;
      }
    } else if (nextProps.active < 3) {
      let visibleDots = nextProps.visible - 1;
      if (nextProps.removeSmallDots) {
        visibleDots += 1;
      }

      for (let j = 0; j < visibleDots; j += 1) {
        newBigDots.push(j);
      }
    } else if (nextProps.length - 4 < nextProps.active) {
      for (
        let j = nextProps.length - nextProps.visible;
        j < nextProps.length;
        j += 1
      ) {
        newBigDots.push(j);
      }
    } else if (!changed) {
      for (
        let j = nextProps.active - 1;
        j < nextProps.active + (nextProps.visible - 2);
        j += 1
      ) {
        newBigDots.push(j);
      }
    } else {
      newBigDots = bigDots;
    }

    return newBigDots;
  };

  getDotStyle = (index, dotClassName) => {
    const {
      active, dotHolderHeight, dotHolderWidth, margin, length, visible,
    } =
      this.props;
    const { changed, direction, translate } = this.state;

    let style = {
      height: dotHolderHeight,
      width: dotHolderWidth,
      marginRight: margin,
      marginLeft: margin,
    };

    if (direction === 'forwards') {
      if (active < visible - 2) {
        style = {
          ...style,
        };
      } else if (length - 3 < active) {
        style = {
          ...style,
          transform: `translateX(-${
            (length - (visible + 1)) * (dotHolderWidth + 2 * margin)
          }px)`,
        };
      } else if (!changed) {
        style = {
          ...style,
          transform: `translateX(-${
            (active - (visible - 2)) * (dotHolderWidth + 2 * margin)
          }px)`,
        };
      } else {
        style = {
          ...style,
          transform: `translateX(-${translate}px)`,
        };
      }
    } else if (active < 2) {
      style = {
        ...style,
      };
    } else if (length - visible < active) {
      style = {
        ...style,
        transform: `translateX(-${
          (length - (visible + 1)) * (dotHolderWidth + 2 * margin)
        }px)`,
      };
    } else if (!changed) {
      style = {
        ...style,
        transform: `translateX(-${
          (active - 2) * (dotHolderWidth + 2 * margin)
        }px)`,
      };
    } else {
      style = {
        ...style,
        transform: `translateX(-${translate}px)`,
      };
    }

    if (dotClassName === 'small') {
      if (index <= active) {
        style = {
          ...style,
          justifyContent: 'right',
        };
      } else {
        style = {
          ...style,
          justifyContent: 'left',
        };
      }
    }

    return style;
  };

  getHolderStyle = () => {
    const {
      dotHolderHeight, dotHolderWidth, margin, visible,
    } = this.props;

    return {
      height: dotHolderHeight,
      width: (visible + 1) * (dotHolderWidth + margin * 2),
    };
  };

  getDotClassName = (index) => {
    const { removeSmallDots } = this.props;
    const { bigDots } = this.state;

    if (bigDots.includes(index) || removeSmallDots) {
      return '';
    }

    return 'small';
  };

  getDots = () => {
    const {
      active, length, dotStyle, smallDotStyle, activeStyle, onClick,
    } =
      this.props;
    const dots = [];
    for (let i = 0; i < length; i += 1) {
      const dotClassName = this.getDotClassName(i);
      let cumulativeDotStyle = {
        ...dotStyle,
        ...(active === i && {
          ...activeStyle,
        }),
      };

      if (dotClassName === 'small') {
        cumulativeDotStyle = {
          ...cumulativeDotStyle,
          ...smallDotStyle,
        };
      }

      dots.push(<div
        key={i}
        style={this.getDotStyle(i, dotClassName)}
        className="dot-holder"
        onClick={() => onClick(i)}
        onKeyPress={() => onClick(i)}
        tabIndex={0}
      >
        <div
          key={`${i}-inner`}
          className={`react-carousel-dots-dot
                        ${dotClassName}
                        ${active === i ? 'active' : ''}`}
          style={cumulativeDotStyle}
        />
                </div>);
    }

    return dots;
  };

  render() {
    const { className } = this.props;
    return (
      <div
        style={this.getHolderStyle()}
        className={`react-carousel-dots-holder ${className}`}
      >
        {this.getDots()}
      </div>
    );
  }
}

export default ReactCarouselDots;

ReactCarouselDots.defaultProps = {
  margin: 1,
  visible: 5,
  className: '',
  onClick: () => {},
  dotStyle: {},
  smallDotStyle: {},
  activeStyle: {},
  dotHolderHeight: 16,
  dotHolderWidth: 16,
  removeSmallDots: false,
};

ReactCarouselDots.propTypes = {
  length: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  margin: PropTypes.number,
  visible: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  dotStyle: PropTypes.object,
  smallDotStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  dotHolderHeight: PropTypes.number,
  dotHolderWidth: PropTypes.number,
  removeSmallDots: PropTypes.bool,
};
