import React from 'react';
import AddForm from '../client/components/AddForm';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  onSubmit: jest.fn(),
  children: ['child1', 'child2', 'child3']
}

describe('<AddForm/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<AddForm {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});