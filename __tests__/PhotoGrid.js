import React from 'react';
import PhotoGridComponent from '../client/components/PhotoGrid';
import { shallow } from 'enzyme';

const photos = ['photo1.png', 'photo2.png', 'photo3.png'];
const notes = ['notes1', 'notes2', 'notes3']

describe('<PhotoGrid/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<PhotoGridComponent photos={photos} notes={notes}/>);
    expect(wrapper.find('ul').children()).toHaveLength(photos.length);
    expect(wrapper.find('Link').children()).toHaveLength(photos.length);
    const img = wrapper.find('ul').childAt(0).find('img');
    expect(img.props().src).toBe(`/uploads/${photos[0]}`);
    expect(img.props().alt).toBe(`street typography image: ${notes[0]}`)
  });
});