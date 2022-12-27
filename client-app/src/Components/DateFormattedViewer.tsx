import React from 'react';
interface Props {
    date: string;
}

const DateFormattedViewer: React.FC<Props> = ({date}: Props) => {
    return (
        <>
            {new Intl.DateTimeFormat('tr', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }).format(new Date(date))}
        </>
    )
}

export default DateFormattedViewer;