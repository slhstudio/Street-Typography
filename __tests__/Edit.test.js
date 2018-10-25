import React from 'react';
import EditComponent from '../client/components/Edit';
import { shallow } from 'enzyme';
import { PromiseProvider } from 'mongoose';

const image = 'photo1.png';
const note = 'nice typeface'

describe('<Edit/>', () => {
  it ('delete button renders and displays properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    const deleteButton = (wrapper.find('.row').childAt(1).childAt(0));//
    expect((deleteButton).type()).toBe('button');
    expect((deleteButton).text()).toBe('DELETE');
  });
  it ('conditional render of editing form vs. redirect works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ deleted : true });
    expect(wrapper.find('Redirect').exists());
    wrapper.setState({ deleted : false });
    expect(wrapper.find('.row').exists());
  });
  it ('conditional render of edit vs. save works properly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : false });
    expect(wrapper.find('p').text()).toBe('nice typeface');
    const changingButton = wrapper.find('.row').childAt(0).childAt(1);
    expect(changingButton.text()).toBe('EDIT');
    wrapper.setState({ editing : true });
    expect(wrapper.find('input').exists());
    const changedButton = wrapper.find('.row').childAt(0).childAt(1);
    expect(changedButton.text()).toBe('SAVE');
  });
  it ('shows controlled input value correctly', () => {
    const wrapper = shallow(<EditComponent photo={image} info={note}/>);
    wrapper.setState({ editing : true });
    expect(wrapper.find('input').props().value).toBe('nice typeface');
  });
});