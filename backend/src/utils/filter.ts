// utils/filter.ts
import { readFileSync } from 'fs';
import xss from 'xss';

const badWords = readFileSync('badwords.txt', 'utf-8').split('\n');

export function filterContent(content: string) {
  // XSS过滤
  const cleanContent = xss(content.trim());
  
  // 敏感词检测
  const hasBadWord = badWords.some(word => 
    new RegExp(`\\b${word}\\b`, 'i').test(cleanContent)
  );

  return {
    cleanContent,
    isValid: !hasBadWord && cleanContent.length >= 10
  };
}