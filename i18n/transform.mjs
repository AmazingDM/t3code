// @effect-diagnostics-next-line nodeBuiltinImport:off -- Build-time Vite plugin and CLI utility.
import * as NodeFS from "node:fs";
// @effect-diagnostics-next-line nodeBuiltinImport:off
import * as NodePath from "node:path";
// @effect-diagnostics-next-line nodeBuiltinImport:off
import * as NodeURL from "node:url";
import { parseSync } from "vite-plus";

const I18N_DIR = NodePath.dirname(NodeURL.fileURLToPath(import.meta.url));
const REPO_ROOT = NodePath.resolve(I18N_DIR, "..");
function normalizeFsPath(p) {
  return p.replace(/\\/g, "/").replace(/^[a-z]:\//, (m) => m.toUpperCase());
}

const WEB_SRC_DIR = normalizeFsPath(NodePath.join(REPO_ROOT, "apps", "web", "src"));
const LOCALE_MODULE_PATH = `${WEB_SRC_DIR}/i18n/locale`;

export const TS_CONSTANT_WHITELIST = new Map([
  [
    "components/settings/settingsSearch.ts",
    new Set(["SETTINGS_SECTION_LABELS", "SETTINGS_NAV_GROUPS", "SETTINGS_SEARCH_ITEMS"]),
  ],
  ["sidebarProjectGrouping.ts", new Set(["PROJECT_GROUPING_MODE_LABELS"])],
  ["threadNotifications.ts", new Set(["NOTIFICATION_MODE_LABELS"])],
  ["components/BranchToolbar.logic.ts", new Set(["WORKTREE_SUBMODULES_LABELS"])],
  [
    "components/pullRequest/pullRequestDetail.logic.ts",
    new Set(["PULL_REQUEST_MERGE_METHOD_LABELS"]),
  ],
  ["components/pullRequest/pullRequestList.logic.ts", new Set(["GROUP_LABELS"])],
  [
    "components/pullRequest/pullRequestListOptions.ts",
    new Set(["INVOLVEMENT_TABS", "STATE_TABS", "SORT_OPTIONS"]),
  ],
  ["components/usage/usageShortcuts.ts", new Set(["METRIC_OPTIONS", "WINDOW_OPTIONS"])],
]);

const DISPLAY_JSX_ATTR_EXACT = new Set([
  "title",
  "subtitle",
  "description",
  "placeholder",
  "label",
  "aria-label",
  "aria-description",
  "ariaLabel",
  "tooltip",
  "alt",
  "caption",
  "message",
  "detail",
  "disabledReason",
  "emptyMessage",
  "heading",
  "subheading",
]);

const DISPLAY_OBJECT_PROP_NAMES = new Set([
  "label",
  "title",
  "subtitle",
  "description",
  "heading",
  "subheading",
  "tooltip",
  "placeholder",
  "emptyMessage",
  "summary",
  "headline",
  "detail",
]);

const DEFAULT_PARAM_PROP_NAMES = new Set([
  "tooltip",
  "placeholder",
  "emptyMessage",
  "confirmLabel",
  "cancelLabel",
  "submitLabel",
]);

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00A0",
  middot: "\u00B7",
  hellip: "\u2026",
  mdash: "\u2014",
  ndash: "\u2013",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  rarr: "\u2192",
  larr: "\u2190",
  times: "\u00D7",
  bull: "\u2022",
  copy: "\u00A9",
  reg: "\u00AE",
};

function decodeJSXEntities(str) {
  if (!str.includes("&")) return str;
  return str.replace(/&(?:#x([0-9a-fA-F]+)|#(\d+)|([a-zA-Z]+));/g, (full, hex, dec, named) => {
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    if (dec) return String.fromCodePoint(Number.parseInt(dec, 10));
    if (named && Object.hasOwn(NAMED_ENTITIES, named)) return NAMED_ENTITIES[named];
    return full;
  });
}

