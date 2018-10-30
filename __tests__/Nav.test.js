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
   });
   it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<Nav isUser={true} logged={logged2} name={name}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
   });
});