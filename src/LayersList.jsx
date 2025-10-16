import { Canvas } from "fabric";
import { useEffect, useState } from "react";

export default function LayersList({ canvas }) {
    const [layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);

    const addIdObject = (obj) => {
        if (!obj.id) {
            const timestamp = new Date().getTime()
            obj.id = `${obj.type}_${timestamp}`
        }
    }

    Canvas.prototype.updateZIndices = function () {
        const objects = this.getObjects();
        objects.forEach((obj, index) => {
            addIdObject(obj);
            obj.zIndex = index
        })
    };

    const updateLayers = () => {
        if (canvas) {
            canvas.updateZIndices();
            const objects = canvas
                .getObjects()
                .filter((obj) => !(obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-")))
                .map((obj) => ({ id: obj.id, type: obj.type, zIndex: obj.zIndex }));

            setLayers([...objects].reverse());
        }
    }

    const handleObjectSelected = (e) => {
        const selectedObject = e.selected ? e.selected[0] : null;

        if (selectedObject) {
            setSelectedLayer(selectedObject.id);
        } else {
            setSelectedLayer(null);
        }
    }

    const clearSelectedLayer = () => setSelectedLayer(null);

    const selectLayerInCanvas = (layerId) => {
        const layer = canvas.getObjects().find(obj => obj.id === layerId)
        if (layer) {
            canvas.setActiveObject(layer);
            canvas.renderAll();
        }
    }

    const removeAllLayers = () => {
        if (canvas) {
            canvas.updateZIndices();
            const objects = canvas
                .getObjects()
                .filter((obj) => !(obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-")))

            objects.forEach((obj) => {
                if (obj.type !== "activeselection") return
                canvas.remove(obj)
            });
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on("object:added", updateLayers);
            canvas.on("object:removed", updateLayers);
            canvas.on("object:modified", updateLayers);

            canvas.on("selection:cleared", removeAllLayers);

            canvas.on("selection:created", handleObjectSelected);
            canvas.on("selection:updated", handleObjectSelected);
            canvas.on("selection:cleared", clearSelectedLayer);

            updateLayers();

            return () => {
                canvas.off("object:added", updateLayers);
                canvas.off("object:removed", updateLayers);
                canvas.off("object:modified", updateLayers);

                canvas.off("selection:cleared", removeAllLayers);

                canvas.off("selection:created", handleObjectSelected);
                canvas.off("selection:updated", handleObjectSelected);
                canvas.off("selection:cleared", clearSelectedLayer);
            };
        }
    }, [canvas]);


    return (
        <div className="LayersList CanvasSettings">
            <ul>
                {layers.map((layer) => (
                    <li
                        key={layer.id}
                        className={layer.id === selectedLayer ? "selected-layer" : ""}
                        onClick={() => selectLayerInCanvas(layer.id)}
                    >
                        {layer.type} ({ layer.zIndex })
                    </li>
                ))}
            </ul>
        </div>
    )
}