import React from 'react';
import AddComponent from '../client/components/Add';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

describe('<Add/>', () => {
  it ('renders and displays properly if there is no user', () => {
    const wrapper = shallow(<AddComponent isUser={false}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('renders and displays properly if there IS a user', () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
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
  })
  it('handles conditional rendering correctly', () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    wrapper.setState({ photoName : '' });
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setState({ photoName : 'xyz' });
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
  it('calls method on click',  async () => {
    const wrapper = shallow(<AddComponent isUser={true}/>);
    const handleSubmit = await jest.fn();
    wrapper.find('.test4').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled;
  })
});

//interesting comment: 
// "1. shallow-render it, and assert on the presence of the two inputs and the button
// 2. shallow-render it, and assert that the root is a <form> with an "onSubmit" prop that has a function
// 3. pass in a spy for login, and then unit-test the function on the prop and assert that it calls your spy with the right arguments.

// What further testing is needed? In no way should you be trying to write tests that test React's "onSubmit" functionality, or of browsers' submit behavior - that's the job of the React team, or the browser implementors, respectively."




 