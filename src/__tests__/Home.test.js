import React from 'react'
import {shallow} from '../enzyme'
import {Home} from '../Components/Home/Home'

describe('Home.js', () => {
    it('correctly renders', () => {
        const wrapper = shallow(<Home/>)
        expect(wrapper.exists()).toBe(true);
        // console.log(wrapper.find('.loading').length)
    })

});