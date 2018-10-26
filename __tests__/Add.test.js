import React from 'react';
import AddComponent from '../client/components/Add';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

describe('<Add/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<AddComponent isUser={false}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').exists()).toBe(true);
    // expect(wrapper.find('p').text()).toBe('If you would like to add photos, please log in.');
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('form').exists());
    // expect(wrapper.find('Input')).toHaveLength(5);
    // expect(wrapper.find('button').exists()).toBe(true);
    // expect(wrapper.find('button').text()).toBe('UPLOAD');
  });
  it('shows controlled form values correctly', () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    wrapper.setState({ 
      notes : 'description goes here', 
      location : {
        address : 'New York, NY USA', 
        longitude : -74.0059728, 
        latitude : 40.7127753
      }
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
    // const notesInput = wrapper.find('form').childAt(1);
    // expect(notesInput.props().value).toBe('description goes here');
    // const addressInput = wrapper.find('form').childAt(2);
    // expect(addressInput.props().value).toBe('New York, NY USA');
    // const lngInput = wrapper.find('form').childAt(3);
    // expect(lngInput.props().value).toBe(-74.0059728);
    // const latInput = wrapper.find('form').childAt(4);
    // expect(latInput.props().value).toBe(40.7127753);
  })
  it('handles conditional rendering correctly', () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    wrapper.setState({ photoName : '' });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('form').exists()).toBe(true);
    wrapper.setState({ photoName : 'xyz' });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('Redirect').exists()).toBe(true);
  })
});