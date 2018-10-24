import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '1em'
  }
};

class Loading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };
  
  //reusable component so give defaultProps in case someone doesn't specify props when they use it
  static defaultProps = {
    text: 'LOADING',
    speed: 300
  };
  //lets user specify what they want their text to be by making it a prop when they invoke the component
  state = { 
    //not getting passed props via constructor so props.text become this.props.text
    text: this.props.text
  };

  componentDidMount () {
    const { text, speed } = this.props;

    const stopper = '.......' + text + '.......';
    this.interval = window.setInterval(() => {
      this.state.text === stopper 
        ? this.setState(() => ({ text: this.props.text })) 
        : this.setState((prevState) => ({ text: '.' + prevState.text + '.'}))
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  
  render () {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

export default Loading;