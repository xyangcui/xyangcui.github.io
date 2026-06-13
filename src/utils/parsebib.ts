import bibtexParse from "bibtex-parse-js";

// 可选：从外部导入标签映射
// import { publicationTags } from '@/data/publicationTags';

export function parseBib(
  raw: string,
  tagsMapping?: Record<string, string[]>   // 新增参数：标签映射表
) {
  return bibtexParse.toJSON(raw).map((entry) => {
    const t = entry.entryTags;
    const key = entry.citationKey;

    // 根据 citationKey 获取标签，没有则空数组
    const tags = tagsMapping?.[key] ?? [];

    return {
      title: clean(t.title),
      authors: formatAuthors(t.author ?? ""),
      year: clean(t.year),
      journal: clean(t.journal ?? t.booktitle ?? ""),
      abstract: clean(t.abstract),
      Abstract: clean(t.abstract), // 兼容你现在的大写 Abstract
      doi: clean(t.doi),
      citeinfo: key,
      bibtex: getRawBibtex(raw, key),
      tags,                          // 这里使用了外部映射的 tags
    };
  });
}

function clean(value = "") {
  return value
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatAuthors(authors: string) {
  const authorList = authors.split(/\s+and\s+/i);
  
  return authorList
    .map((name, index) => {
      const parts = name.split(",").map((s) => s?.trim());
      
      let formatted: string;
      if (parts.length === 2 && parts[0] && parts[1]) {
        const [last, first] = parts;
        if (index === 0) {
          // 第一作者：姓 名
          formatted = `${last} ${first}`;
        } else {
          // 其他作者：名 姓
          formatted = `${first} ${last}`;
        }
      } else {
        formatted = name;
      }
      return formatted;
    })
    .join(", ");
}

function getRawBibtex(raw: string, key: string) {
  const start = raw.indexOf(`{${key},`);
  if (start === -1) return "";

  const atStart = raw.lastIndexOf("@", start);
  const nextAt = raw.indexOf("\n@", start + 1);

  return raw.slice(atStart, nextAt === -1 ? raw.length : nextAt).trim();
}