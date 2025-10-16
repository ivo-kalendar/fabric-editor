import { Canvas, Circle, Rect, Triangle } from "fabric";
import { useEffect, useRef, useState } from "react";
import { LuCircle, LuRectangleHorizontal, LuTriangle } from "react-icons/lu";
import Settings from "./Settings.jsx";
import Video from "./Video.jsx";
import CanvasSettings from "./CanvasSettings.jsx";

export default function App() {
    /** @type {React.RefObject<Canvas | null>} */
    const canvasRef = useRef(null);
    /** @type {[Canvas, React.Dispatch<React.SetStateAction<Canvas>>]} */
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
        if (!canvas) return;
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
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new Circle({
            radius: 50,
            left: 50,
            top: 100,
            fill: "#f2225d",
            // stroke: "black",
        });
        canvas.add(circle);
        canvas.renderAll();
    };

    const addTriangle = () => {
        if (!canvas) return;
        const triangle = new Triangle({
            width: 100,
            height: 60,
            left: 50,
            top: 100,
            fill: "#225df2",
            // stroke: "black",
        });
        canvas.add(triangle);
        canvas.renderAll();
    };

    return (
        <div className="App">
            <div className="Toolbar">
                <button onClick={addRectangle}>
                    <LuRectangleHorizontal />
                </button>

                <button onClick={addCircle}>
                    <LuCircle />
                </button>

                <button onClick={addTriangle}>
                    <LuTriangle />
                </button>

                <Video canvas={canvas} canvasRef={canvasRef} />
            </div>
            <canvas id="canvas" ref={canvasRef} />

            <Settings canvas={canvas} />
            {/* <CanvasSettings canvas={canvas} /> */}
        </div>
    );
}
