import React from 'react';
import EditComponent from '../client/components/Edit';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const image = 'photo1.png';
const note = 'nice typeface'

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
});