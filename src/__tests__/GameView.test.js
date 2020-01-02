import React from 'react'
import {shallow} from '../enzyme'
import {GameView} from '../Components/GameView/GameView'

describe('GameView.js', () => {
    it('correctly renders', () => {
        const wrapper = shallow(<GameView/>)
        expect(wrapper.exists()).toBe(true);
        // console.log(wrapper.find('.loading').length)
    })

});