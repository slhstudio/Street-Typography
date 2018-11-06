import React from 'react';
import Button from '../client/components/Button';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import 'jest-styled-components'

const fakeProps = {
  type : 'submit',
  onClick : jest.fn(),
  text: 'UPLOAD'
}

describe('<Button/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<Button {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({text: 'SAVE'});
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});