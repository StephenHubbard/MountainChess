// import React from 'react';
// import toJson from 'enzyme-to-json';
// import { shallow } from '../enzyme';

// import {Sidebar} from '../Components/Sidebar/Sidebar';

// describe('testing sidebar username changes based on props.username', () => {
//     const sidebar = shallow(
//         <Sidebar
//             username="Guest"
//         />,
//     );

//     expect(sidebar.find('.sidebar__info').username()).toBe('Guest');
// })


// import React from 'react'
// import {render, act} from '@testing-library/react'
// import Sidebar from '../Components/Sidebar/Sidebar'
// import axios from 'axios'
// import { MemoryRouter } from 'react-router-dom'

// it('renders no friends if there is no logged in user', async () => {
//     const 
// })

import React from 'react'
import {shallow} from '../enzyme'
import {Sidebar} from '../Components/Sidebar/Sidebar'
import {render} from '@testing-library/react'

describe ('sidebar.js', () => {
    it('renders', () => {
        const wrapper = shallow(<Sidebar/>)
        expect(wrapper.exists()).toBe(true)
    })
    it('renders 5 sidebar icons', () => {
        const wrapper = shallow(<Sidebar/>)
        expect(wrapper.find('#sb-icon').length).toBe(5)
        // console.log(wrapper.find('i.fas fa-users').length)
    })
    // test('recieves username via props', () => {
    //     const { getByTestId, rerender } = render(<Sidebar username='username-test'/>)
    //     expect(getByTestId('username').textContent).toBe('username-test')
    // })
    it('renders logout button', () => {
        const wrapper = shallow(<Sidebar/>)
        expect(wrapper.find('#login-button').length).toBeGreaterThan(0)
    })
})