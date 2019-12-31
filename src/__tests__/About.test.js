import React from 'react'
import {shallow} from '../enzyme'
import About from '../Components/About/About'



describe('About.js', () => {
    it('correctly renders loading', () => {
        const wrapper = shallow(<About/>)
        expect(wrapper.find('.loading').length).toBe(1);
        // console.log(wrapper.find('.loading').length)
    })
});