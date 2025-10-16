import { Canvas, Circle, Rect, Triangle, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import { LuCircle, LuRectangleHorizontal, LuTriangle } from "react-icons/lu";
import Settings from "./Settings.jsx";
import Video from "./Video.jsx";
import CanvasSettings from "./CanvasSettings.jsx";
import { clearGuidelines, handleObjectMoving } from "./snappingHelper.js";
import LayersList from "./LayersList.jsx";
import { HiPhoto } from "react-icons/hi2";

export default function App() {
    /** @type {React.RefObject<Canvas | null>} */
    const canvasRef = useRef(null);
    /** @type {[Canvas, React.Dispatch<React.SetStateAction<Canvas>>]} */
    const [canvas, setCanvas] = useState(null);

    const [guidelines, setGuidelines] = useState([]);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 500,
                height: 400,
                backgroundColor: "#808080",
            });

            initCanvas.renderAll();

            setCanvas(initCanvas);

            initCanvas.on("object:moving", (e) => {
                handleObjectMoving(initCanvas, e.target, guidelines, setGuidelines);
            });

            initCanvas.on("object:modified", () => {
                clearGuidelines(initCanvas, guidelines, setGuidelines);
            });

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    const addRectangle = () => {
        if (!canvas) return;
        canvas.discardActiveObject();
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
        canvas.discardActiveObject();
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

    const addPhoto = async () => {
        if (!canvas) return;
        canvas.discardActiveObject();

        const img_url =
            "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg";
        const photo = await FabricImage.fromURL(img_url);

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scale = Math.min(canvasWidth / photo.width, canvasHeight / photo.height);

        photo.set({
            left: 0,
            top: 0,
            scaleX: scale,
            scaleY: scale,
        });

        canvas.add(photo);
        canvas.renderAll();
    };

    const addTriangle = () => {
        if (!canvas) return;
        canvas.discardActiveObject();
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

                <button onClick={addPhoto}>
                    {" "}
                    <HiPhoto />
                </button>

                <Video canvas={canvas} canvasRef={canvasRef} />
            </div>
            <canvas id="canvas" ref={canvasRef} />

            <Settings canvas={canvas} />
            {/* <CanvasSettings canvas={canvas} /> */}
            <LayersList canvas={canvas} />
        </div>
    );
}
