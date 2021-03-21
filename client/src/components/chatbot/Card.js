import React from 'react';
const Card = (props) => (
<div style={{ float: 'left', paddingRight: 30,  width: 200}}>
    <div className="card" >
        <div className="card-image" style={{ width: 170, height:50}}>
            <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                <span className="card-title">{props.payload.fields.header.stringValue}</span>
        </div>
        <div className="card-content">
            {props.payload.fields.description.stringValue}
            <p>
                <a>
                    {props.payload.fields.salary.stringValue}
                </a>
            </p>
        </div>
        <div className="card-action">
            <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>Apply now!</a>
        </div>
    </div>
</div>
)

export default Card;