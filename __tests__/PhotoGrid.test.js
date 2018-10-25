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
    const pics = wrapper.find('Link').children().map(node => node.props().src);
    expect(pics).toEqual([ '/uploads/photo1.png', '/uploads/photo2.png', '/uploads/photo3.png' ]);
    const info = wrapper.find('Link').children().map(node => node.props().alt);
    expect(info).toEqual([ 'street typography image: notes1','street typography image: notes2','street typography image: notes3' ]);
  });
});