export function cleanJSXText(raw) {
  const lines = raw.split(/\r\n|\n|\r/);
  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/[^ \t]/.test(lines[i])) lastNonEmptyLine = i;
  }
  let result = "";
  for (let i = 0; i < lines.length; i++) {
    const isFirstLine = i === 0;
    const isLastLine = i === lines.length - 1;
    const isLastNonEmptyLine = i === lastNonEmptyLine;
    let trimmedLine = lines[i].replace(/\t/g, " ");
    if (!isFirstLine) trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    if (!isLastLine) trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    if (trimmedLine) {
      if (!isLastNonEmptyLine) trimmedLine += " ";
      result += trimmedLine;
    }
  }
  return decodeJSXEntities(result);
}

const TAILWIND_RE =
  /\b(?:bg-|text-(?:xs|sm|base|lg|xl|2xl|muted|foreground|primary|destructive|warning|success)|border-|rounded-|flex-|grid-|px-|py-|pt-|pb-|pl-|pr-|mx-|my-|mt-|mb-|min-w-|max-w-|gap-|items-|justify-|hover:|focus:|focus-visible:|dark:|data-\[|aria-\[|shrink-0|truncate\b)/;

const BRAND_OR_TECH_EXACT = new Set([
  "T3 Code",
  "T3",
  "Claude",
  "Claude Code",
  "Codex",
  "Cursor",
  "OpenCode",
  "Grok",
  "Antigravity",
  "Gemini",
  "GitHub",
  "GitLab",
  "Codeberg",
  "Gitea",
  "Forgejo",
  "Bitbucket",
  "Git",
  "WSL",
  "SSH",
  "MCP",
  "ACP",
  "Tailscale",
  "Cloudflare",
  "OpenTelemetry",
  "1Password",
  "macOS",
  "Windows",
  "Linux",
  "iOS",
  "Android",
  "JSON",
  "YAML",
  "TOML",
  "HTML",
  "CSS",
  "URL",
  "HTTPS",
  "HTTP",
  "TLS",
  "OAuth",
  "API",
  "CLI",
  "IDE",
  "PR",
  "PRs",
  "Enter",
  "Esc",
  "Tab",
  "Shift",
  "Ctrl",
  "Alt",
  "Cmd",
  "English",
]);

export function isTranslatableText(raw) {
  if (typeof raw !== "string") return false;
  const core = raw.trim();
  if (core.length < 2 || core.length > 500) return false;
  if (/[\u4e00-\u9fff]/.test(core)) return false;
  if (!/[A-Za-z]{2,}/.test(core)) return false;
  if (BRAND_OR_TECH_EXACT.has(core)) return false;

  const withoutPlaceholders = core.replace(/\{\d+\}/g, "").trim();
  if (!/[A-Za-z]{2,}/.test(withoutPlaceholders)) return false;

  if (
    /^(?:https?:\/\/|wss?:\/\/|mailto:|tel:|file:\/\/|data:|\/|\.\/|\.\.\/|~\/|[A-Za-z]:\\)/.test(
      core,
    )
  ) {
    return false;
  }
  if (/^(?:\*\.[a-z0-9]+|[a-z]+\/[a-z0-9.+-]+)$/i.test(core)) return false;
  if (TAILWIND_RE.test(core)) return false;

  if (!withoutPlaceholders.includes(" ")) {
    if (!/^[A-Z]/.test(withoutPlaceholders)) return false;
    if (/[a-z][A-Z]/.test(withoutPlaceholders)) return false;
    if (withoutPlaceholders.includes("_")) return false;
    if (/\.[a-z0-9]{1,5}$/i.test(withoutPlaceholders)) return false;
  }

  return true;
}

export function extractPlaceholders(text) {
  return [...text.matchAll(/\{(\d+)\}/g)].map((m) => m[1]).toSorted();
}

export function isValidTranslation(enKey, zhValue) {
  if (typeof zhValue !== "string" || zhValue.trim().length === 0) return false;
  const enPh = extractPlaceholders(enKey);
  const zhPh = extractPlaceholders(zhValue);
  if (enPh.length !== zhPh.length) return false;
  for (let i = 0; i < enPh.length; i++) {
    if (enPh[i] !== zhPh[i]) return false;
  }
  return true;
}

export function normalizeRelFile(filename, webSrcDir = WEB_SRC_DIR) {
  const clean = normalizeFsPath(filename.split("?")[0]);
  const normBase = normalizeFsPath(webSrcDir);
  if (clean.startsWith(`${normBase}/`)) {
    return clean.slice(normBase.length + 1);
  }
  return NodePath.posix.basename(clean);
}

export function shouldProcessModuleId(id, webSrcDir = WEB_SRC_DIR) {
  const [rawPath, query = ""] = id.split("?");
  if (query && /(?:^|&)(?:worker|sharedworker|raw|url|inline)(?:=|&|$)/.test(query)) {
    return false;
  }
  const clean = normalizeFsPath(rawPath);
  const normBase = normalizeFsPath(webSrcDir);
  if (!clean.startsWith(`${normBase}/`)) return false;
  const rel = clean.slice(normBase.length + 1);
  if (rel === "i18n/locale.ts") return false;
  if (/\.(?:test|spec|renders)\.[cm]?[jt]sx?$/.test(rel)) return false;
  if (/\.browser\.test\.[cm]?[jt]sx?$/.test(rel)) return false;
  if (/[Ww]orker\.[cm]?[jt]sx?$/.test(rel)) return false;

  if (rel.endsWith(".tsx")) return true;
  if (rel.endsWith(".ts") && TS_CONSTANT_WHITELIST.has(rel)) return true;
  return false;
}

function unwrapExpr(node) {
  let cur = node;
  while (
    cur &&
    (cur.type === "ParenthesizedExpression" ||
      cur.type === "TSAsExpression" ||
      cur.type === "TSSatisfiesExpression" ||
      cur.type === "TSNonNullExpression" ||
      cur.type === "TSTypeAssertion")
  ) {
    cur = cur.expression;
  }
  return cur;
}

function getJsxElementName(openingElement) {
  const nameNode = openingElement?.name;
  if (!nameNode) return "";
  if (nameNode.type === "JSXIdentifier") return nameNode.name;
  if (nameNode.type === "JSXMemberExpression" && nameNode.property?.type === "JSXIdentifier") {
    return nameNode.property.name;
  }
  return "";
}

function isDisplayJsxAttr(attrName, elementName) {
  if (elementName === "SettingResetButton" && attrName === "label") return false;
  if (DISPLAY_JSX_ATTR_EXACT.has(attrName)) return true;
  if (/(?:Label|Tooltip|Placeholder|Title|Description|Heading)$/.test(attrName)) return true;
  return false;
}

function getPropertyKeyName(prop) {
  if (!prop || prop.computed) return null;
  if (prop.key?.type === "Identifier") return prop.key.name;
  if (prop.key?.type === "Literal" && typeof prop.key.value === "string") return prop.key.value;
  return null;
}

function splitPadding(str) {
  const leading = /^\s*/.exec(str)?.[0] ?? "";
  const trailing = /\s*$/.exec(str)?.[0] ?? "";
  const core = str.slice(leading.length, str.length - trailing.length);
  return { leading, core, trailing };
}

function escapeTemplateChunk(chunk) {
  return chunk.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function buildTemplateZhExpression(zhFull, exprCodes) {
  const parts = zhFull.split(/\{(\d+)\}/g);
  const usedOrder = [];
  for (let i = 1; i < parts.length; i += 2) {
    usedOrder.push(Number.parseInt(parts[i], 10));
  }
  const inOrder =
    usedOrder.length === exprCodes.length && usedOrder.every((idx, pos) => idx === pos);

  if (inOrder) {
    let tpl = "`";
    for (let i = 0; i < parts.length; i += 2) {
      tpl += escapeTemplateChunk(parts[i]);
      if (i + 1 < parts.length) {
        const idx = Number.parseInt(parts[i + 1], 10);
        tpl += `\${${exprCodes[idx]}}`;
      }
    }
    tpl += "`";
    return tpl;
  }

  const paramNames = exprCodes.map((_, i) => `_i${i}`);
  let tpl = "`";
  for (let i = 0; i < parts.length; i += 2) {
    tpl += escapeTemplateChunk(parts[i]);
    if (i + 1 < parts.length) {
      const idx = Number.parseInt(parts[i + 1], 10);
      tpl += `\${_i${idx}}`;
    }
  }
  tpl += "`";
  return `((${paramNames.join(", ")}) => ${tpl})(${exprCodes.join(", ")})`;
}

const VLQ_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function encodeVlqValue(num) {
  let vlq = num < 0 ? (-num << 1) + 1 : num << 1;
  let out = "";
  do {
    let digit = vlq & 31;
    vlq >>>= 5;
    if (vlq > 0) digit |= 32;
    out += VLQ_CHARS[digit];
  } while (vlq > 0);
  return out;
}

export function applyPatchesWithSourceMap(code, filename, patches, prepend = "") {
  const sorted = [...patches].toSorted((a, b) => a.start - b.start || a.end - b.end);
  const deduped = [];
  let lastEnd = 0;
  for (const p of sorted) {
    if (p.start < lastEnd) continue;
    deduped.push(p);
    lastEnd = p.end;
  }

  const outParts = [];
  const lineSegments = [[]];
  let genCol = 0;
  let origLine = 0;
  let origCol = 0;
  let cursor = 0;

  const pushGeneratedOnly = (str) => {
    if (!str) return;
    outParts.push(str);
    const lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      genCol += lines[i].length;
      if (i < lines.length - 1) {
        genCol = 0;
        lineSegments.push([]);
      }
    }
  };

  const advanceOriginalOnly = (slice) => {
    for (let i = 0; i < slice.length; i++) {
      if (slice.charCodeAt(i) === 10) {
        origLine++;
        origCol = 0;
      } else {
        origCol++;
      }
    }
  };

  const emitUnchanged = (slice) => {
    if (!slice) return;
    outParts.push(slice);
    const lines = slice.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const chunk = lines[i];
      if (chunk.length > 0) {
        lineSegments[lineSegments.length - 1].push([genCol, 0, origLine, origCol]);
        genCol += chunk.length;
        origCol += chunk.length;
      }
      if (i < lines.length - 1) {
        genCol = 0;
        origLine++;
        origCol = 0;
        lineSegments.push([]);
      }
    }
  };

  const emitReplacement = (text, startOrigLine, startOrigCol) => {
    if (!text) return;
    outParts.push(text);
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const chunk = lines[i];
      if (chunk.length > 0) {
        lineSegments[lineSegments.length - 1].push([genCol, 0, startOrigLine, startOrigCol]);
        genCol += chunk.length;
      }
      if (i < lines.length - 1) {
        genCol = 0;
        lineSegments.push([]);
      }
    }
  };

  pushGeneratedOnly(prepend);

  for (const patch of deduped) {
    if (patch.start > cursor) {
      emitUnchanged(code.slice(cursor, patch.start));
    }
    const patchOrigLine = origLine;
    const patchOrigCol = origCol;
    if (patch.end > patch.start) {
      advanceOriginalOnly(code.slice(patch.start, patch.end));
    }
    emitReplacement(patch.text, patchOrigLine, patchOrigCol);
    cursor = patch.end;
  }

  if (cursor < code.length) {
    emitUnchanged(code.slice(cursor));
  }

  let prevSrc = 0;
  let prevOrigLine = 0;
  let prevOrigCol = 0;
  const mappings = lineSegments
    .map((segs) => {
      let prevGenCol = 0;
      return segs
        .map(([gCol, srcIdx, oLine, oCol]) => {
          const encoded =
            encodeVlqValue(gCol - prevGenCol) +
            encodeVlqValue(srcIdx - prevSrc) +
            encodeVlqValue(oLine - prevOrigLine) +
            encodeVlqValue(oCol - prevOrigCol);
          prevGenCol = gCol;
          prevSrc = srcIdx;
          prevOrigLine = oLine;
          prevOrigCol = oCol;
          return encoded;
        })
        .join(",");
    })
    .join(";");

  return {
    code: outParts.join(""),
    map: {
      version: 3,
      file: NodePath.posix.basename(filename.replace(/\\/g, "/")),
      sources: [filename],
      sourcesContent: [code],
      names: [],
      mappings,
    },
  };
}

