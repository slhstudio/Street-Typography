import React from 'react';
import EditComponent from '../client/components/Edit';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { uploadChanges as mockUploadChanges, deletePhoto as mockDeletePhoto } from '../client/utilities/api';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';


const image = 'photo1.png';
const note = 'nice typeface';

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

jest.mock('../client/utilities/api', () => {
  return {
    uploadChanges: jest.fn(() => Promise.resolve('updated')),
    deletePhoto: jest.fn(() => Promise.resolve('success'))
  }
})

describe('<Edit/>', () => {
  it ('matches the snapshot', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('conditional render of editing form vs. redirect works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ deleted : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setState({ deleted : false });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('conditional render of edit vs. save works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : false });
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setState({ editing : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('shows controlled input value correctly', () => {
    const wrapper = shallow(<EditComponent photo={image} info='weird lettering'/>);
    wrapper.setState({ editing : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it ('handles change on form and updates state', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : true });
    wrapper.find('input').simulate('change', {target: {value: 'This is edited'}});
    expect(wrapper.state('update')).toBe('This is edited');
  });
  it ('changes state on edit button click', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.find('.test1').simulate('click');
    expect(wrapper.state('editing')).toBe(true);
  });
  it ('changes state on save button click and calls upload function', async () => {
    const wrapper = mount(<EditComponent photo={image} info={note}/>); //don't need context here b/c not rendering router element
    wrapper.setState({ editing : true });
    wrapper.find('.test2').simulate('click');
    await wait();
    expect(mockUploadChanges).toHaveBeenCalledTimes(1);
    expect(mockUploadChanges).toHaveBeenCalledWith(wrapper.props().info); //need mount to get these props
    expect(mockUploadChanges).toHaveBeenCalledWith(wrapper.state('update'));
    expect(wrapper.state('editing')).toBe(false);
  });
  it ('changes state on delete button click and calls delete function', async () => {
    const options = new ReactRouterEnzymeContext();
    const wrapper = mount(<EditComponent photo={image} info={note}/>, options.get());
    wrapper.find('.test3').simulate('click');
    await wait();
    expect(mockDeletePhoto).toHaveBeenCalledTimes(1);
    expect(mockDeletePhoto).toHaveBeenCalledWith(wrapper.props().photo); 
    expect(mockDeletePhoto).toHaveBeenCalledWith(wrapper.state('image'));
    expect(wrapper.state('deleted')).toBe(true);
  });
  it ('promise resolves when delete function is called', async () => {
    expect.assertions(1);
    const remove = await mockDeletePhoto();
    expect(remove).toBe('success');
  });
  it ('promise resolves when upload function is called', async () => {
    expect.assertions(1);
    const save = await mockUploadChanges();
    expect(save).toBe('updated');
  });
});