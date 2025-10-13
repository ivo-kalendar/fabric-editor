import { Canvas, Rect } from "fabric";
import { useEffect, useRef, useState } from "react";
import { LuRectangleHorizontal } from "react-icons/lu";

export default function App() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 500,
                height: 400,
                backgroundColor: "#808080",
            });

            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    const addRectangle = () => {
        if (canvas) {
            const rect = new Rect({
                width: 100,
                height: 60,
                left: 50,
                top: 100,
                fill: "#225df2",
                // stroke: "black",
            });
            canvas.add(rect);
            canvas.renderAll();
        }
    }

    return (
        <div className="App">
            <div className="Toolbar">
                <button onClick={addRectangle} >
                    <LuRectangleHorizontal />
                </button>
            </div>
            <canvas id="canvas" ref={canvasRef} />
        </div>
    );
}
