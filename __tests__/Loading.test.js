import React from 'react';
import LoadingComponent from '../client/components/Loading';
import { shallow } from 'enzyme';

const defaultProps = {
  text : 'loading'
}

describe('<Loading/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<LoadingComponent text={defaultProps.text}/>);
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('p').text()).toBe(defaultProps.text);
  });
});