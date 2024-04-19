import React from 'react';

interface SubmitButtonProps {
    text: string;
    onClick: () => void;
}

const PrimaryButton: React.FC<SubmitButtonProps> = ({text, onClick}) => {
    return (
        <button className="btn btn-primary w-100" onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;
