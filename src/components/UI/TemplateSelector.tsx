// components/TemplateSelector.tsx
import React from "react";

interface TemplateSelectorProps {
    templates: string[];
    onSelect: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, onSelect }) => {
    return (
        <select
            onChange={(e) => onSelect(e.target.value)}
            className="border border-gray-300 p-2 rounded bg-white text-black"
        >
            <option value="">Stored Template</option>
            {templates.map((template) => (
                <option key={template} value={template}>
                    {template}
                </option>
            ))}
        </select>
    );
};

export default TemplateSelector;
