import React from 'react';
import {SubmitButtonProps} from "../types/types.ts";


const PrimaryButton: React.FC<SubmitButtonProps> = ({text, key, onClick}) => {
    return (
        <button className="btn btn-primary w-100" key={key} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;
