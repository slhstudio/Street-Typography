import React from 'react';
import PhotoSolo from '../client/components/PhotoSolo';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  author : 'me',
  notes : 'xyz',
  photo : 'photo1',
  map : 'Paris, Texas'
}

describe('<PhotoSolo/>', () => {
  it ('if author is same as user, edit form renders', () => {
    const wrapper = shallow(<PhotoSolo name={'me'}{...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('else only the notes render', () => {
    const wrapper = shallow(<PhotoSolo name={'not_me'}{...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});