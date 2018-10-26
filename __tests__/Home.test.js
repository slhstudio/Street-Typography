import React from 'react';
import { StaticRouter, Link} from 'react-router-dom';
import HomeComponent from '../client/components/Home';
import { shallow, mount } from 'enzyme';
import { findAllPhotos as mockFindAllPhotos, isSignedIn as mockIsSignedIn} from '../client/utilities/api'
import toJSON from 'enzyme-to-json';

jest.mock('../client/utilities/api', () => {
  return {
    isSignedIn: jest.fn(() => Promise.resolve('Sarah')),
    findAllPhotos: jest.fn(() => Promise.resolve({data: [{photo: 'photo1'}, {photo: 'photo2'}]}))
  }
})

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

describe('<Home/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<HomeComponent isUser={true}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setState({ loading : false});
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('finds all photos', async () => {
    
    const wrapper = mount(<HomeComponent isUser={true} />);
    wrapper.setState({ loading : false });
    console.log(wrapper.state())
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('PhotoGrid').exists()).toBe(true);
    //console.log(wrapper.find('PhotoGrid').debug());//.props().photos)//.toContain({photo: 'photo1'});
    await wait();
    // expect(mockFindAllPhotos).toHaveBeenCalledTimes(2);
    // expect(mockFindAllPhotos).toHaveReturned();
    // expect(mockIsSignedIn).toHaveBeenCalledTimes(1);
 })
 
});


