import React from 'react';
import LogInComponent from '../client/components/Login';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

describe('<LogIn/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<LogInComponent/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('.loginbox').exists());
    // expect(wrapper.find('p').exists()).toBe(true);
    // expect(wrapper.find('a').exists()).toBe(true);
    // expect(wrapper.find('button').exists()).toBe(true);
    // expect(wrapper.find('button').text()).toBe('Google');
  });
});