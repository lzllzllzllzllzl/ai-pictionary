"use client";

import React, { useState, useRef, useCallback } from "react";
import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import AIGuess from "@/components/AIGuess";
import Prompts from "@/components/Prompts";

export default function Home() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(8);
  const [hasContent, setHasContent] = useState(false);
  const [guess, setGuess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasChange = useCallback((hasContent: boolean) => {
    setHasContent(hasContent);
  }, []);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasContent(false);
        setGuess("");
        setError(null);
      }
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");

      const response = await fetch("/api/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "猜测失败");
      }

      setGuess(data.guess);
      setHistory((prev) => [data.guess, ...prev.slice(0, 4)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "猜测失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>🎨 你画我猜</h1>
        <p className="subtitle">让AI猜猜你画的是什么</p>
      </header>

      <main className="main">
        <div className="canvas-wrapper">
          <Canvas
            ref={canvasRef}
            color={color}
            brushSize={brushSize}
            onCanvasChange={handleCanvasChange}
          />
        </div>

        <Toolbar
          color={color}
          brushSize={brushSize}
          onColorChange={setColor}
          onBrushSizeChange={setBrushSize}
          onClear={handleClear}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasContent={hasContent}
        />

        <AIGuess
          guess={guess}
          isLoading={isSubmitting}
          error={error}
          history={history}
        />

        <Prompts
          currentPrompt={currentPrompt}
          onSelectPrompt={setCurrentPrompt}
        />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 24px;
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header h1 {
          font-size: 48px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 16px;
        }

        .main {
          max-width: 700px;
          margin: 0 auto;
        }

        .canvas-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px var(--shadow);
        }

        .canvas-wrapper canvas {
          display: block;
          width: 100%;
          height: auto;
          cursor: crosshair;
          background: var(--canvas-bg);
        }

        @media (max-width: 768px) {
          .container {
            padding: 16px;
          }

          .header h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}
