import React, {ReactNode} from 'react';
import {Accordion} from "react-bootstrap";

interface AccordionProps {
    // Определите здесь другие свойства, если они есть
    title?: string; // Например, необязательный заголовок
    children?: ReactNode; // Указываем, что children могут быть любыми реакт-элементами
}

const AccordionforStats: React.FC<AccordionProps> = ({children}) => {
    return (
        <Accordion defaultActiveKey="0">
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
