import React from 'react';
import HomeComponent from '../client/components/Home';
import { shallow, mount } from 'enzyme';
import { findAllPhotos as mockFindAllPhotos, isSignedIn as mockIsSignedIn} from '../client/utilities/api'
import toJSON from 'enzyme-to-json';

const fakeProps = {
  isUser: false,
  handleLogIn: jest.fn()
}

jest.mock('../client/utilities/api', () => {
  const allPhotos = [{photo: 'photo1'}, {photo: 'photo2'}]
  const user = 'Sarah';
  return {
    isSignedIn: jest.fn(() => Promise.resolve(user)),
    findAllPhotos: jest.fn(() => Promise.resolve({data: allPhotos }))
  }
})

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

describe('<Home/>', () => {
  it ('renders and displays properly', () => {
    const wrapper = shallow(<HomeComponent {...fakeProps}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setState({ loading : false});
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('finds all photos', async () => {
    expect.assertions(2);
    const data = await mockFindAllPhotos();
    expect(data).toEqual({data: [{photo: 'photo1'}, {photo: 'photo2'}]})
    expect(mockFindAllPhotos).toHaveBeenCalledTimes(2);
  });
  it('gets user', async () => {
    expect.assertions(1);
    const user = await mockIsSignedIn();
    expect(user).toBe('Sarah');
  });
  it('should call function passed in as prop with correct argument', async () => {
    const wrapper = shallow(<HomeComponent {...fakeProps} />);
    wrapper.instance().componentDidMount();
    await wait();
    expect(fakeProps.handleLogIn).toHaveBeenCalled();
    expect(fakeProps.handleLogIn).toHaveBeenCalledWith('Sarah');
  })
});


