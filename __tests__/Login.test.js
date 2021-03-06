import React from 'react';
import LogInComponent from '../client/components/Login';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  isUser: false,
  handleLogIn: jest.fn()
}

describe('<LogIn/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<LogInComponent {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});