function lookupTranslation(dict, relFile, key) {
  if (!dict) return null;
  const scoped = `${relFile}::${key}`;
  const candidate = Object.hasOwn(dict, scoped)
    ? dict[scoped]
    : Object.hasOwn(dict, key)
      ? dict[key]
      : null;
  if (!candidate || !isValidTranslation(key, candidate)) return null;
  return candidate;
}

export function analyzeModule(code, filename, options = {}) {
  const { dict = null, webSrcDir = WEB_SRC_DIR, localeModulePath = LOCALE_MODULE_PATH } = options;
  const cleanFile = normalizeFsPath(filename.split("?")[0]);
  const normLocaleModulePath = normalizeFsPath(localeModulePath);
  const relFile = normalizeRelFile(cleanFile, webSrcDir);
  const isTsx = cleanFile.endsWith(".tsx");
  const tsAllowedConsts = !isTsx ? TS_CONSTANT_WHITELIST.get(relFile) : null;
  if (!isTsx && !tsAllowedConsts) {
    return { extracted: new Map(), transformed: null };
  }

  const parsed = parseSync(cleanFile, code);
  if (parsed.errors && parsed.errors.length > 0) {
    return { extracted: new Map(), transformed: null };
  }

  const extracted = new Map();
  const patches = [];

  const recordCandidate = (coreKey, context) => {
    if (!extracted.has(coreKey)) {
      extracted.set(coreKey, { key: coreKey, files: new Set([relFile]), context });
    } else {
      extracted.get(coreKey).files.add(relFile);
    }
  };

  const handleStringLiteralExpr = (litNode, context, wrapJsxBraces = false) => {
    if (!litNode || litNode.type !== "Literal" || typeof litNode.value !== "string") return false;
    const { leading, core, trailing } = splitPadding(litNode.value);
    const hasOverride =
      dict && (Object.hasOwn(dict, `${relFile}::${core}`) || Object.hasOwn(dict, core));
    if (!hasOverride && !isTranslatableText(core)) return false;
    recordCandidate(core, context);
    const zh = lookupTranslation(dict, relFile, core);
    if (zh) {
      const zhPadded = `${leading}${zh}${trailing}`;
      if (zhPadded === litNode.value) return false;
      const expr = `__IS_ZH__ ? ${JSON.stringify(zhPadded)} : ${JSON.stringify(litNode.value)}`;
      patches.push({
        start: litNode.start,
        end: litNode.end,
        text: wrapJsxBraces ? `{${expr}}` : `(${expr})`,
      });
      return true;
    }
    return false;
  };

  const handleTemplateLiteralExpr = (tplNode, context) => {
    if (!tplNode || tplNode.type !== "TemplateLiteral") return false;
    if (tplNode.expressions.length > 4) return false;
    const rawJoined = tplNode.quasis
      .map((q, idx) => {
        const chunk = q.value.cooked ?? q.value.raw;
        return idx < tplNode.expressions.length ? `${chunk}{${idx}}` : chunk;
      })
      .join("");
    const { leading, core, trailing } = splitPadding(rawJoined);
    const hasOverride =
      dict && (Object.hasOwn(dict, `${relFile}::${core}`) || Object.hasOwn(dict, core));
    if (!hasOverride && !isTranslatableText(core)) return false;
    recordCandidate(core, context);
    const zh = lookupTranslation(dict, relFile, core);
    if (zh) {
      const zhFull = `${leading}${zh}${trailing}`;
      if (zhFull === rawJoined) return false;
      if (tplNode.expressions.length === 0) {
        patches.push({
          start: tplNode.start,
          end: tplNode.end,
          text: `(__IS_ZH__ ? ${JSON.stringify(zhFull)} : ${code.slice(tplNode.start, tplNode.end)})`,
        });
        return true;
      }
      const exprCodes = tplNode.expressions.map((e) => code.slice(e.start, e.end));
      const zhTplExpr = buildTemplateZhExpression(zhFull, exprCodes);
      patches.push({
        start: tplNode.start,
        end: tplNode.end,
        text: `(__IS_ZH__ ? ${zhTplExpr} : ${code.slice(tplNode.start, tplNode.end)})`,
      });
      return true;
    }
    return false;
  };

  const handleDisplayExpr = (rawNode, context) => {
    const node = unwrapExpr(rawNode);
    if (!node) return;
    if (node.type === "Literal" && typeof node.value === "string") {
      handleStringLiteralExpr(node, context, false);
      return;
    }
    if (node.type === "TemplateLiteral") {
      handleTemplateLiteralExpr(node, context);
      return;
    }
    if (node.type === "ConditionalExpression") {
      const cons = unwrapExpr(node.consequent);
      const alt = unwrapExpr(node.alternate);
      if (
        dict &&
        cons?.type === "Literal" &&
        alt?.type === "Literal" &&
        typeof cons.value === "string" &&
        typeof alt.value === "string" &&
        ((cons.value === "" && (alt.value === "s" || alt.value === "es")) ||
          (alt.value === "" && (cons.value === "s" || cons.value === "es")))
      ) {
        patches.push({
          start: node.start,
          end: node.end,
          text: `(__IS_ZH__ ? "" : (${code.slice(node.start, node.end)}))`,
        });
        return;
      }
      handleDisplayExpr(node.consequent, context);
      handleDisplayExpr(node.alternate, context);
      return;
    }
    if (node.type === "LogicalExpression") {
      if (node.operator === "??" || node.operator === "||") {
        handleDisplayExpr(node.left, context);
      }
      handleDisplayExpr(node.right, context);
    }
  };

  const handleDisplayRecordOrList = (constName, initNode) => {
    const unwrapped = unwrapExpr(initNode);
    if (!unwrapped) return;

    if (constName === "SETTINGS_SEARCH_ITEMS" && unwrapped.type === "ArrayExpression") {
      for (const el of unwrapped.elements) {
        const item = unwrapExpr(el);
        if (!item || item.type !== "ObjectExpression") continue;
        let titleProp = null;
        let searchTermsProp = null;
        for (const prop of item.properties) {
          if (prop.type !== "Property") continue;
          const k = getPropertyKeyName(prop);
          if (k === "title") titleProp = prop;
          if (k === "searchTerms") searchTermsProp = prop;
        }
        if (!titleProp) continue;
        const titleVal = unwrapExpr(titleProp.value);
        if (!titleVal || titleVal.type !== "Literal" || typeof titleVal.value !== "string") {
          continue;
        }
        const enTitle = titleVal.value;
        const translated = handleStringLiteralExpr(titleVal, "settings-search-title", false);
        if (translated) {
          if (searchTermsProp) {
            const stVal = unwrapExpr(searchTermsProp.value);
            if (stVal && stVal.type === "ArrayExpression") {
              patches.push({
                start: stVal.start + 1,
                end: stVal.start + 1,
                text: `${JSON.stringify(enTitle)}, `,
              });
            }
          } else {
            patches.push({
              start: titleProp.end,
              end: titleProp.end,
              text: `, searchTerms: [${JSON.stringify(enTitle)}]`,
            });
          }
        }
      }
      return;
    }

    if (unwrapped.type === "ObjectExpression") {
      for (const prop of unwrapped.properties) {
        if (prop.type !== "Property") continue;
        const keyName = getPropertyKeyName(prop);
        if (constName === "DISPLAY_LOCALE_LABELS" && (keyName === "zh-Hans" || keyName === "en")) {
          continue;
        }
        const propVal = unwrapExpr(prop.value);
        if (!propVal) continue;
        if (propVal.type === "Literal" || propVal.type === "TemplateLiteral") {
          handleDisplayExpr(propVal, `dict:${constName}`);
        } else if (propVal.type === "ObjectExpression") {
          for (const subProp of propVal.properties) {
            if (subProp.type !== "Property") continue;
            const subKey = getPropertyKeyName(subProp);
            if (subKey && DISPLAY_OBJECT_PROP_NAMES.has(subKey)) {
              handleDisplayExpr(subProp.value, `dict:${constName}.${subKey}`);
            }
          }
        }
      }
      return;
    }

    if (unwrapped.type === "ArrayExpression") {
      for (const el of unwrapped.elements) {
        const item = unwrapExpr(el);
        if (!item || item.type !== "ObjectExpression") continue;
        for (const prop of item.properties) {
          if (prop.type !== "Property") continue;
          const keyName = getPropertyKeyName(prop);
          if (keyName && DISPLAY_OBJECT_PROP_NAMES.has(keyName)) {
            handleDisplayExpr(prop.value, `list:${constName}.${keyName}`);
          }
        }
      }
    }
  };

  const isToastCall = (callNode) => {
    const callee = callNode.callee;
    if (!callee) return false;
    if (callee.type === "Identifier") {
      return callee.name === "stackedThreadToast" || callee.name === "toast";
    }
    if (
      callee.type === "MemberExpression" &&
      callee.object?.type === "Identifier" &&
      callee.property?.type === "Identifier"
    ) {
      if (callee.object.name === "toastManager" && callee.property.name === "add") return true;
      if (callee.object.name === "toast") return true;
    }
    return false;
  };

  function walk(node) {
    if (!node || typeof node !== "object") return;

    if (node.type === "VariableDeclarator" && node.id?.type === "Identifier" && node.init) {
      const constName = node.id.name;
      if (!isTsx) {
        if (tsAllowedConsts?.has(constName)) {
          handleDisplayRecordOrList(constName, node.init);
        }
        return;
      }
      if (
        /(?:LABELS|DESCRIPTIONS|TITLES|COPY|MESSAGES|HEADINGS|PLACEHOLDERS|TOOLTIPS|OPTIONS)$/.test(
          constName,
        )
      ) {
        handleDisplayRecordOrList(constName, node.init);
        return;
      }
    }

    if (!isTsx) {
      for (const key of Object.keys(node)) {
        const val = node[key];
        if (Array.isArray(val)) val.forEach(walk);
        else if (val && typeof val === "object") walk(val);
      }
      return;
    }

    if (node.type === "AssignmentPattern" && node.left?.type === "Identifier") {
      if (DEFAULT_PARAM_PROP_NAMES.has(node.left.name)) {
        handleDisplayExpr(node.right, `default-prop:${node.left.name}`);
      }
    }

    if (node.type === "CallExpression" && isToastCall(node)) {
      for (const arg of node.arguments) {
        const unwrappedArg = unwrapExpr(arg);
        if (unwrappedArg?.type === "Literal" || unwrappedArg?.type === "TemplateLiteral") {
          handleDisplayExpr(unwrappedArg, "toast");
        } else if (unwrappedArg?.type === "ObjectExpression") {
          for (const prop of unwrappedArg.properties) {
            if (prop.type !== "Property") continue;
            const k = getPropertyKeyName(prop);
            if (k === "title" || k === "description") {
              handleDisplayExpr(prop.value, `toast:${k}`);
            }
          }
        }
      }
    }

    if (node.type === "JSXElement" || node.type === "JSXFragment") {
      const elemName = node.openingElement ? getJsxElementName(node.openingElement) : "";
      if (
        elemName === "code" ||
        elemName === "pre" ||
        elemName === "kbd" ||
        elemName === "svg" ||
        elemName === "style" ||
        elemName === "script"
      ) {
        return;
      }
      if (node.openingElement?.attributes) {
        for (const attr of node.openingElement.attributes) {
          if (attr.type !== "JSXAttribute" || attr.name?.type !== "JSXIdentifier" || !attr.value) {
            continue;
          }
          const attrName = attr.name.name;
          if (!isDisplayJsxAttr(attrName, elemName)) continue;
          if (attr.value.type === "Literal" && typeof attr.value.value === "string") {
            handleStringLiteralExpr(attr.value, `attr:${attrName}`, true);
          } else if (attr.value.type === "JSXExpressionContainer") {
            handleDisplayExpr(attr.value.expression, `attr:${attrName}`);
          }
        }
      }

      for (const child of node.children ?? []) {
        if (child.type === "JSXText") {
          const cleaned = cleanJSXText(child.raw ?? child.value ?? "");
          const { leading, core, trailing } = splitPadding(cleaned);
          const hasOverride =
            dict && (Object.hasOwn(dict, `${relFile}::${core}`) || Object.hasOwn(dict, core));
          if (hasOverride || isTranslatableText(core)) {
            recordCandidate(core, "jsx-text");
            const zh = lookupTranslation(dict, relFile, core);
            if (zh) {
              const zhPadded = `${leading}${zh}${trailing}`;
              if (zhPadded !== cleaned) {
                patches.push({
                  start: child.start,
                  end: child.end,
                  text: `{__IS_ZH__ ? ${JSON.stringify(zhPadded)} : ${JSON.stringify(cleaned)}}`,
                });
              }
            }
          }
        } else if (child.type === "JSXExpressionContainer") {
          handleDisplayExpr(child.expression, "jsx-expr");
        }
      }
    }

    for (const key of Object.keys(node)) {
      const val = node[key];
      if (Array.isArray(val)) {
        for (const item of val) {
          if (item && typeof item === "object") walk(item);
        }
      } else if (val && typeof val === "object") {
        walk(val);
      }
    }
  }

  walk(parsed.program);

  if (!dict || patches.length === 0) {
    return { extracted, transformed: null };
  }

  const alreadyHasIsZh = parsed.program.body.some((stmt) => {
    if (stmt.type === "ImportDeclaration") {
      return stmt.specifiers?.some((s) => s.local?.name === "__IS_ZH__");
    }
    return false;
  });

  let prepend = "";
  if (!alreadyHasIsZh) {
    let relImport = NodePath.posix.relative(
      NodePath.posix.dirname(cleanFile),
      normLocaleModulePath,
    );
    if (!relImport.startsWith(".")) relImport = `./${relImport}`;
    prepend = `import { __IS_ZH__ } from ${JSON.stringify(relImport)};\n`;
  }

  const transformed = applyPatchesWithSourceMap(code, cleanFile, patches, prepend);
  return { extracted, transformed };
}

