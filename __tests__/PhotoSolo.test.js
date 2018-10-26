import React from 'react';
import PhotoSolo from '../client/components/PhotoSolo';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';


const name1 = 'me';
const name2 = 'notMe';
const author = 'me';
const notes = 'xyz';
const photo = 'photo1';
const map = 'Paris, Texas'

describe('<PhotoSolo/>', () => {
  it ('renders and displays properly', () => {
     const wrapper = shallow(<PhotoSolo photo={photo} map={map}/>);
     expect(toJSON(wrapper)).toMatchSnapshot();
    //  expect(wrapper.find('.photoSoloBox').exists()).toBe(true);
    //  expect(wrapper.find('img').first().props().src).toBe(`/uploads/photo1`);
    //  expect(wrapper.find('img').last().props().src).toBe('Paris, Texas');
  });
  it ('if author is same as user, edit form renders', () => {
    const wrapper = shallow(<PhotoSolo name={name1} author={author} notes={notes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('Edit').exists()).toBe(true);
  });
  it ('else only the notes render', () => {
    const wrapper = shallow(<PhotoSolo name={name2} author={author} notes={notes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').exists()).toBe(true);
    // expect(wrapper.find('p').text()).toBe('xyz');
  });
});