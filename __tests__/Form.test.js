import React from 'react';
import Form from '../client/components/Form';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProps = {
  onSubmit: jest.fn(),
  children: ['child1', 'child2', 'child3']
}

describe('<Form/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<Form {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});