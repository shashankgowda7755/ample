import React, { useState, useRef, useEffect } from 'react';

interface ImageCropperProps {
    image: string;
    onComplete: (croppedImage: string) => void;
    onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onComplete, onCancel }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

    const cropSize = 300;

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageObj(img);
            // Center the image initially
            const minDim = Math.min(img.width, img.height);
            const initialScale = cropSize / minDim;
            setScale(initialScale);
        };
        img.src = image;
    }, [image]);

    useEffect(() => {
        if (!imageObj || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = cropSize;
        canvas.height = cropSize;

        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, cropSize, cropSize);

        // Draw scaled and positioned image
        const scaledWidth = imageObj.width * scale;
        const scaledHeight = imageObj.height * scale;

        ctx.drawImage(
            imageObj,
            position.x + (cropSize - scaledWidth) / 2,
            position.y + (cropSize - scaledHeight) / 2,
            scaledWidth,
            scaledHeight
        );
    }, [imageObj, scale, position]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - dragStart.x,
            y: touch.clientY - dragStart.y
        });
    };

    const handleComplete = () => {
        if (!canvasRef.current) return;

        // Create high-res output
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = 800;
        outputCanvas.height = 800;
        const ctx = outputCanvas.getContext('2d');

        if (ctx && imageObj) {
            const scaledWidth = imageObj.width * scale * (800 / cropSize);
            const scaledHeight = imageObj.height * scale * (800 / cropSize);
            const scaledX = position.x * (800 / cropSize);
            const scaledY = position.y * (800 / cropSize);

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 800, 800);

            ctx.drawImage(
                imageObj,
                scaledX + (800 - scaledWidth) / 2,
                scaledY + (800 - scaledHeight) / 2,
                scaledWidth,
                scaledHeight
            );
        }

        const croppedImage = outputCanvas.toDataURL('image/jpeg', 0.9);
        onComplete(croppedImage);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-3xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-center mb-4 gradient-text">Crop Your Photo</h3>

                <div className="relative mb-4">
                    {/* Crop area */}
                    <div className="relative overflow-hidden rounded-full mx-auto border-4 border-purple-500/50"
                        style={{ width: cropSize, height: cropSize }}>
                        <canvas
                            ref={canvasRef}
                            className="cursor-move"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleMouseUp}
                        />
                    </div>

                    {/* Instructions */}
                    <p className="text-center text-gray-400 text-sm mt-3">
                        Drag to reposition • Scroll to zoom
                    </p>
                </div>

                {/* Zoom Slider */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2 text-center">Zoom</label>
                    <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #d946ef 0%, #d946ef ${((scale - 0.5) / 2.5) * 100}%, rgba(255,255,255,0.1) ${((scale - 0.5) / 2.5) * 100}%, rgba(255,255,255,0.1) 100%)`
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleComplete}
                        className="flex-1 btn-primary px-4 py-3 rounded-xl font-bold"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
