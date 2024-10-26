import React, { useEffect, useState } from "react";
import "./LegendCheckbox.scss";

interface LegendCheckboxProps {
    label: string;
    icon: JSX.Element;
    onUpdated?: (checked: boolean) => void;
    checked?: boolean;
}

const LegendCheckbox: React.FC<LegendCheckboxProps> = ({ label, icon, onUpdated, checked }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        if (onUpdated) onUpdated(isChecked);
    };

    return (
        <label className={`checkbox ${isChecked ? "checked" : ""}`}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            {icon}
            <span>{label}</span>
        </label>
    );
}

export default LegendCheckbox;