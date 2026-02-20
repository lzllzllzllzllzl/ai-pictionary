"use client";

import React from "react";

interface ToolbarProps {
  color: string;
  brushSize: number;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  hasContent: boolean;
}

const COLORS = [
  "#000000",
  "#ff6b6b",
  "#4ecdc4",
  "#ffe66d",
  "#95e1d3",
  "#a855f7",
  "#f97316",
  "#3b82f6",
];

export default function Toolbar({
  color,
  brushSize,
  onColorChange,
  onBrushSizeChange,
  onClear,
  onSubmit,
  isSubmitting,
  hasContent,
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <span className="toolbar-label">颜色</span>
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`color-btn ${color === c ? "active" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => onColorChange(c)}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="toolbar-section">
        <span className="toolbar-label">画笔: {brushSize}px</span>
        <input
          type="range"
          min="2"
          max="30"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="brush-slider"
        />
      </div>

      <div className="toolbar-actions">
        <button className="btn btn-clear" onClick={onClear}>
          清空
        </button>
        <button
          className={`btn btn-submit ${isSubmitting ? "loading" : ""}`}
          onClick={onSubmit}
          disabled={isSubmitting || !hasContent}
        >
          {isSubmitting ? "猜测中..." : "让AI猜测"}
        </button>
      </div>

      <style jsx>{`
        .toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          background: var(--bg-secondary);
          border-radius: 12px;
          margin-top: 16px;
        }

        .toolbar-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .toolbar-label {
          font-size: 14px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .color-picker {
          display: flex;
          gap: 8px;
        }

        .color-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .color-btn:hover {
          transform: scale(1.1);
        }

        .color-btn.active {
          border-color: var(--text-primary);
          box-shadow: 0 0 0 2px var(--secondary);
        }

        .brush-slider {
          width: 100px;
        }

        .toolbar-actions {
          display: flex;
          gap: 12px;
          margin-left: auto;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .btn-clear {
          background: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
        }

        .btn-clear:hover {
          background: var(--primary);
          color: var(--text-primary);
        }

        .btn-submit {
          background: var(--secondary);
          color: var(--bg-primary);
        }

        .btn-submit:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(78, 205, 196, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-submit.loading {
          animation: pulse 1s infinite;
        }

        @media (max-width: 768px) {
          .toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .toolbar-actions {
            margin-left: 0;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
