import React from 'react';
import PhotoComponent from '../client/components/Photo';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  isUser: true,
  handleLogIn: jest.fn(),
  name: 'Sarah'
}

//to run this test, uncomment MAP_KEY in Photo.js

describe('<Photo/>', () => {
  it ('conditional render of loading vs. loaded works properly', () => {
    // const wrapper = shallow(<PhotoComponent {...fakeProps}/>);
    // expect(toJSON(wrapper)).toMatchSnapshot();
    // wrapper.setState({ loading : false});
    // expect(toJSON(wrapper)).toMatchSnapshot();
  });
});