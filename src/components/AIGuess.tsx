"use client";

import React from "react";

interface AIGuessProps {
  guess: string;
  isLoading: boolean;
  error: string | null;
  history: string[];
}

export default function AIGuess({ guess, isLoading, error, history }: AIGuessProps) {
  return (
    <div className="ai-guess">
      <div className="guess-header">
        <span className="ai-icon">🤖</span>
        <span className="guess-title">AI 猜测</span>
      </div>

      <div className="guess-content">
        {isLoading && (
          <div className="loading-state">
            <span className="loading-dots">正在思考</span>
            <div className="loading-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && <div className="error-state">{error}</div>}

        {guess && !isLoading && (
          <div className="guess-result">
            <span className="guess-text">{guess}</span>
          </div>
        )}

        {!guess && !isLoading && !error && (
          <div className="empty-state">
            画点什么，让AI来猜猜看！
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="guess-history">
          <span className="history-label">历史猜测:</span>
          <div className="history-items">
            {history.map((item, index) => (
              <span key={index} className="history-item">{item}</span>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .ai-guess {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
          animation: slideUp 0.3s ease;
        }

        .guess-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ai-icon {
          font-size: 24px;
        }

        .guess-title {
          font-family: 'Fredoka', cursive;
          font-size: 18px;
          color: var(--secondary);
        }

        .guess-content {
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .loading-dots {
          color: var(--text-secondary);
          animation: pulse 1s infinite;
        }

        .loading-animation {
          display: flex;
          gap: 4px;
        }

        .loading-animation span {
          width: 8px;
          height: 8px;
          background: var(--secondary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .loading-animation span:nth-child(1) { animation-delay: -0.32s; }
        .loading-animation span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .error-state {
          color: var(--primary);
          text-align: center;
          padding: 12px;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 8px;
          border: 1px solid var(--primary);
        }

        .guess-result {
          text-align: center;
        }

        .guess-text {
          font-size: 24px;
          font-family: 'Fredoka', cursive;
          color: var(--accent);
          animation: slideUp 0.3s ease;
        }

        .empty-state {
          color: var(--text-secondary);
          font-style: italic;
        }

        .guess-history {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .history-label {
          font-size: 12px;
          color: var(--text-secondary);
          margin-right: 8px;
        }

        .history-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .history-item {
          font-size: 12px;
          padding: 4px 10px;
          background: rgba(78, 205, 196, 0.2);
          color: var(--secondary);
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
