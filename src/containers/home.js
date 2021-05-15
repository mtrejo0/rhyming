import React from 'react'

import FormZipCode from '../components/form_zip_code'
import Reps from '../components/reps'

import "../styles/home.css"



const Home = () => {
    

    return <div className='center'>
        <h1>Grassroots</h1>
        
        <FormZipCode></FormZipCode>
        <Reps></Reps>
    </div>
}

export default Home;