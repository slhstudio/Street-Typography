import React from 'react';
import MineComponent from '../client/components/Mine';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const photos1 = [];
const photos2 = ['photo1', 'photo2', 'photo3']

const fakeProps = {
  handleLogIn: jest.fn()
}

describe('<Mine/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<MineComponent isUser={false}{...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<MineComponent isUser={true}{...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('renders and displays properly if there IS a user and no photos yet', () => {
    const wrapper = shallow(<MineComponent isUser={true}{...fakeProps}/>);
    wrapper.setState({ loading : false, photos : photos1 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('renders and displays properly if there IS a user and there are photos', () => {
    const wrapper = shallow(<MineComponent isUser={true}{...fakeProps}/>);
    wrapper.setState({ loading : false, photos : photos2 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});