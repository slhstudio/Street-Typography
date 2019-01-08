import React, { Component } from 'react';
import Loading from './Loading';
import Input from './Input';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledMain = styled.div.attrs({
  className: 'location'
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Locator extends Component {
  state = {
    location: ''
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState(() => ({ location: value }));
  };

  render() {
    return (
      <StyledMain>
        <Input
          type='text'
          name='location'
          value={this.state.location}
          placeholder='enter a location'
          onChange={this.handleChange}
          purpose={'searchForm'}
        />
      </StyledMain>
    );
  }
}

export default Locator;
