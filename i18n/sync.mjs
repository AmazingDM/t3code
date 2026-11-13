// @effect-diagnostics-next-line nodeBuiltinImport:off -- CLI sync script.
import * as NodeFS from "node:fs";
// @effect-diagnostics-next-line nodeBuiltinImport:off
import * as NodePath from "node:path";
// @effect-diagnostics-next-line nodeBuiltinImport:off
import * as NodeURL from "node:url";

import { analyzeModule, isValidTranslation, shouldProcessModuleId } from "./transform.mjs";

const I18N_DIR = NodePath.dirname(NodeURL.fileURLToPath(import.meta.url));
const REPO_ROOT = NodePath.resolve(I18N_DIR, "..");
const WEB_SRC_DIR = NodePath.join(REPO_ROOT, "apps", "web", "src").replace(/\\/g, "/");
const AUTO_JSON = NodePath.join(I18N_DIR, "zh.auto.json");
const OVERRIDE_JSON = NodePath.join(I18N_DIR, "zh.override.json");

function walkFiles(dir, out = []) {
  for (const entry of NodeFS.readdirSync(dir, { withFileTypes: true })) {
    const full = NodePath.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      if (shouldProcessModuleId(full, WEB_SRC_DIR)) {
        out.push(full);
      }
    }
  }
  return out;
}

export function collectCandidates(webSrcDir = WEB_SRC_DIR) {
  const files = walkFiles(webSrcDir);
  const all = new Map();
  for (const file of files) {
    const code = NodeFS.readFileSync(file, "utf8");
    const { extracted } = analyzeModule(code, file, { webSrcDir });
    for (const [key, meta] of extracted) {
      if (!all.has(key)) {
        all.set(key, { key, files: new Set(meta.files), context: meta.context });
      } else {
        for (const f of meta.files) all.get(key).files.add(f);
      }
    }
  }
  return all;
}

function sortJsonKeys(obj) {
  const sorted = {};
  for (const k of Object.keys(obj).toSorted()) {
    sorted[k] = obj[k];
  }
  return sorted;
}

const SYSTEM_PROMPT = `你是 T3 Code 桌面/Web 客户端（面向编程智能体的开源控制中心）的官方简体中文本地化专家。
请将输入的 JSON 对象中的英文 UI 文案翻译为地道、简洁、符合现代开发者工具（VS Code / Cursor / GitHub Desktop 风格）的简体中文，只输出合法的 JSON 对象（key 原样保留，value 为中文翻译）。

强制术语与规则：
1. 官方术语表：
   - agent -> 智能体；coding agent -> 编程智能体；subagent -> 子智能体
   - thread -> 线程；worktree -> 工作树；branch -> 分支；checkout -> 检出
   - environment -> 环境；provider -> 服务商；harness -> 接入层
   - settings -> 设置；keybindings -> 快捷键；archive -> 归档；pin/unpin -> 置顶/取消置顶
2. 保持英文不译的专有名词：T3 Code, Claude, Claude Code, Codex, Cursor, OpenCode, Grok, Antigravity, Gemini, Git, GitHub, GitLab, PR, diff, token, fork, MCP, ACP, WSL, SSH, Tailscale, OpenTelemetry, 1Password。
3. 占位符铁律：所有 {0}、{1}、{2} 占位符必须原样、完整保留，数量和编号严禁增删或改写！
4. 严禁使用破折号 "—"，如需连接请使用中文逗号、冒号或括号。`;

