/**
 * @typedef {object} FileExportType
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
 * @param {Type_JSXProps & Type_HTMLDivProps & FileExportType} props
 * @returns {import("react").JSX.Element}
 */
export default function FileExport({ canvas }) {
    const exportCanvasSVG = () => {
        if (!canvas) return;
        const svgData = canvas.toSVG();

        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "canvas.svg";
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportCanvasJSON = () => {
        if (!canvas) return;
        const jsonData = canvas.toJSON(["id", "version", "objects", "styleID", "zIndex"]);
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "canvas.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !canvas || file.type !== "application/json") return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                canvas.clear();
                canvas.loadFromJSON(jsonData);
            } catch (error) {
                console.error("Error loading JSON:", error);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <button onClick={exportCanvasSVG}>Export SVG</button>
            <button onClick={exportCanvasJSON}>Export JSON</button>
            <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
}
