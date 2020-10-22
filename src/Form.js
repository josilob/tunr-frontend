import React from 'react';

const Form = (props) => {
    const [formData, setFormData] = React.useState(props.song);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(formData);
        props.history.push('/');
    };

    const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    return(
    <form class="songForm" onSubmit={handleSubmit}>
        <input 
        id="title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}/>
        <input 
        id="artist"
        type="text"
        name="artist"
        value={formData.artist}
        onChange={handleChange}/>
        <input
        id="time"
        type="text"
        name="time"
        value={formData.time}
        onChange={handleChange}/>
        <input type="submit" value={props.label} />
    </form>
)

}

export default Form;
