import React from 'react';

const TimeDisplay: React.FC<{ dateString: string }> = ({dateString}) => {
    const dateObject = new Date(dateString);
    const timeString = dateObject.toLocaleTimeString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow'
    });

    return <span>{timeString}</span>;
};

export default TimeDisplay;
