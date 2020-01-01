// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';



import React from 'react'
import {shallow} from './enzyme'
import {App} from '../src/App'
import renderer from 'react-test-renderer'
import {render} from '@testing-library/react'

describe ('App.js', () => {
    it('renders', () => {
        const wrapper = shallow(<App/>)
        expect(wrapper.exists()).toBe(true)
    })

    // it('renders learn react link', () => {
    //   const { getByText } = render(<App />);
    //   const linkElement = getByText(/learn react/i);
    //   expect(linkElement).toBeInTheDocument();
    // });
})
