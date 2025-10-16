/**
 * @typedef {object} VideoType
 * @property {import("fabric").Canvas} canvas
 * @property {React.RefObject<Canvas | null>} canvasRef
 */

import { FabricImage } from "fabric";
import { useRef, useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

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
 * @param {Type_JSXProps & Type_HTMLDivProps & VideoType} props
 * @returns {import("react").JSX.Element}
 */
export default function Video({ canvas, canvasRef }) {
    const [videoSrc, setVideoSrc] = useState(null);
    const [fabricVideo, setFabricVideo] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [loadedPercentage, setLoadedPercentage] = useState(0);
    const [uploadMessage, setUploadMessage] = useState("");
    const [recordingTime, setRecordingTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setLoadedPercentage(0);
        setVideoSrc(null);
        setUploadMessage("");

        const url = URL.createObjectURL(file);
        setVideoSrc(url);

        const videoElement = document.createElement("video");
        videoElement.src = url;
        videoElement.crossOrigin = "anonymous";

        videoElement.addEventListener("loadeddata", () => {
            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;
            videoElement.width = videoWidth;
            videoElement.height = videoHeight;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const scale = Math.min(canvasWidth / videoWidth, canvasHeight / videoHeight);

            canvas.renderAll();

            const fabricImage = new FabricImage(videoElement, {
                left: 0,
                top: 0,
                scaleX: scale,
                scaleY: scale,
            });

            console.log(fabricImage.type);

            setFabricVideo(fabricImage);
            canvas.add(fabricImage);
            canvas.renderAll();

            setUploadMessage("Video uploaded successfully.");
            setTimeout(() => {
                setUploadMessage("");
            }, 3000);
        });

        videoElement.addEventListener("progress", () => {
            if (videoElement.buffered.length > 0) {
                const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
                const duration = videoElement.duration;

                if (duration > 0) {
                    setLoadedPercentage((bufferedEnd / duration) * 100);
                }
            }
        });

        videoElement.addEventListener("error", (error) => {
            console.error("Error loading video", error);

            setUploadMessage(`Error uploading video: ${error.message}`);
            setTimeout(() => {
                setUploadMessage("");
            }, 3000);
        });

        videoElement.addEventListener("ended", () => setIsPlaying(false));
        videoRef.current = videoElement;
    };

    const handlePauseVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                videoRef.current.addEventListener("timeupdate", () => {
                    fabricVideo.setElement(videoRef.current);
                    canvas.renderAll();
                });
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleStopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
            canvas.renderAll();
        }
    };

    const handleVideoUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="video/*"
                onChange={handleVideoUpload}
            />

            <div>
                <button onClick={handleVideoUploadButtonClick}>
                    <AiOutlineVideoCameraAdd />
                </button>
            </div>

            {videoSrc && (
                <div className="ToolbarBottom">
                    <button onClick={handlePauseVideo}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>

                    <button onClick={handleStopVideo}>Stop</button>
                </div>
            )}
        </>
    );
}
