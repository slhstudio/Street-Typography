import React from 'react';
import PhotoGridComponent from '../client/components/PhotoGrid';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const photos = ['photo1.png', 'photo2.png', 'photo3.png'];
const notes = ['notes1', 'notes2', 'notes3']

describe('<PhotoGrid/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<PhotoGridComponent photos={photos} notes={notes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});