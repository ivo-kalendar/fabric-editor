/**
 * @typedef {object} CanvasSettingsType
 * @property {import("fabric").Canvas} canvas
 */

import { useEffect, useState } from "react";

/**
 * @typedef {import("react").HTMLAttributes<HTMLDivElement>} Type_HTMLDivProps
 */

/**
 * @typedef {object} Type_JSXProps
 * @property {import("react").ReactNode} [children]
 * @property {import("react").CSSProperties} [style]
 * @property {string} [className]
 */

/**
 * @param {Type_JSXProps & Type_HTMLDivProps & CanvasSettingsType} props
 * @returns {import("react").JSX.Element}
 */
export default function CanvasSettings({ canvas }) {
    const [canvasWidth, setCanvasWidth] = useState(500);
    const [canvasHeight, setCanvasHeight] = useState(400);

    useEffect(() => {
        if (!canvas) return;
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        canvas.renderAll();
    }, [canvasHeight, canvasWidth, canvas]);

    const handldeWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        if (int_value >= 0) setCanvasWidth(int_value);
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        if (int_value >= 0) setCanvasHeight(int_value);
    };

    return (
        <div className="Settings">
            <div style={{ display: "flex" }}>
                <label>Width</label>
                <input type="number" value={canvasWidth} onChange={handldeWidthChange} min={0} />

                <label>Height</label>
                <input type="number" value={canvasHeight} onChange={handleHeightChange} min={0} />
            </div>
        </div>
    );
}
