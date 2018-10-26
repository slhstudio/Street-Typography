import React from 'react';
import Nav from '../client/components/Nav';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const logged1 = 'Log In';
const logged2 = 'Log Out';
const name = 'Sarah';

describe('<Nav/>', () => {
  it ('renders and displays properly if there is no a user', () => {
    const wrapper = shallow(<Nav isUser={false} logged={logged1}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // const lastItem = wrapper.find('ul').childAt(3);
    // expect(lastItem.find('p').text()).toBe('Log In');
   });
   it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<Nav isUser={true} logged={logged2} name={name}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // const lastItem = wrapper.find('ul').childAt(3);
    // expect(lastItem.find('.greeting').exists()).toBe(true);
    // expect(lastItem.find('p').exists()).toBe(true);
    // expect(lastItem.find('a').exists()).toBe(true);
    // expect(lastItem.find('.greeting').childAt(0).text()).toBe('Hi, Sarah!');
    // expect(lastItem.find('a').childAt(0).text()).toBe('Log Out');
   });
});