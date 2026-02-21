# 🎰 FabricJS Canvas Editor - React & Vite Technical Demo

![Project Status](https://img.shields.io/badge/status-active-success)
![FabricJS](https://img.shields.io/badge/FabricJS-v7.2.0-blue)
![React](https://img.shields.io/badge/React-v19.2.4-61dafb)
![Vite](https://img.shields.io/badge/bundler-Vite-646cff)

A professional-grade **2D Vector Graphics Editor** built with **FabricJS** and **React 19**. This project demonstrates a high-performance implementation of a canvas-based design tool, featuring advanced object manipulation, magnetic snapping logic, and dynamic layer management.

Developed as a technical showcase for scalable React applications with complex state management and high-performance rendering.

🔗 **Author:** [ivo-kalendar](https://github.com/ivo-kalendar)

---

## 📸 Editor Interface

| Different Interactive Elements | Main UI With Rects |
|:---:|:---:|
| ![Different Interactive Elements](https://github.com/ivo-kalendar/fabric-editor/blob/master/public/scr_1.png) | ![Main UI With Rects](https://github.com/ivo-kalendar/fabric-editor/blob/master/public/scr_2.png) |
| **Empty Canvas** | **Pie Chart** |
| ![Empty Canvas](https://github.com/ivo-kalendar/fabric-editor/blob/master/public/scr_3.png) | ![Pie Chart](https://github.com/ivo-kalendar/fabric-editor/blob/master/public/scr_4.png) |

---

## ✨ Key Features & Technical Implementations

* **Advanced Canvas Interaction:** Full integration between React hooks and the FabricJS lifecycle, enabling real-time manipulation of `Rect`, `Circle`, `Triangle`, and `Image` objects.
* **Smart Snapping Engine (`snappingHelper.js`):**
    * **Magnetic Guidelines:** Objects automatically snap to canvas edges and center axes.
    * **Visual Feedback:** Dynamic dashed guidelines appear when alignment is achieved, providing a "Pro-tool" UX.
* **Dynamic Layer System:**
    * **Real-time Synchronization:** A dedicated `LayersList` component that tracks every object, its type, and its Z-index.
    * **Bidirectional Selection:** Clicking a layer in the list focuses the object on the canvas, and vice versa.
* **Contextual Settings:** An intelligent `Settings` panel that adapts its controls (Width, Height, Radius, Colors, Strokes) based on the selected object type.
* **Serialization & Persistence:**
    * **SVG Export:** High-quality vector output.
    * **JSON Export/Import:** Full state persistence, allowing users to save and resume projects.
* **Media Integration:** Support for asynchronous image loading and experimental video element rendering directly on the canvas.

## 🛠️ Tech Stack

* **Core Framework:** React 19 (Functional Components & Refs)
* **Graphics Engine:** FabricJS 7.2.0
* **Styling:** SASS (SCSS) for modular and maintainable CSS.
* **Icons:** `react-icons` (Lucide, HeroIcons, Ant Design).
* **Tooling:** Vite for ultra-fast development and optimized builds.

---

## 🚀 Installation & Setup

Ensure you have Node.js (version >= 20.19.0) installed.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/ivo-kalendar/fabric-editor.git](https://github.com/ivo-kalendar/fabric-editor.git)
    cd fabric-editor
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    > The application will be available at `http://localhost:5173`.

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 🏗️ Project Structure

The project follows a modular React architecture:

```text
fabric-editor/
├── 📁 public/                      # Static assets and screenshots
├── 📁 src/
│   ├── 📁 components/              # UI Components
│   │   ├── 📄 CanvasSettings.jsx   # Global canvas dimension controls
│   │   ├── 📄 FileExport.jsx       # SVG/JSON I/O logic
│   │   ├── 📄 LayersList.jsx       # Layer hierarchy & Z-index management
│   │   ├── 📄 Settings.jsx         # Contextual property editor
│   │   └── 📄 Video.jsx            # Video upload & canvas integration
│   ├── 📄 App.jsx                  # Main App & FabricJS initialization
│   ├── 📄 snappingHelper.js        # Custom math logic for guidelines & snapping
│   ├── 📄 main.jsx                 # React entry point
│   └── 📄 styles.scss              # Global styling and variables
├── 📄 index.html
├── 📄 package.json
└── 📄 vite.config.js
```

## 🔮 Future Roadmap

Since this is a functional prototype, the following enhancements are planned:

* [ ] **Multi-object transformation:** Support for grouping and scaling multiple selections simultaneously.
* [ ] **History Engine:** Implementation of Undo/Redo functionality using the Command pattern.
* [ ] **Audio Integration:** Dedicated Audio Manager for spatial SFX and canvas interactions.
* [ ] **Image Processing:** Custom GLSL shader filters (Brightness, Contrast, Invert, and Grayscale).
* [ ] **Text Engine:** Support for rich text editing and Google Fonts integration.

---

## 📄 License

This project is licensed under the **ISC License**.