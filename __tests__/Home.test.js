import React from 'react';
import HomeComponent from '../client/components/Home';
import { shallow } from 'enzyme';

describe('<Home/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<HomeComponent isUser={false}/>);
    expect(wrapper.find('Loading').exists());
    wrapper.setState({ loading : 'false'});
    expect(wrapper.find('PhotoGrid').exists());
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<HomeComponent isUser={true}/>);
    expect(wrapper.find('Loading').exists());
    wrapper.setState({ loading : 'false'});
    expect(wrapper.find('PhotoGrid').exists());
  });
});