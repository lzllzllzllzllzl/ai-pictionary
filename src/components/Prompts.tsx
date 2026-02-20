"use client";

import React, { useState } from "react";

interface PromptsProps {
  currentPrompt: string | null;
  onSelectPrompt: (prompt: string) => void;
}

const PROMPT_CATEGORIES = {
  Animals: ["猫", "狗", "鸟", "鱼", "兔子", "熊", "大象", "长颈鹿"],
  Objects: ["汽车", "飞机", "自行车", "手机", "电脑", "书", "时钟", "伞"],
  Nature: ["太阳", "月亮", "星星", "树", "花", "山", "海", "云"],
  Food: ["苹果", "香蕉", "汉堡", "Pizza", "冰淇淋", "蛋糕", "面条", "寿司"],
};

export default function Prompts({ currentPrompt, onSelectPrompt }: PromptsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRandomPrompt = () => {
    const categories = Object.values(PROMPT_CATEGORIES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomPrompt = randomCategory[Math.floor(Math.random() * randomCategory.length)];
    onSelectPrompt(randomPrompt);
  };

  return (
    <div className="prompts">
      <div className="prompts-header">
        <h3>绘画提示词</h3>
        <button className="random-btn" onClick={getRandomPrompt}>
          🎲 随机选择
        </button>
      </div>

      {currentPrompt && (
        <div className="current-prompt">
          <span className="prompt-label">当前主题:</span>
          <span className="prompt-word">{currentPrompt}</span>
        </div>
      )}

      <button 
        className="toggle-btn" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "收起提示词 ▲" : "查看更多提示词 ▼"}
      </button>

      {isExpanded && (
        <div className="prompt-categories">
          {Object.entries(PROMPT_CATEGORIES).map(([category, prompts]) => (
            <div key={category} className="prompt-category">
              <h4>{category}</h4>
              <div className="prompt-items">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    className={`prompt-item ${currentPrompt === prompt ? "active" : ""}`}
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .prompts {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
        }

        .prompts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .prompts-header h3 {
          font-size: 18px;
          color: var(--primary);
        }

        .random-btn {
          padding: 8px 16px;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .random-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 230, 109, 0.4);
        }

        .current-prompt {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .prompt-label {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .prompt-word {
          font-family: 'Fredoka', cursive;
          font-size: 24px;
          color: var(--primary);
        }

        .toggle-btn {
          width: 100%;
          padding: 10px;
          background: transparent;
          color: var(--text-secondary);
          font-size: 14px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .prompt-categories {
          margin-top: 16px;
          display: grid;
          gap: 16px;
          animation: slideUp 0.3s ease;
        }

        .prompt-category h4 {
          font-size: 14px;
          color: var(--secondary);
          margin-bottom: 8px;
        }

        .prompt-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .prompt-item {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border-radius: 16px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .prompt-item:hover {
          background: rgba(78, 205, 196, 0.2);
          color: var(--secondary);
        }

        .prompt-item.active {
          background: var(--secondary);
          color: var(--bg-primary);
        }
      `}</style>
    </div>
  );
}
