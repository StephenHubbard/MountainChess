import React from 'react'
import {shallow} from '../enzyme'
import {Profile} from '../Components/Profile/Profile'

describe('Profile.js', () => {
    it('correctly renders', () => {
        const wrapper = shallow(<Profile/>)
        expect(wrapper.exists()).toBe(true);
        // console.log(wrapper.find('.loading').length)
    })

});