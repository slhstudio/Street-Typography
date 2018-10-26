import React from 'react';
import MineComponent from '../client/components/Mine';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const photos1 = [];
const photos2 = ['photo1', 'photo2', 'photo3']

describe('<Mine/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<MineComponent isUser={false}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').exists()).toBe(true);
    // expect(wrapper.find('p').text()).toBe('You must be logged in to see your photos.');
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<MineComponent isUser={true}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('Loading').exists()).toBe(true);
  });
  it ('renders and displays properly if there IS a user and no photos yet', () => {
    const wrapper = shallow(<MineComponent isUser={true}/>);
    wrapper.setState({ loading : false, photos : photos1 });
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').exists()).toBe(true);
    // expect(wrapper.find('p').text()).toBe('You haven\'t added any photos yet. Get Going!');
  });
  it ('renders and displays properly if there IS a user and there are photos', () => {
    const wrapper = shallow(<MineComponent isUser={true}/>);
    wrapper.setState({ loading : false, photos : photos2 });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('PhotoGrid').exists()).toBe(true);
  });
});