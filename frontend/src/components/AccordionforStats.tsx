import React, {ReactNode} from 'react';
import {Accordion} from "react-bootstrap";

interface AccordionProps {
    title?: string;
    children?: ReactNode;
}

const AccordionforStats: React.FC<AccordionProps> = ({children}) => {
    return (
        <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Статистика</Accordion.Header>
                <Accordion.Body>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionforStats;
