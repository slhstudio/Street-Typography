import React from 'react';
import EditComponent from '../client/components/Edit';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { uploadChanges as mockUploadChanges, deletePhoto as mockDeletePhoto } from '../client/utilities/api';


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
    // const deleteButton = wrapper.find('.row').first().childAt(1).childAt(0);//
    // expect((deleteButton).type()).toBe('button');
    // expect((deleteButton).text()).toBe('DELETE');
  });
  it ('conditional render of editing form vs. redirect works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ deleted : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('Redirect').exists()).toBe(true);
    wrapper.setState({ deleted : false });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('.row').exists()).toBe(true);
  });
  it ('conditional render of edit vs. save works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : false });
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').text()).toBe('nice typeface');
    // const changingButton = wrapper.find('.row').at(1).find('button');
    // expect((changingButton).text()).toBe('EDIT');
    wrapper.setState({ editing : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('input').exists()).toBe(true);
    // const changedButton = wrapper.find('.row').at(1).find('button');
    // expect(changedButton.text()).toBe('SAVE');
  });
  it ('shows controlled input value correctly', () => {
    const wrapper = shallow(<EditComponent photo={image} info='weird lettering'/>);
    wrapper.setState({ editing : true });
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('input').props().value).toBe('nice typeface');
  });
  it ('changes state on click', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.find('.test1').simulate('click');
    expect(wrapper.state().editing).toBe(true);
  })
  it ('when editing, changes state on click and calls upload function', async () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : true });
    wrapper.find('.test2').simulate('click');
    //const result = await mockUploadChanges();
    await wait();
    expect(mockUploadChanges).toHaveBeenCalledTimes(1);
    expect(mockUploadChanges).toHaveBeenCalledWith(note);
    expect(wrapper.state().editing).toBe(false);
  });
  it ('when deleting, changes state on click and calls delete function', async () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.find('.test3').simulate('click');
    await wait();
    expect(mockDeletePhoto).toHaveBeenCalledTimes(1);
    expect(mockDeletePhoto).toHaveBeenCalledWith(image);
    expect(wrapper.state().deleted).toBe(true);
  })

});