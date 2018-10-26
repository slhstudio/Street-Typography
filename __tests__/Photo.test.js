import React from 'react';
import PhotoComponent from '../client/components/Photo';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

//to run this test, uncomment MAP_KEY in Photo.js

describe('<Photo/>', () => {
  it ('conditional render of loading vs. loaded works properly', () => {
    // const wrapper = shallow(<PhotoComponent />);
    // expect(toJSON(wrapper)).toMatchSnapshot();
    //       // expect(wrapper.find('Loading').exists()).toBe(true);
    // wrapper.setState({ loading : false});
    // expect(toJSON(wrapper)).toMatchSnapshot();
         // expect(wrapper.find('PhotoSolo').exists()).toBe(true);
  });
});