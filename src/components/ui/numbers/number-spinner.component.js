import React, { useState } from 'react';

export default function NumberSpinner({ value, onChange, min, max, step }) {
    const handleIncrement = () => {
        onChange(Math.min(value + step, max));
    };

    const handleDecrement = () => {
        onChange(Math.max(value - step, min));
    };

    return (
        <div>
            <button onClick={handleDecrement}>-</button>
            <input
                type='number'
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
            />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
}
