import {storeToRefs} from "pinia"
import requestsEditor from "~/mixins/requestsEditor";
import {editorStore} from "~/store/editorStore";
import {fabric} from "fabric";
import {ref} from "vue";
import {MAX_WIDTH_ZOOM, MIN_WIDTH_ZOOM} from "~/configuration/configEditor";

export default function mixinEditor() {
    const editor = editorStore();
    const {clearTempImages, changeCurrentZoom, cleanGeneratedImages, toggleHasSelectElement} = editor;
    const {
        uploadedImage,
        currentWidthEraser,
        isSelectedAllElement,
        currentZoom,

    } = storeToRefs(editor);
    const {saveCanvas} = requestsEditor();

    let selectableImages = ref([]);

    function useAsset(path) {
        const assets = import.meta.glob('~/assets/**/*', {
            eager: true,
            import: 'default',
        });
        return assets['/assets/images/main-page/' + path];
    }

    function getDrawCursor() {
        const brushSize = currentWidthEraser.value * currentZoom.value;
        const circle = `
		<svg
			height="${brushSize}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="${brushSize}"
				cy="${brushSize}"
        stroke-width="3"
        fill="rgba(54,226,255,0.1)"
        stroke="#36e2ff"
				r="${brushSize - 3}"
			/>
			<circle
				cx="${brushSize}"
				cy="${brushSize}"
        stroke-width="3"
        fill="rgba(54,226,255,0)"
        stroke="#36e2ff"
				r="${brushSize - 3}"
			/>
		</svg>`;
        return `data:image/svg+xml;base64,${window.btoa(circle)}`;
    }

    function setParameterToCanvas(canvas, images) {
        canvas.freeDrawingBrush.color = "#1f2023";
        canvas.freeDrawingBrush.width = currentWidthEraser.value;
        canvas.defaultCursor = `url(${useAsset('cursor-pointer.svg')})10 10, grab`;
        // canvas.moveCursor = `url(${useAsset('grabbing.svg')})10 10, grabbing`;
        canvas.on("path:created", opt => {
            if (!canvas._objects.length) return;
            opt.path.globalCompositeOperation = 'destination-out';
            opt.path.set({
                '_type': 'path',
                selectable: false,
                hasRotatingPoint: false,
                hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`,
            });
            opt.path.bringToFront();

            images.forEach((image) => {
                if (image.selectable) {
                    image.set({
                        selectable: false,
                        // hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                        // moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`,
                    });
                }
            });
            canvas.renderAll();
        });

        //отменяет вращение по оси и изменение размера в ширину и в высоту для выделеной группы картинок
        fabric.Group.prototype._controlsVisibility = {
            ml: false,
            mt: false,
            mr: false,
            mb: false,
            mtr: false
        };
    }

    function loadJsonProject(canvas, images) {
        canvas.renderAll();
        const objects = canvas?.getObjects();
        const savedImages = objects.filter(o => o.type === 'image');
        if (savedImages) {
            images = savedImages;
        }
        handleImages(images, true, canvas);
    }

    function setParametersToFrame(canvas) {
        let frame = new fabric.Rect({
            _type: 'frame',
            stroke: "rgb(54, 226, 255)",
            fill: 'rgba(54, 226, 255, 0)',
            width: 512,
            height: 512,
            cornerStyle: 'rect',
            cornerStrokeColor: "rgba(54, 226, 255, 1)",
            transparentCorners: false,
            cornerColor: "rgba(54, 226, 255, 1)",
            cornerSize: 9,
            selectionBackgroundColor: 'rgba(54, 226, 255, 0.1)',
            hasRotatingPoint: false,
            borderColor: "rgba(54, 226, 255, 0.8)",
            hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
            moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`,
            left: canvas.width / 2,
            top: canvas.height / 2,
            selectable: true,
            erasable: false,
            strokeWidth: 1,
            guides: {},
            originX: 'center',
            originY: 'center',
            lockScalingFlip: true,
            lockRotation: true,
            minScaleLimit: 0.5,
            strokeUniform: true,
        });

        frame.setControlsVisibility({
            mtr: false
        });

        frame.set('visible', true);
        return frame;
    }

    function changeFrameVisibility(visible, canvas, frame) {
        canvas.setActiveObject(frame);
        frame.bringToFront();
        frame.set('visible', visible);

        if (!visible) {
            canvas.discardActiveObject();
        }
        canvas.renderAll();
    }

    function showFrame(canvas, frame) {
        changeFrameVisibility(true, canvas, frame);
    }

    function hideFrame(canvas, frame) {
        changeFrameVisibility(false, canvas, frame);
    }

    function addImageToCanvas(canvas, images, generatedImage, frame) {
        if (uploadedImage.value?.length) {
            fabric.Image.fromURL(uploadedImage.value, image => {
                image.set({
                    hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                    moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`
                });
                images.push(image);
                canvas.add(image);
                autoSaveCanvas(canvas);
                canvas.renderAll();
            });

            clearTempImages();
        } else if (generatedImage) {
            const width = frame.getScaledWidth();
            const height = frame.getScaledHeight();
            fabric.Image.fromURL(generatedImage, image => {
                image.scaleToWidth(width);
                image.scaleToHeight(height);

                image.set({
                    selectable: false,
                    hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                    moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`
                });
                images.push(image);
                canvas.add(image);
                autoSaveCanvas(canvas);
                canvas.renderAll();
            }, {
                top: frame.top - (height / 2),
                left: frame.left - (width / 2),
            });

            frame.bringToFront();
            cleanGeneratedImages();
        }
    }

    function autoSaveCanvas(canvas) {
        let currentDataCanvas = getCanvasJSON(canvas);
        // let snapShotURL = getDataUrl(true);

        if (!currentDataCanvas) {
            return;
        }
        saveCanvas(currentDataCanvas);
    }

    function getCanvasJSON(canvas) {
        let json = canvas?.toJSON([
            'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling',
            "hasRotatingPoint", "erasable", "hoverCursor", "_controlsVisibility", "hoverCursor", "moveCursor",
            "scaleX", "scaleY", "selectable", "evented", "borderColor", "cornerColor", "cornerSize", "cornerStrokeColor", "cornerStyle",
            "b", "stroke", "fill", "opacity", "selectionBackgroundColor", "strokeWidth", "transparentCorners", "visible", "_type",
            "_task_id", "_img_id", "lockScalingFlip", "minScaleLimit", "strokeUniform"
        ]);
        // filter lines for more optimal size
        json.objects = json.objects.filter(o => o.type !== 'line');
        json.objects = json.objects.filter(o => o._type !== 'frame');
        json.objects = json.objects.filter(o => o._type !== 'frame_loader');

        if (json.objects.length) {
            return JSON.stringify(json);
        } else {
            return null;
        }
    }

    function changeZoom(zoom, canvas) {
        canvas.zoomToPoint({
            x: (canvas.width) / 2, y: canvas.height / 2
        }, zoom);
        canvas.setZoom(zoom);
    }

    function handleClickDown(event, canvas) {
        if (event.button === 1) {
            toggleHasSelectElement(true);
        }

        if (isSelectedAllElement.value) {
            canvas.isDragging = true;
            canvas.selection = false;
            canvas.lastPosX = event.clientX;
            canvas.lastPosY = event.clientY;
        }
        canvas.renderAll();
    }

    function handleClickUp(event, canvas) {
        if (event.button === 1) {
            toggleHasSelectElement(false);
        }
        canvas.setViewportTransform(canvas.viewportTransform);
        canvas.isDragging = false;
        canvas.selection = true;
        canvas.renderAll();
    }

    function downloadImage(canvas, frame, images) {
        hideFrame(canvas, frame);
        const fileName = `НейроХолст.png`;
        const link = document.createElement("a");
        link.href = getDataUrl(canvas, images);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        showFrame(canvas, frame);
    }

    function getDataUrl(canvas, images, thumbnail = false, multiplier = 1) {
        // get outermost coordinates
        const coords = handleImages(images);
        let left = coords.left;
        let right = coords.right;
        let top = coords.top;
        let bottom = coords.bottom;
        canvas.requestRenderAll();

        const vpt = [...canvas.viewportTransform];
        canvas.viewportTransform = [1, 0, 1, 0, 0, 0];

        const dataURL = canvas.toDataURL({
            format: 'png',
            left: left,
            top: top,
            width: right - left,
            height: bottom - top,
            multiplier: thumbnail ? 420 / (right - left) : multiplier
        })
        canvas.viewportTransform = vpt;

        return dataURL;
    }

    function handleImages(images, isLoad, canvas) {
        let left;
        let right;
        let top;
        let bottom;
        for (const image of images) {
            let il = image.left ? image.left : 0;
            if (left === undefined || il < left) {
                left = il;
            }
            let ir = il + image.getScaledWidth();
            if (right === undefined || ir > right) {
                right = ir;
            }
            let it = image.top ? image.top : 0;
            if (top === undefined || it < top) {
                top = it;
            }
            let ib = it + image.getScaledHeight();
            if (bottom === undefined || ib > bottom) {
                bottom = ib;
            }

            if(isLoad){
                // load images from html element
                const imgHtml = document.createElement('img');
                imgHtml.src = image.get('src');
                imgHtml.crossOrigin = "anonymous"
                imgHtml.onload = function () {
                    image.setElement(imgHtml);
                }

                // zoom to fit image
                const zoomW = canvas.width / (right - left)
                const zoomH = canvas.height / (bottom - top)
                changeCurrentZoom(Math.min(zoomW, zoomH) * 0.6)
                canvas.renderAll()
            }
        }
        return {left, right, top, bottom}
    }

    function handleHasSelectionAllElements(isSelected, canvas, images) {
        console.log('hasSelected' , isSelected)
        if (isSelected) {

            // canvas.discardActiveObject();
            // canvas.defaultCursor = `url(${useAsset('grabbing.svg')})10 10, grab`;

            selectableImages.value = images.filter((image) => image.selectable);

            images.forEach(image => {
                image.set({
                    selectable: false,
                    // hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                    // moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`
                })
            })
        } else {
            selectableImages.value.forEach(image => {
                image.set({
                    selectable: true,
                    // hoverCursor: `url(${useAsset('hand.svg')})10 10, grab`,
                    // moveCursor: `url(${useAsset('grabbing.svg')})10 10, grabbing`
                })
            })

            selectableImages.value = [];
            // canvas.defaultCursor = `url(${useAsset('hand.svg')})10 10, grab`;
            // canvas.moveCursor = `url(${useAsset('grabbing.svg')})10 10, grabbing`;
        }
        // canvas.renderAll();
    }

    function handleMouseWheel(event, canvas) {
        event.e.preventDefault()
        event.e.stopPropagation()
        if (event.e.ctrlKey || event.e.metaKey) {
            const delta = event.e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > MAX_WIDTH_ZOOM) zoom = MAX_WIDTH_ZOOM;
            if (zoom < MIN_WIDTH_ZOOM) zoom = MIN_WIDTH_ZOOM;
            canvas.zoomToPoint({
                x: event.e.offsetX,
                y: event.e.offsetY
            }, zoom);
            changeCurrentZoom(zoom);
        } else if (event.e.shiftKey) {
            const e = event.e;
            const vpt = canvas.viewportTransform;
            if (vpt) {
                vpt[4] += e.deltaY;
                vpt[5] -= e.deltaX;
                canvas.requestRenderAll();
            }
        } else {
            const e = event.e;
            const vpt = canvas.viewportTransform;
            if (vpt) {
                vpt[4] -= e.deltaX;
                vpt[5] += e.deltaY;
                canvas.requestRenderAll();
            }
        }
    }

    function setCurrentWidthEraser(canvas, widthEraser) {
        canvas.set({
            freeDrawingCursor: `url(${getDrawCursor()})${widthEraser / 2} ${widthEraser / 2}, crosshair`
        })
    }

    return {
        getDrawCursor,
        setParameterToCanvas,
        loadJsonProject,
        setParametersToFrame,
        changeFrameVisibility,
        showFrame,
        hideFrame,
        addImageToCanvas,
        autoSaveCanvas,
        changeZoom,
        handleClickDown,
        handleClickUp,
        downloadImage,
        handleHasSelectionAllElements,
        handleMouseWheel,
        setCurrentWidthEraser
    }
}
