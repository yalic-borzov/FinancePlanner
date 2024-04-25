import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import {AccordionEventKey} from "react-bootstrap/AccordionContext";

interface AccordionProps {
    title?: string;
    fetchStats: () => void;  // Функция для загрузки данных
    children: React.ReactNode;
}

const AccordionforStats: React.FC<AccordionProps> = ({title, fetchStats, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (eventKey: AccordionEventKey) => {
        const currentlyOpen = eventKey === "0";
        if (currentlyOpen !== isOpen) {
            setIsOpen(currentlyOpen);
            if (currentlyOpen) {
                console.log("Opening:")
                fetchStats();
            }
        }
    };

    return (
        <Accordion defaultActiveKey="1" onSelect={handleToggle}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{title || "Статистика"}</Accordion.Header>
                <Accordion.Body className={"stats__accordion__body"}>
                    {isOpen && children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionforStats;
