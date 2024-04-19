import React from 'react';

interface CardIconProprs {
    icon: string,
    iconAlt: string,
    text: string
}


const CardIcon: React.FC<CardIconProprs> = ({icon, iconAlt, text}) => {
    return (
        <div className="card text-center">
            <div className="card-body">
                                <span className="icon_span">
                                    <img src={icon} className="icon" alt={iconAlt}/>
                                </span><br/>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default CardIcon;
