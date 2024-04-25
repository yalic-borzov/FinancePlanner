import React from 'react';
import {SubmitButtonProps} from "../types/types.ts";


const OutlineButton: React.FC<SubmitButtonProps> = ({text, key, onClick}) => {
    return (
        <button className="btn btn-outline-primary w-100" key={key} onClick={onClick}>
            {text}
        </button>
    );
};

export default OutlineButton;
