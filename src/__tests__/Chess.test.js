import React from 'react'
import {shallow} from '../enzyme'
import {Chess} from '../Components/Chess/Chess'

describe('Chess.js', () => {
    it('correctly renders', () => {
        const wrapper = shallow(<Chess/>)
        expect(wrapper.exists()).toBe(true);
        // console.log(wrapper.find('.loading').length)
    })

});