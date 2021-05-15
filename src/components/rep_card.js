import {NavLink} from 'react-router-dom'


const RepCard = props => {

    return <div className='rep-card'>
        <h1>{props.props.name}</h1>
        <p>{props.props.party}</p>
        <p>{props.props.district}, {props.props.state}</p>
        <p>{props.props.phone}</p>
        <p>{props.props.office}</p>
        <p><a href={props.props.link} target='_blank' rel="noreferrer">Webpage</a></p>
        <NavLink to={`/rep/${props.props.name}`}>See Socials</NavLink>
        
    </div>
};

export default RepCard;