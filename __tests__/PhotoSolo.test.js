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
  });
  it ('if author is same as user, edit form renders', () => {
    const wrapper = shallow(<PhotoSolo name={name1} author={author} notes={notes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('else only the notes render', () => {
    const wrapper = shallow(<PhotoSolo name={name2} author={author} notes={notes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});