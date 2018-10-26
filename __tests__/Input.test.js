import React from 'react';
import Input from '../client/components/Input';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  type : 'text',
  name : 'notes',
  placeholder : 'Add some notes here',
  value : 'neon!',
}

const newProps = {
  type : 'text',
  name : 'address',
  placeholder : 'Add address',
  value : 'Portland, Maine'
}

describe('<Input/>', () => {
  it ('matches snapshot', () => {
    const wrapper = shallow(<Input {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('input').exists()).toBe(true);
  });
  it ('updates controlled input values correctly', () => {
    const wrapper = shallow(<Input {...fakeProps}/>);
    wrapper.setProps({...newProps});
    expect(toJSON(wrapper)).toMatchSnapshot();
    // const inputProps = wrapper.find('input').props();
    // expect (inputProps.name).toBe('notes');
    // expect (inputProps.placeholder).toBe('Add some notes here');
    // expect (inputProps.value).toBe('neon!');
  });
});