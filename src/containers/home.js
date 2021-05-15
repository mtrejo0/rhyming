import React from 'react'

import TextForm from '../components/text_form'
import Results from '../components/results'

import "../styles/home.css"



const Home = () => {
    

    return <div className='center'>
        <TextForm></TextForm>
        <Results></Results>
    </div>
}

export default Home;