export function loadMergedDictionary(i18nDir = I18N_DIR) {
  const autoFile = NodePath.join(i18nDir, "zh.auto.json");
  const overrideFile = NodePath.join(i18nDir, "zh.override.json");
  const autoDict = NodeFS.existsSync(autoFile)
    ? JSON.parse(NodeFS.readFileSync(autoFile, "utf8"))
    : {};
  const overrideDict = NodeFS.existsSync(overrideFile)
    ? JSON.parse(NodeFS.readFileSync(overrideFile, "utf8"))
    : {};
  return { ...autoDict, ...overrideDict };
}

export function t3i18nPlugin(options = {}) {
  const i18nDir = options.i18nDir ?? I18N_DIR;
  const webSrcDir = options.webSrcDir ?? WEB_SRC_DIR;
  const localeModulePath = options.localeModulePath ?? LOCALE_MODULE_PATH;
  let dict = {};

  const reloadDict = () => {
    dict = loadMergedDictionary(i18nDir);
  };

  return {
    name: "t3code-i18n-zh",
    enforce: "pre",
    buildStart() {
      reloadDict();
    },
    configureServer(server) {
      const autoFile = NodePath.join(i18nDir, "zh.auto.json");
      const overrideFile = NodePath.join(i18nDir, "zh.override.json");
      server.watcher.add([autoFile, overrideFile]);
      server.watcher.on("change", (changed) => {
        const norm = NodePath.resolve(changed);
        if (norm === NodePath.resolve(autoFile) || norm === NodePath.resolve(overrideFile)) {
          reloadDict();
          server.ws.send({ type: "full-reload" });
        }
      });
    },
    transform(code, id) {
      if (process.env.VITEST) return null;
      if (!shouldProcessModuleId(id, webSrcDir)) return null;
      const { transformed } = analyzeModule(code, id, {
        dict,
        webSrcDir,
        localeModulePath,
      });
      return transformed;
    },
  };
}
