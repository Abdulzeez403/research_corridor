import React, { useState } from 'react';

import { XIcon } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        if (selectedOptions.includes(value)) {
            onChange(selectedOptions.filter(option => option !== value));
        } else {
            onChange([...selectedOptions, value]);
        }
    };

    return (
        <div className="relative w-full">
            <div
                className="p-2 border rounded cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOptions.length > 0 ? (
                    <div className="flex flex-wrap">
                        {selectedOptions.map(option => (
                            <div key={option} className="flex items-center p-1 bg-gray-200 rounded m-1">
                                {options.find(opt => opt.value === option)?.label}
                                <XIcon
                                    className="ml-2 cursor-pointer"
                                    size={16}
                                    onClick={() => handleSelect(option)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <span>Select options</span>
                )}
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 z-10 p-2 mt-2 bg-white border rounded shadow">
                    {options?.map(option => (
                        <div
                            key={option.value}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(option.value)}
                        >
                            <input
                                placeholder='Select Supervisor'
                                type="checkbox"
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => handleSelect(option.value)}
                            />
                            <span className="ml-2">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
