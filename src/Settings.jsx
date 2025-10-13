import { useEffect, useState } from "react";

/**
 * @typedef {object} SettingsType
 * @property {import("fabric").Canvas} canvas
 */

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
 * Submit Button
 * @param {Type_JSXProps & Type_HTMLDivProps & SettingsType} props
 * @returns {import("react").JSX.Element}
 */
export default function Settings({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("");
    const [stroke, setStroke] = useState("");
    const [strokeWidth, setStrokeWidth] = useState("");

    useEffect(() => {
        addEvents();
    }, [canvas]);

    function addEvents() {
        if (!canvas) return;

        canvas.on("selection:created", handleFirstSelected);
        canvas.on("selection:updated", handleFirstSelected);
        canvas.on("selection:cleared", handleClear);
        canvas.on("object:modified", handleSelectedTarget);
        canvas.on("object:scaling", handleSelectedTarget);
    }

    const handleFirstSelected = (e) => handleObjectSelection(e.selected[0]);
    const handleSelectedTarget = (e) => handleObjectSelection(e.target);

    const handleClear = () => {
        setSelectedObject(null);
        clearSettings();
    };

    /** @param {import("fabric").Object} object */
    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        canvas.bringObjectForward(object);
        canvas.bringObjectToFront(object);

        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setDiameter("");
            setColor(object.fill);
            setStroke(object.stroke);
            setStrokeWidth(object.strokeWidth);
        } else if (object.type === "circle") {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setWidth("");
            setHeight("");
            setColor(object.fill);
            setStroke(object.stroke);
            setStrokeWidth(object.strokeWidth);
        }
    };

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setDiameter("");
        setColor("");
        setStroke("");
        setStrokeWidth("");
    };

    const handldeWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        setWidth(int_value);

        if (!!selectedObject && selectedObject.type === "rect" && int_value >= 0) {
            selectedObject.set({ width: int_value / selectedObject.scaleX });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        setHeight(int_value);

        if (!!selectedObject && selectedObject.type === "rect" && int_value >= 0) {
            selectedObject.set({ height: int_value / selectedObject.scaleY });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        setDiameter(int_value);

        if (!!selectedObject && selectedObject.type === "circle" && int_value >= 0) {
            selectedObject.set({ radius: int_value / 2 / selectedObject.scaleX });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleColorChange = (e) => {
        const value = e.target.value;

        setColor(value);

        if (!!selectedObject) {
            selectedObject.set({ fill: value });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleStrokeChange = (e) => {
        const value = e.target.value;

        setStroke(value);

        if (!!selectedObject) {
            selectedObject.set({ stroke: value });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleStrokeWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const int_value = parseInt(value, 10);

        setStrokeWidth(int_value);

        if (!!selectedObject && int_value >= 0) {
            selectedObject.set({ strokeWidth: int_value });
            selectedObject.setCoords();
            canvas.renderAll();
        }
    };

    return (
        <div className="Settings">
            {selectedObject && (
                <>
                    {selectedObject.type === "rect" && (
                        <>
                            <div>
                                <label>Width</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={width || ""}
                                    onChange={handldeWidthChange}
                                />
                            </div>

                            <div>
                                <label>Height</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={height || ""}
                                    onChange={handleHeightChange}
                                />
                            </div>
                        </>
                    )}

                    {selectedObject.type === "circle" && (
                        <>
                            <div>
                                <label>Diameter</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={diameter || ""}
                                    onChange={handleDiameterChange}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label>Color</label>
                        <input type="color" value={color || ""} onChange={handleColorChange} />
                    </div>

                    <div>
                        <label>Stroke Width</label>
                        <input
                            type="number"
                            value={strokeWidth || ""}
                            min={0}
                            onChange={handleStrokeWidthChange}
                        />
                    </div>

                    <div>
                        <label>Stroke</label>
                        <input type="color" value={stroke || ""} onChange={handleStrokeChange} />
                    </div>
                </>
            )}
        </div>
    );
}
