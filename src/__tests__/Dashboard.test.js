import React from 'react'
import {shallow} from '../enzyme'
import {Dashboard} from '../Components/Dasbhoard/Dashboard'

describe('Dashboard.js', () => {
    it('correctly renders', () => {
        const wrapper = shallow(<Dashboard/>)
        expect(wrapper.exists()).toBe(true);
        // console.log(wrapper.find('.loading').length)
    })

});