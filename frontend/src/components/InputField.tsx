import React from 'react';

interface InputFieldProps {
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({type, value, onChange, placeholder}) => {
    return (
        <div className="mb-3">
            <input
                type={type}
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
