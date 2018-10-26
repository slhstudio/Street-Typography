import React from 'react';
import HomeComponent from '../client/components/Home';
import { shallow } from 'enzyme';
import { findAllPhotos as mockFindAllPhotos, isSignedIn as mockIsSignedIn} from '../client/utilities/api'

jest.mock('../client/utilities/api', () => {
  return {
    isSignedIn: jest.fn(() => Promise.resolve('Sarah')),
    findAllPhotos: jest.fn(() => Promise.resolve({data: [{photo: 'photo1'}, {photo: 'photo2'}]}))
  }
})

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

describe('<Home/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<HomeComponent isUser={false}/>);
    expect(wrapper.find('Loading').exists()).toBe(true);
    wrapper.setState({ loading : false});
    expect(wrapper.find('PhotoGrid').exists()).toBe(true);
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<HomeComponent isUser={true}/>);
    expect(wrapper.find('Loading').exists()).toBe(true);
    wrapper.setState({ loading : false});
    expect(wrapper.find('PhotoGrid').exists()).toBe(true);
  });
  it('finds all photos', async () => {
    const wrapper = shallow(<HomeComponent isUser={true}/>);
    wrapper.setState({ loading : false});
    console.log(wrapper.find('PhotoGrid').props().photos)//.toContain({photo: 'photo1'});
    await wait();
    expect(mockFindAllPhotos).toHaveBeenCalledTimes(2);
    expect(mockFindAllPhotos).toHaveReturned();
    expect(mockIsSignedIn).toHaveBeenCalledTimes(1);
  })
 
});