async function translateBatchWithOpenAI(batchObj, apiKey, baseUrl, model) {
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(batchObj) },
      ],
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LLM HTTP ${response.status}: ${body.slice(0, 300)}`);
  }
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(content);
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const extractOnly = args.has("--extract-only");
  const pruneUnused = args.has("--prune");
  const dumpUntranslated = process.argv.find((a) => a.startsWith("--dump-missing="))?.split("=")[1];

  const candidates = collectCandidates(WEB_SRC_DIR);
  const autoDict = NodeFS.existsSync(AUTO_JSON)
    ? JSON.parse(NodeFS.readFileSync(AUTO_JSON, "utf8"))
    : {};
  const overrideDict = NodeFS.existsSync(OVERRIDE_JSON)
    ? JSON.parse(NodeFS.readFileSync(OVERRIDE_JSON, "utf8"))
    : {};

  if (pruneUnused) {
    for (const k of Object.keys(autoDict)) {
      if (!k.includes("::") && !candidates.has(k)) {
        delete autoDict[k];
      }
    }
  }

  const missing = [];
  for (const [key, meta] of candidates) {
    if (Object.hasOwn(overrideDict, key) && isValidTranslation(key, overrideDict[key])) continue;
    if (Object.hasOwn(autoDict, key) && isValidTranslation(key, autoDict[key])) continue;
    const files = [...meta.files];
    if (
      files.length > 0 &&
      files.every((file) => {
        const scopedKey = `${file}::${key}`;
        return (
          (Object.hasOwn(overrideDict, scopedKey) &&
            isValidTranslation(key, overrideDict[scopedKey])) ||
          (Object.hasOwn(autoDict, scopedKey) && isValidTranslation(key, autoDict[scopedKey]))
        );
      })
    ) {
      continue;
    }
    missing.push({ key, context: meta.context, files });
  }

  const gtEnPath = NodePath.join(WEB_SRC_DIR, "i18n", "translations", "en.json");
  const gtZhPath = NodePath.join(WEB_SRC_DIR, "i18n", "translations", "zh.json");
  if (NodeFS.existsSync(gtEnPath) && NodeFS.existsSync(gtZhPath)) {
    const gtEn = JSON.parse(NodeFS.readFileSync(gtEnPath, "utf8"));
    const gtZh = JSON.parse(NodeFS.readFileSync(gtZhPath, "utf8"));
    const gtEnKeys = Object.keys(gtEn);
    const gtMissing = gtEnKeys.filter((k) => !Object.hasOwn(gtZh, k));
    console.log(
      `[i18n/sync] Official GT keys: ${gtEnKeys.length} | zh.json covered: ${gtEnKeys.length - gtMissing.length} | Missing: ${gtMissing.length}`,
    );
  }

  console.log(
    `[i18n/sync] Total UI keys: ${candidates.size} | Translated: ${candidates.size - missing.length} | Missing: ${missing.length}`,
  );

  if (dumpUntranslated) {
    NodeFS.writeFileSync(dumpUntranslated, JSON.stringify(missing, null, 2) + "\n", "utf8");
    console.log(`[i18n/sync] Wrote ${missing.length} missing entries to ${dumpUntranslated}`);
  }

  if (extractOnly || missing.length === 0) {
    NodeFS.writeFileSync(AUTO_JSON, JSON.stringify(sortJsonKeys(autoDict), null, 2) + "\n", "utf8");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const baseUrl = process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  if (!apiKey) {
    console.log(
      "[i18n/sync] OPENAI_API_KEY not set; skipping remote LLM call (existing translations preserved).",
    );
    return;
  }

  const batchSize = 50;
  for (let i = 0; i < missing.length; i += batchSize) {
    const chunk = missing.slice(i, i + batchSize);
    const inputObj = Object.fromEntries(chunk.map((item) => [item.key, item.key]));
    console.log(
      `[i18n/sync] Translating batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(missing.length / batchSize)}...`,
    );
    const result = await translateBatchWithOpenAI(inputObj, apiKey, baseUrl, model);
    for (const item of chunk) {
      const zh = result[item.key];
      if (isValidTranslation(item.key, zh)) {
        autoDict[item.key] = zh;
      }
    }
    NodeFS.writeFileSync(AUTO_JSON, JSON.stringify(sortJsonKeys(autoDict), null, 2) + "\n", "utf8");
  }
}

if (NodePath.resolve(process.argv[1] ?? "") === NodeURL.fileURLToPath(import.meta.url)) {
  await main();
}
