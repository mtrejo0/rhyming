const Tweet = props => {
    return <div className='rep'>
      <p>{props.props.text}</p>
      <a href={`https://twitter.com/edent/status/${props.props.id}`} target="_blank" rel="noreferrer"><p>View</p></a>
      
    </div>
};

export default Tweet;