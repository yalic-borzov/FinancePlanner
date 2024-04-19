import React from 'react';

interface SubmitButtonProps {
    text: string;
    link: string;
}

const PrimaryButtonLink: React.FC<SubmitButtonProps> = ({text, link}) => {
    return (
        <a className="btn btn-primary w-100" href={link}>
            {text}
        </a>
    );
};

export default PrimaryButtonLink;
