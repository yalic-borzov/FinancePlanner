import React from 'react';

interface NumpadProps {
    value: string;
    onValueChange: (value: string) => void;
}

const Numpad: React.FC<NumpadProps> = ({value, onValueChange,}) => {

    const handleButtonClick = (buttonValue: string) => {
        onValueChange(value + buttonValue);
    };

    const handleDelete = () => {
        onValueChange(value.slice(0, -1));
    };

    return (
        <div className="container">
            <div className="row">
                {'123456789'.split('').map(number => (
                    <div className="col-4 mb-2" key={number}>
                        <button className="btn btn-secondary w-100" onClick={() => handleButtonClick(number)}>
                            {number}
                        </button>
                    </div>
                ))}
                <div className="col-4 mb-2">
                    <button className="btn btn-secondary w-100" onClick={() => handleButtonClick('.')}>
                        ,
                    </button>
                </div>
                <div className="col-4 mb-2">
                    <button className="btn btn-secondary w-100" onClick={() => handleButtonClick('0')}>
                        0
                    </button>
                </div>
                <div className="col-4 mb-2">
                    <button className="btn btn-danger w-100" onClick={handleDelete}>
                        Del
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Numpad;
