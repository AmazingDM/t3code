// @effect-diagnostics-next-line nodeBuiltinImport:off -- Build-time Vite/CLI plugin.
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
  ["components/chat/runtimeModeConfig.ts", new Set(["runtimeModeConfig"])],
  ["components/chat/threadDetailsItems.ts", new Set(["THREAD_DETAILS_ITEMS"])],
  ["components/chat/threadActivityAnnouncement.ts", new Set(["THREAD_STATUS_TEXT"])],
  ["components/chat/externalLinkContextMenu.ts", new Set(["EXTERNAL_LINK_CONTEXT_MENU_ITEMS"])],
  ["components/mcp/mcpApps.ts", new Set(["MCP_APPS", "OTHER_MCP_APP_STEPS"])],
  ["components/preview/previewConstants.ts", new Set(["PREVIEW_ERROR_CODE_MESSAGES"])],
  [
    "components/settings/AddProviderInstanceDialog.logic.ts",
    new Set(["ADD_PROVIDER_WIZARD_STEPS", "ACP_REGISTRY_WIZARD_STEPS", "LOCAL_ACP_WIZARD_STEPS"]),
  ],
  ["components/settings/providerStatus.ts", new Set(["COMPATIBILITY_TITLES", "label"])],
  [
    "components/settings/KeybindingsSettings.logic.ts",
    new Set(["KEYBINDING_GROUPS", "OTHER_KEYBINDING_GROUP", "COMMAND_LABEL_OVERRIDES"]),
  ],
  [
    "components/settings/customModelEditor.logic.ts",
    new Set(["EFFORT_CHOICES", "DESCRIPTOR_PRESETS_BY_KIND"]),
  ],
  ["components/settings/scheduledTasksSettings.logic.ts", new Set(["WEEKDAY_LABELS"])],
  ["components/settings/ProjectSettingsPanel.logic.ts", new Set(["SCRATCH_PROJECT_TITLE"])],
  ["components/usage/usagePriceForm.ts", new Set(["USAGE_PRICE_FIELDS"])],
  ["composerPlaceholder.ts", new Set(["DEFAULT_COMPOSER_PLACEHOLDER"])],
  ["hooks/useSettings.ts", new Set(["PRIMARY_SETTINGS_UNAVAILABLE_MESSAGE"])],
  ["lib/projectScriptKeybindings.ts", new Set(["PROJECT_SCRIPT_KEYBINDING_INVALID_MESSAGE"])],
  ["state/use-orchestration-command.ts", new Set(["ORCHESTRATION_OPERATE_DENIED_MESSAGE"])],
  ["components/permissions/usePermissionStatus.ts", new Set(["CHECK_FAILED_MESSAGE"])],
  ["projectIconColors.ts", new Set(["PROJECT_ICON_COLORS"])],
  ["projectIconOptions.ts", new Set(["PROJECT_EMOJIS"])],
  ["textGenerators.ts", new Set(["TEXT_GENERATOR_PRESETS"])],
]);

export const TS_FUNCTION_WHITELIST = new Map([
  [
    "components/BranchToolbar.logic.ts",
    new Set([
      "resolveEnvironmentOptionLabel",
      "resolveEnvModeLabel",
      "resolveCurrentWorkspaceLabel",
      "resolveLockedWorkspaceLabel",
      "resolvePreviousWorktreeLabel",
      "resolveBranchTriggerLabel",
    ]),
  ],
  [
    "components/desktopUpdate.logic.ts",
    new Set([
      "getArm64IntelBuildWarningDescription",
      "getDesktopUpdateButtonTooltip",
      "getDesktopUpdateInstallConfirmationMessage",
      "getDesktopUpdateDisabledReason",
      "getDesktopUpdateIdleTooltip",
    ]),
  ],
  [
    "components/settings/providerStatus.ts",
    new Set([
      "getRawProviderSummary",
      "getProviderSummary",
      "getProviderVersionAdvisoryPresentation",
    ]),
  ],
  [
    "components/GitActionsControl.logic.ts",
    new Set([
      "buildMenuItems",
      "resolveQuickAction",
      "resolveDefaultBranchActionDialogCopy",
      "resolveFeatureBranchUnavailableReason",
    ]),
  ],
  [
    "components/threadActionMenu.logic.ts",
    new Set(["buildDraftActionMenuItems", "buildThreadActionMenuItems"]),
  ],
  [
    "components/preview/fileExplorerLabel.ts",
    new Set([
      "revealInFileExplorerLabel",
      "revealInFileExplorerLabelForOs",
      "revealInFileExplorerLabelForKind",
    ]),
  ],
  ["editorLabels.ts", new Set(["editorLabelForPlatform", "openInEditorMenuLabel"])],
  ["lib/utils.ts", new Set(["getLocalFileManagerName"])],
  ["fileContextMenu.ts", new Set(["buildFileContextMenuItems"])],
  [
    "components/pullRequest/pullRequestLinkContextMenu.ts",
    new Set(["openOnHostLabel", "pullRequestLinkContextMenuItems"]),
  ],
  ["components/chat/MarkdownFileLink.logic.ts", new Set(["markdownFileCopyMenuItems"])],
  [
    "components/settings/ConnectionsSettings.logic.ts",
    new Set([
      "missingTailscaleEndpointDescription",
      "resolveLocalVersionStatusLabel",
      "parseManualDesktopSshTarget",
      "parseRemotePairingFields",
      "formatDesktopSshConnectionError",
      "endpointShareHint",
    ]),
  ],
  ["components/settings/ProjectDefaultsSettings.logic.ts", new Set(["providerNote"])],
  ["hooks/showThreadUndoNotice.ts", new Set(["threadUndoLabel"])],
  [
    "components/settings/SnapShotSettings.logic.ts",
    new Set([
      "snapShotStatus",
      "snapShotSetupSummary",
      "snapShotShortcutStatus",
      "snapShotSetupButtonLabel",
      "snapShotFeedbackUnavailableMessage",
      "snapShotDescription",
      "snapShotAccessibilityUnavailableMessage",
      "snapShotUnavailableMessage",
    ]),
  ],
  ["components/settings/SnapShotSetupDialog.logic.ts", new Set(["captureSetupCheckMessage"])],
  ["components/settings/browserImportWizard.logic.ts", new Set(["formatSkippedDomains"])],
  ["components/settings/deviceHostsSettings.logic.ts", new Set(["updateDeviceHosts"])],
  ["components/settings/SecretsSettings.logic.ts", new Set(["secretProviderUses"])],
  [
    "components/settings/KeybindingsSettings.logic.ts",
    new Set(["whenNodeRemoveLabel", "parseWhenExpressionDraft", "commandLabel"]),
  ],
  [
    "components/settings/SettingsPanels.logic.ts",
    new Set(["getChangedTypographySettingLabels", "getChangedBrowserSettingLabels"]),
  ],
  ["components/settings/customModelEditor.logic.ts", new Set(["validateDraft"])],
  [
    "components/settings/scheduledTasksSettings.logic.ts",
    new Set(["scheduleLabel", "scheduleDraftErrors", "webhookDeliveryLabel"]),
  ],
  ["components/settings/settingsScope.ts", new Set(["resolveSettingsScope"])],
  ["components/settings/settingsSearch.ts", new Set(["sourceControlHostSearchItems"])],
  [
    "components/settings/scopedSettings.ts",
    new Set([
      "planScopedSettingsPatch",
      "planScopedSettingsClear",
      "planProjectOverridesClear",
      "persistScopedSettingsPatch",
    ]),
  ],
  ["components/settings/SecretProviderDialog.logic.ts", new Set(["secretProviderFromDraft"])],
  [
    "components/settings/easDeviceHostsSettings.logic.ts",
    new Set(["newEasDeviceHost", "easSessionLimits"]),
  ],
  [
    "components/settings/simlockDeviceHostsSettings.logic.ts",
    new Set(["simlockDeviceHostProblem", "simlockLeaseLimits"]),
  ],
  [
    "components/settings/updateTrackSwitch.logic.ts",
    new Set(["prepareLocalTrackSwitch", "nothingToMove"]),
  ],
  ["components/settings/useScopedModelAvailability.ts", new Set(["useScopedModelDisabledReason"])],
  ["components/settings/useScopedSettings.ts", new Set(["useRunScopedPlan"])],
  [
    "components/ProviderUpdateLaunchNotification.logic.ts",
    new Set(["getProviderUpdatedDescription"]),
  ],
  ["components/chat/composerAttachmentFiles.ts", new Set(["fileAttachmentCapabilityBlockReason"])],
  ["components/chat/composerSubmission.ts", new Set(["getComposerPromptLengthValidationMessage"])],
  [
    "components/ChatView.logic.ts",
    new Set([
      "getAntigravitySendBlockReason",
      "buildExpiredTerminalContextToastCopy",
      "getStartedThreadModelChangeBlockReason",
    ]),
  ],
  ["lib/attachmentUploadState.ts", new Set(["attachmentUploadBlockReason"])],
  [
    "components/Sidebar.logic.ts",
    new Set(["buildBulkTitleRegenerationContextMenuItem", "buildBulkUnpinContextMenuItem"]),
  ],
  [
    "components/CommandPalette.logic.ts",
    new Set([
      "buildLinkedThreadActionItems",
      "filterCommandPaletteGroups",
      "buildBrowseGroups",
      "buildRootGroups",
      "getCommandPaletteInputPlaceholder",
      "remoteProjectInputPlaceholder",
      "errorMessage",
    ]),
  ],
  ["components/chat/useComposerMenuItems.ts", new Set(["useComposerMenuItems"])],
  [
    "state/sourceControlActions.ts",
    new Set([
      "useVcsInitAction",
      "useVcsPullAction",
      "useGitStackedAction",
      "useSourceControlPublishRepositoryAction",
      "usePreparePullRequestThreadAction",
    ]),
  ],
  ["lib/toolCallDiff.ts", new Set(["toolCallDiff"])],
  [
    "components/cloud/cloudEnvironmentConnectionPresentation.ts",
    new Set(["presentSavedCloudEnvironmentConnection"]),
  ],
]);

const TSX_FUNCTION_WHITELIST = new Map([
  ["components/settings/AddProviderInstanceDialog.tsx", new Set(["validateInstanceId"])],
  ["components/settings/DeviceSourcesSettings.tsx", new Set(["hostStatus"])],
  ["components/settings/DiagnosticsSettings.tsx", new Set(["formatProcessType"])],
  ["components/settings/EnvironmentIconPicker.tsx", new Set(["resolveEnvironmentIconPickerLock"])],
  ["components/settings/EnvironmentRow.tsx", new Set(["environmentTransportLabel"])],
  ["components/settings/IntegrationsSettings.tsx", new Set(["viewportSelectLabel"])],
  ["components/settings/ProjectFaviconPickerDialog.tsx", new Set(["emptyMessage"])],
  ["components/settings/ProviderSettingsPanel.tsx", new Set(["providerEnvironmentDetail"])],
  [
    "components/settings/ResourceTelemetryDiagnostics.tsx",
    new Set(["categoryLabel", "ioSemanticsLabel", "booleanStateLabel"]),
  ],
  ["components/settings/SavedEnvironmentRows.tsx", new Set(["savedBackendStatus"])],
  ["components/settings/ScheduledTasksSettings.tsx", new Set(["relativeLabel"])],
  [
    "components/settings/SettingInheritance.tsx",
    new Set(["formatValue", "settingInheritanceLayers"]),
  ],
  ["components/settings/SourceControlSettings.tsx", new Set(["authPresentation"])],
  ["components/settings/StorageSettings.tsx", new Set(["lastRunSummary", "ruleStatus"])],
  ["components/settings/TelemetryExportSettings.tsx", new Set(["endpointStatus"])],
  ["components/settings/ThemeEditorPanel.tsx", new Set(["appearanceLockReason"])],
  ["components/settings/TypographySettings.tsx", new Set(["resolveFontDefaultFamilies"])],
]);

const DISPLAY_FN_LOCAL_VARS = new Set([
  "fallback",
  "position",
  "sessions",
  "devices",
  "reason",
  "labels",
  "nameIssue",
  "unavailable",
  "unavailableReason",
  "list",
  "families",
  "days",
]);

const TSX_CONST_SKIP = new Set([
  "SUGGESTED_SEARCHES",
  "IMPORT_SOURCE_NAMES",
  "PLATFORMS",
  "LOCATION_PRESETS",
  "MODIFIER_CODES",
  "BACKSPACE",
  "DELETE",
  "CUT",
]);

const TSX_OBJ_DISPLAY_RE =
  /(?:LABELS|DESCRIPTIONS|TITLES|COPY|MESSAGES|HEADINGS|PLACEHOLDERS|TOOLTIPS|OPTIONS|MODES|ITEMS|TABS|STEPS|GROUPS|ACTIONS|OVERRIDES|PRESENTATION|PRESENTATIONS|VISUALS|VERDICTS|PACE|STANDS|SIZES|FILTERS|ORIENTATIONS|PERMISSIONS|SIGNALS|TASKS|HEADER|EMPTY_STATE|LABEL|NOTE|TEXT)$/i;

const TSX_OBJ_DISPLAY_NAMES = new Set([
  "accessConfig",
  "environmentItems",
  "foldLabels",
  "projectOptions",
  "hostMenuOptions",
  "serverMenuOptions",
  "preferences",
  "sendShortcutOptions",
  "sortLabels",
  "projectScopeItems",
  "inheritance",
  "accessCopy",
  "actionLabel",
  "statusLabel",
  "options",
  "summaries",
  "rows",
  "shared",
  "WEEKDAY_SHORT",
]);

const TSX_SCALAR_DISPLAY_RE =
  /(?:Tooltip|Description|Placeholder|DisabledReason|BlockedReason|BlockReason|UnavailableReason|Summary|StatusText|ActionLabel|ButtonLabel|TriggerLabel|ScopeLabel|SelectLabel|ModeLabel|MoveLabel|ManageLabel|LinkLabel|WrapLabel|CopyLabel|ToggleLabel|PrimaryLabel|ValidationMessage|ShortcutStatus|DesktopOnlyMessage|SpeedNotice|FailureTitle|FailureHint)$/i;

const TSX_SCALAR_DISPLAY_NAMES = new Set([
  "UNSAFE_REDIRECT",
  "UNREACHABLE",
  "COMMIT_DIALOG_TITLE",
  "COMMIT_DIALOG_DESCRIPTION",
  "SCAN_LIMIT_MESSAGE",
  "IMPORT_PERMISSION_MESSAGE",
  "UPDATE_BRANCH_REBASE_FAILURE_HINT",
  "FAILURE_HINT",
  "CROSS_TRACK_NOTE",
  "ADVANCED_BACKGROUND_ACTIVITY_DESCRIPTION",
  "ULTRATHINK_IN_BODY_NOTE",
  "submitLabel",
  "submitStatus",
  "railLabel",
  "railTitle",
  "expandLabel",
  "collapseLabel",
  "soundLabel",
  "effectiveLabel",
  "groupLabel",
  "notAdded",
  "checkSummary",
  "artifactsStatus",
  "logsStatus",
  "progressAction",
  "pendingAutoMergeLabel",
  "armedAutoMergeLabel",
  "linkedThreadsLabel",
  "installationStatusMessage",
  "inlineStatusDetail",
  "subtitleText",
  "detail",
  "subtitle",
  "problem",
  "message",
  "title",
]);

const DISPLAY_JSX_ATTR_EXACT = new Set([
  "title",
  "subtitle",
  "description",
  "placeholder",
  "label",
  "status",
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
  "triggerLabel",
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
  "hint",
  "note",
  "continueLabel",
  "pendingLabel",
  "pending",
  "failed",
  "unavailableReason",
  "disabledReason",
  "message",
]);

const DEFAULT_PARAM_PROP_NAMES = new Set([
  "tooltip",
  "placeholder",
  "description",
  "emptyMessage",
  "confirmLabel",
  "cancelLabel",
  "submitLabel",
  "expandLabel",
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
  "Alpha",
  "Beta",
  "Nightly",
  "Dev",
  "Claude",
  "Claude Code",
  "Codex",
  "Cursor",
  "OpenCode",
  "Grok",
  "Antigravity",
  "Gemini",
  "OpenAI",
  "OpenRouter",
  "Anthropic",
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
  "MR",
  "MRs",
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
  if (/^\*\.[a-z0-9]+$/i.test(core) || /^[a-z]+\/[a-z0-9.+-]+$/.test(core)) return false;
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
  if (enPh.length === 0) return zhPh.length === 0;
  if (zhPh.length === 0) return false;
  const enSet = new Set(enPh);
  for (const p of zhPh) {
    if (!enSet.has(p)) return false;
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
  if (rel.startsWith("i18n/")) return false;
  if (/\.(?:test|spec|renders)\.[cm]?[jt]sx?$/.test(rel)) return false;
  if (/\.browser\.test\.[cm]?[jt]sx?$/.test(rel)) return false;
  if (/[Ww]orker\.[cm]?[jt]sx?$/.test(rel)) return false;

  if (rel.endsWith(".d.ts")) return false;
  if (rel.endsWith(".tsx") || rel.endsWith(".ts")) return true;
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
  if (elementName === "code" && attrName !== "title" && attrName !== "aria-label") return false;
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

function isFunctionNode(node) {
  return (
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression"
  );
}

function walkDirectReturns(bodyNode, onReturnArg) {
  function visit(n) {
    if (!n || typeof n !== "object") return;
    if (n !== bodyNode && isFunctionNode(n)) return;
    if (n.type === "ReturnStatement" && n.argument) {
      onReturnArg(n.argument);
      return;
    }
    for (const k of Object.keys(n)) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    }
  }
  visit(bodyNode);
}

export function analyzeModule(code, filename, options = {}) {
  const { dict = null, webSrcDir = WEB_SRC_DIR, localeModulePath = LOCALE_MODULE_PATH } = options;
  const cleanFile = normalizeFsPath(filename.split("?")[0]);
  const normLocaleModulePath = normalizeFsPath(localeModulePath);
  const relFile = normalizeRelFile(cleanFile, webSrcDir);
  const isTsx = cleanFile.endsWith(".tsx");
  const tsAllowedConsts = !isTsx ? TS_CONSTANT_WHITELIST.get(relFile) : null;
  const tsAllowedFns = !isTsx ? TS_FUNCTION_WHITELIST.get(relFile) : null;
  const tsxAllowedFns = isTsx ? TSX_FUNCTION_WHITELIST.get(relFile) : null;
  if (
    !isTsx &&
    !tsAllowedConsts &&
    !tsAllowedFns &&
    !/(?:toastManager|stackedThreadToast|requestConfirmDialog|contextMenu\.show|dialogs\.confirm|window\.confirm)\b/.test(
      code,
    )
  ) {
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

  const handleStringLiteralExpr = (
    litNode,
    context,
    wrapJsxBraces = false,
    requireCapitalStart = false,
  ) => {
    if (!litNode || litNode.type !== "Literal" || typeof litNode.value !== "string") return false;
    const { leading, core, trailing } = splitPadding(litNode.value);
    if (requireCapitalStart && !/^[A-Z0-9"“'(⌘]/.test(core)) return false;
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

  const handleTemplateLiteralExpr = (tplNode, context, requireCapitalStart = false) => {
    if (!tplNode || tplNode.type !== "TemplateLiteral") return false;
    if (tplNode.expressions.length > 4) return false;
    const rawJoined = tplNode.quasis
      .map((q, idx) => {
        const chunk = q.value.cooked ?? q.value.raw;
        return idx < tplNode.expressions.length ? `${chunk}{${idx}}` : chunk;
      })
      .join("");
    const { leading, core, trailing } = splitPadding(rawJoined);
    if (requireCapitalStart && !/^[A-Z0-9"{“'(]/.test(core)) return false;
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

  const handleDisplayExpr = (rawNode, context, requireCapitalStart = false) => {
    const node = unwrapExpr(rawNode);
    if (!node) return;
    if (node.type === "Literal" && typeof node.value === "string") {
      handleStringLiteralExpr(node, context, false, requireCapitalStart);
      return;
    }
    if (node.type === "TemplateLiteral") {
      handleTemplateLiteralExpr(node, context, requireCapitalStart);
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
      handleDisplayExpr(node.consequent, context, requireCapitalStart);
      handleDisplayExpr(node.alternate, context, requireCapitalStart);
      return;
    }
    if (node.type === "LogicalExpression") {
      if (node.operator === "??" || node.operator === "||") {
        handleDisplayExpr(node.left, context, requireCapitalStart);
      }
      handleDisplayExpr(node.right, context, requireCapitalStart);
      return;
    }
    if (node.type === "BinaryExpression" && node.operator === "+") {
      handleDisplayExpr(node.left, context, requireCapitalStart);
      handleDisplayExpr(node.right, context, requireCapitalStart);
      return;
    }
    if (node.type === "ArrowFunctionExpression" || node.type === "FunctionExpression") {
      if (node.body.type !== "BlockStatement") {
        handleDisplayExpr(node.body, context, requireCapitalStart);
      } else {
        walkDirectReturns(node.body, (retArg) =>
          handleDisplayExpr(retArg, context, requireCapitalStart),
        );
      }
    }
  };

  const handleObjectDisplayProps = (objNode, contextPrefix) => {
    for (const prop of objNode.properties) {
      if (prop.type !== "Property") continue;
      const keyName = getPropertyKeyName(prop);
      if (!keyName) continue;
      const propVal = unwrapExpr(prop.value);
      if (
        DISPLAY_OBJECT_PROP_NAMES.has(keyName) ||
        (keyName === "text" && contextPrefix === "fn-obj:savedBackendStatus") ||
        (keyName === "value" && contextPrefix === "fn-obj:settingInheritanceLayers") ||
        (keyName === "counts" && contextPrefix === "fn-obj:summaries")
      ) {
        handleDisplayExpr(prop.value, `${contextPrefix}.${keyName}`, true);
      } else if (keyName === "action" && propVal?.type === "ObjectExpression") {
        handleObjectDisplayProps(propVal, `${contextPrefix}.action`);
      } else if (keyName === "steps" && propVal?.type === "ArrayExpression") {
        for (const stepEl of propVal.elements) {
          handleDisplayExpr(stepEl, `${contextPrefix}.steps`, true);
        }
      } else if (
        (keyName === "families" || keyName === "choices") &&
        propVal?.type === "ArrayExpression"
      ) {
        for (const itemEl of propVal.elements) {
          const item = unwrapExpr(itemEl);
          if (item?.type === "ObjectExpression") {
            handleObjectDisplayProps(item, `${contextPrefix}.${keyName}`);
          }
        }
      }
    }
  };

  const handleDisplayRecordOrList = (constName, initNode) => {
    const unwrapped = unwrapExpr(initNode);
    if (!unwrapped) return;

    if (unwrapped.type === "ConditionalExpression") {
      const cons = unwrapExpr(unwrapped.consequent);
      const alt = unwrapExpr(unwrapped.alternate);
      if (
        cons?.type === "ObjectExpression" ||
        alt?.type === "ObjectExpression" ||
        cons?.type === "ArrayExpression" ||
        alt?.type === "ArrayExpression" ||
        cons?.type === "ConditionalExpression" ||
        alt?.type === "ConditionalExpression"
      ) {
        handleDisplayRecordOrList(constName, unwrapped.consequent);
        handleDisplayRecordOrList(constName, unwrapped.alternate);
        return;
      }
    }

    if (
      unwrapped.type === "Literal" ||
      unwrapped.type === "TemplateLiteral" ||
      unwrapped.type === "ConditionalExpression" ||
      unwrapped.type === "LogicalExpression"
    ) {
      handleDisplayExpr(unwrapped, `const:${constName}`, true);
      return;
    }

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
        if (!titleProp || titleProp.value.type !== "Literal") continue;
        const rawTitle = titleProp.value.value;
        if (typeof rawTitle !== "string") continue;
        const translated = handleStringLiteralExpr(titleProp.value, "settings-search:title", false);
        if (!translated || !dict) continue;

        if (searchTermsProp) {
          const arr = unwrapExpr(searchTermsProp.value);
          if (arr?.type === "ArrayExpression") {
            const alreadyIncluded = arr.elements.some(
              (e) =>
                e?.type === "Literal" &&
                typeof e.value === "string" &&
                e.value.toLowerCase() === rawTitle.toLowerCase(),
            );
            if (!alreadyIncluded) {
              const insertPos = arr.start + 1;
              const suffix = arr.elements.length > 0 ? ", " : "";
              patches.push({
                start: insertPos,
                end: insertPos,
                text: `${JSON.stringify(rawTitle)}${suffix}`,
              });
            }
          }
        } else if (item.properties.length > 0) {
          const lastProp = item.properties[item.properties.length - 1];
          patches.push({
            start: lastProp.end,
            end: lastProp.end,
            text: `, searchTerms: [${JSON.stringify(rawTitle)}]`,
          });
        }
      }
      return;
    }

    if (unwrapped.type === "ObjectExpression") {
      const hasDirectDisplayProp = unwrapped.properties.some(
        (p) => p.type === "Property" && DISPLAY_OBJECT_PROP_NAMES.has(getPropertyKeyName(p) ?? ""),
      );
      if (hasDirectDisplayProp) {
        handleObjectDisplayProps(unwrapped, `dict:${constName}`);
      }
      for (const prop of unwrapped.properties) {
        if (prop.type === "SpreadElement") {
          handleDisplayRecordOrList(constName, prop.argument);
          continue;
        }
        if (prop.type !== "Property") continue;
        const propKey = getPropertyKeyName(prop);
        if (constName === "DISPLAY_LOCALE_LABELS" && propKey && propKey !== "system") continue;
        if (hasDirectDisplayProp && propKey && DISPLAY_OBJECT_PROP_NAMES.has(propKey)) continue;
        const propVal = unwrapExpr(prop.value);
        if (!propVal) continue;
        if (
          propVal.type === "Literal" ||
          propVal.type === "TemplateLiteral" ||
          propVal.type === "ConditionalExpression" ||
          propVal.type === "LogicalExpression"
        ) {
          handleDisplayExpr(propVal, `dict:${constName}`, true);
        } else if (propVal.type === "ObjectExpression") {
          handleObjectDisplayProps(propVal, `dict:${constName}`);
        } else if (propVal.type === "ArrayExpression") {
          handleDisplayRecordOrList(constName, propVal);
        }
      }
      return;
    }

    if (unwrapped.type === "ArrayExpression") {
      const allowStringElements = /(?:STEPS|LABELS|HEADERS|WEEKDAY_SHORT)$/i.test(constName);
      for (const el of unwrapped.elements) {
        if (el?.type === "SpreadElement") {
          const spreadArg = unwrapExpr(el.argument);
          if (spreadArg?.type === "ConditionalExpression") {
            handleDisplayRecordOrList(constName, spreadArg.consequent);
            handleDisplayRecordOrList(constName, spreadArg.alternate);
          } else if (
            allowStringElements &&
            spreadArg?.type === "CallExpression" &&
            spreadArg.callee?.type === "MemberExpression" &&
            spreadArg.callee.property?.type === "Identifier" &&
            spreadArg.callee.property.name === "map" &&
            spreadArg.arguments[0]
          ) {
            handleDisplayExpr(spreadArg.arguments[0], `list:${constName}`, true);
          }
          continue;
        }
        const item = unwrapExpr(el);
        if (!item) continue;
        if (item.type === "ObjectExpression") {
          handleObjectDisplayProps(item, `list:${constName}`);
        } else if (item.type === "ConditionalExpression") {
          const cons = unwrapExpr(item.consequent);
          const alt = unwrapExpr(item.alternate);
          if (cons?.type === "ObjectExpression")
            handleObjectDisplayProps(cons, `list:${constName}`);
          if (alt?.type === "ObjectExpression") handleObjectDisplayProps(alt, `list:${constName}`);
        } else if (
          allowStringElements &&
          (item.type === "Literal" || item.type === "TemplateLiteral")
        ) {
          handleDisplayExpr(item, `list:${constName}`, true);
        }
      }
    }
  };

  const walkDisplayFunctionBody = (fnBodyNode, fnName) => {
    if (!fnBodyNode) return;
    if (fnBodyNode.type !== "BlockStatement") {
      const unwrapped = unwrapExpr(fnBodyNode);
      if (unwrapped?.type === "ObjectExpression") {
        handleObjectDisplayProps(unwrapped, `fn:${fnName}`);
      } else if (unwrapped?.type === "ArrayExpression") {
        handleDisplayRecordOrList(fnName, unwrapped);
      } else {
        handleDisplayExpr(fnBodyNode, `fn:${fnName}`, true);
      }
      return;
    }
    const allowInnerFns =
      fnName === "useScopedModelDisabledReason" ||
      fnName === "useRunScopedPlan" ||
      fnName === "resolveSettingsScope" ||
      fnName === "secretProviderUses";
    function visitFn(n) {
      if (!n || typeof n !== "object") return;
      if (n !== fnBodyNode && isFunctionNode(n) && !allowInnerFns) return;
      if (n.type === "ReturnStatement" && n.argument) {
        const retVal = unwrapExpr(n.argument);
        if (retVal?.type === "ArrayExpression") {
          handleDisplayRecordOrList(fnName, retVal);
        } else if (retVal && retVal.type !== "ObjectExpression") {
          handleDisplayExpr(retVal, `fn:${fnName}`, true);
        }
      } else if (n.type === "ThrowStatement" && n.argument) {
        const thrown = unwrapExpr(n.argument);
        if (
          thrown?.type === "NewExpression" &&
          thrown.callee?.type === "Identifier" &&
          thrown.callee.name === "Error" &&
          thrown.arguments[0]
        ) {
          handleDisplayExpr(thrown.arguments[0], `fn-err:${fnName}`, true);
        }
      } else if (
        n.type === "VariableDeclarator" &&
        n.id?.type === "Identifier" &&
        n.init &&
        DISPLAY_FN_LOCAL_VARS.has(n.id.name)
      ) {
        handleDisplayRecordOrList(n.id.name, n.init);
      } else if (
        n.type === "AssignmentExpression" &&
        n.left?.type === "Identifier" &&
        n.left.name === "nameIssue" &&
        n.right
      ) {
        handleDisplayExpr(n.right, `fn-var:${fnName}`, true);
      } else if (
        n.type === "CallExpression" &&
        n.callee?.type === "Identifier" &&
        n.callee.name === "decodeField" &&
        n.arguments[2]
      ) {
        handleDisplayExpr(n.arguments[2], `fn-call:${fnName}`, true);
      } else if (
        n.type === "CallExpression" &&
        n.callee?.type === "Identifier" &&
        n.callee.name === "unavailable" &&
        n.arguments[1]
      ) {
        handleDisplayExpr(n.arguments[1], `fn-call:${fnName}`, true);
      } else if (n.type === "ObjectExpression") {
        handleObjectDisplayProps(n, `fn-obj:${fnName}`);
      }
      for (const k of Object.keys(n)) {
        const v = n[k];
        if (Array.isArray(v)) v.forEach(visitFn);
        else if (v && typeof v === "object") visitFn(v);
      }
    }
    visitFn(fnBodyNode);
  };

  const getToastCallKind = (callNode) => {
    const callee = callNode.callee;
    if (!callee) return null;
    if (callee.type === "Identifier") {
      if (callee.name === "stackedThreadToast" || callee.name === "toast") return "add";
      return null;
    }
    if (
      callee.type === "MemberExpression" &&
      callee.object?.type === "Identifier" &&
      callee.property?.type === "Identifier"
    ) {
      if (callee.object.name === "toastManager") {
        if (callee.property.name === "add") return "add";
        if (callee.property.name === "update") return "update";
      }
      if (callee.object.name === "toast") return "add";
    }
    return null;
  };

  const isContextMenuShowCall = (callNode) => {
    const callee = callNode.callee;
    return (
      callee?.type === "MemberExpression" &&
      callee.property?.type === "Identifier" &&
      callee.property.name === "show" &&
      callee.object?.type === "MemberExpression" &&
      callee.object.property?.type === "Identifier" &&
      callee.object.property.name === "contextMenu"
    );
  };

  const isConfirmDialogCall = (callNode) => {
    const callee =
      callNode.callee?.type === "ChainExpression" ? callNode.callee.expression : callNode.callee;
    if (callee?.type === "Identifier" && callee.name === "requestConfirmDialog") return true;
    if (
      callee?.type === "MemberExpression" &&
      callee.property?.type === "Identifier" &&
      callee.property.name === "confirm"
    ) {
      const obj =
        callee.object?.type === "ChainExpression" ? callee.object.expression : callee.object;
      if (obj?.type === "Identifier" && obj.name === "window") {
        return true;
      }
      if (
        obj?.type === "MemberExpression" &&
        obj.property?.type === "Identifier" &&
        obj.property.name === "dialogs"
      ) {
        return true;
      }
    }
    return false;
  };

  const handleJoinedLinesOrExpr = (rawNode, contextPrefix, requireCapitalStart = true) => {
    const expr = unwrapExpr(rawNode);
    if (!expr) return;
    if (expr.type === "ConditionalExpression" && requireCapitalStart) {
      handleJoinedLinesOrExpr(expr.consequent, contextPrefix, true);
      handleJoinedLinesOrExpr(expr.alternate, contextPrefix, true);
      return;
    }
    if (
      expr.type === "CallExpression" &&
      expr.callee?.type === "MemberExpression" &&
      expr.callee.property?.type === "Identifier" &&
      expr.callee.property.name === "join"
    ) {
      let receiver = unwrapExpr(expr.callee.object);
      if (
        receiver?.type === "CallExpression" &&
        receiver.callee?.type === "MemberExpression" &&
        receiver.callee.property?.type === "Identifier" &&
        receiver.callee.property.name === "filter"
      ) {
        receiver = unwrapExpr(receiver.callee.object);
      }
      if (receiver?.type === "ArrayExpression") {
        handleDisplayRecordOrList("JOINED_LABELS", receiver);
        return;
      }
    }
    handleDisplayExpr(rawNode, contextPrefix, requireCapitalStart);
  };

  function walk(node) {
    if (!node || typeof node !== "object") return;

    if (!isTsx && tsAllowedFns && node.type === "FunctionDeclaration" && node.id?.name) {
      if (tsAllowedFns.has(node.id.name)) {
        walkDisplayFunctionBody(node.body, node.id.name);
        return;
      }
    }

    if (isTsx && tsxAllowedFns && node.type === "FunctionDeclaration" && node.id?.name) {
      if (tsxAllowedFns.has(node.id.name)) {
        walkDisplayFunctionBody(node.body, node.id.name);
      }
    }

    if (
      dict &&
      relFile === "sourceControlPresentation.tsx" &&
      node.type === "Property" &&
      getPropertyKeyName(node) === "terminology" &&
      code.slice(node.value.start, node.value.end) === "definition.changeRequest"
    ) {
      patches.push({
        start: node.value.start,
        end: node.value.end,
        text: `(__IS_ZH__ ? { ...definition.changeRequest, shortLabelWithArticle: definition.changeRequest.shortLabel, singular: definition.changeRequest.shortLabel === "MR" ? "合并请求" : definition.changeRequest.shortLabel === "PR" ? "PR" : "变更请求", plural: definition.changeRequest.shortLabel === "MR" ? "合并请求" : definition.changeRequest.shortLabel === "PR" ? "PR" : "变更请求" } : definition.changeRequest)`,
      });
      return;
    }

    if (node.type === "VariableDeclarator" && node.id?.type === "Identifier" && node.init) {
      const constName = node.id.name;
      if (!isTsx) {
        if (tsAllowedConsts?.has(constName)) {
          handleDisplayRecordOrList(constName, node.init);
          return;
        }
        const fnInit = unwrapExpr(node.init);
        if (
          tsAllowedFns?.has(constName) &&
          (fnInit?.type === "ArrowFunctionExpression" || fnInit?.type === "FunctionExpression")
        ) {
          walkDisplayFunctionBody(fnInit.body, constName);
          return;
        }
      } else if (!TSX_CONST_SKIP.has(constName)) {
        const unwrappedInit = unwrapExpr(node.init);
        if (
          tsxAllowedFns?.has(constName) &&
          (unwrappedInit?.type === "ArrowFunctionExpression" ||
            unwrappedInit?.type === "FunctionExpression")
        ) {
          walkDisplayFunctionBody(unwrappedInit.body, constName);
        } else if (
          (unwrappedInit?.type === "ObjectExpression" ||
            unwrappedInit?.type === "ArrayExpression" ||
            unwrappedInit?.type === "ConditionalExpression") &&
          (TSX_OBJ_DISPLAY_RE.test(constName) || TSX_OBJ_DISPLAY_NAMES.has(constName))
        ) {
          handleDisplayRecordOrList(constName, node.init);
        } else if (
          unwrappedInit?.type === "CallExpression" &&
          unwrappedInit.callee?.type === "MemberExpression" &&
          unwrappedInit.callee.property?.type === "Identifier" &&
          unwrappedInit.callee.property.name === "map" &&
          unwrappedInit.arguments[0] &&
          TSX_OBJ_DISPLAY_NAMES.has(constName)
        ) {
          const cb = unwrapExpr(unwrappedInit.arguments[0]);
          if (cb?.type === "ArrowFunctionExpression" || cb?.type === "FunctionExpression") {
            walkDisplayFunctionBody(cb.body, constName);
          }
        } else if (
          unwrappedInit?.type === "Literal" ||
          unwrappedInit?.type === "TemplateLiteral" ||
          unwrappedInit?.type === "ConditionalExpression" ||
          unwrappedInit?.type === "LogicalExpression" ||
          unwrappedInit?.type === "CallExpression"
        ) {
          if (TSX_SCALAR_DISPLAY_RE.test(constName) || TSX_SCALAR_DISPLAY_NAMES.has(constName)) {
            handleJoinedLinesOrExpr(node.init, `scalar:${constName}`, true);
          }
        }
      }
    }

    if (
      isTsx &&
      node.type === "AssignmentExpression" &&
      node.left?.type === "Identifier" &&
      node.right &&
      (TSX_SCALAR_DISPLAY_RE.test(node.left.name) || TSX_SCALAR_DISPLAY_NAMES.has(node.left.name))
    ) {
      handleDisplayExpr(node.right, `assign:${node.left.name}`, true);
    }

    if (node.type === "CallExpression") {
      const toastKind = getToastCallKind(node);
      if (toastKind) {
        const argsToInspect = toastKind === "update" ? node.arguments.slice(1) : node.arguments;
        for (const arg of argsToInspect) {
          const unwrappedArg = unwrapExpr(arg);
          if (
            toastKind === "add" &&
            (unwrappedArg?.type === "Literal" || unwrappedArg?.type === "TemplateLiteral")
          ) {
            handleDisplayExpr(unwrappedArg, "toast");
          } else if (unwrappedArg?.type === "ObjectExpression") {
            for (const prop of unwrappedArg.properties) {
              if (prop.type !== "Property") continue;
              const k = getPropertyKeyName(prop);
              if (k === "title") {
                handleDisplayExpr(prop.value, "toast:title");
              } else if (k === "description") {
                handleJoinedLinesOrExpr(prop.value, "toast:description");
              }
            }
          }
        }
      } else if (isContextMenuShowCall(node) && node.arguments.length > 0) {
        const itemsArg = unwrapExpr(node.arguments[0]);
        if (itemsArg?.type === "ArrayExpression") {
          handleDisplayRecordOrList("contextMenuItems", itemsArg);
        }
      } else if (isConfirmDialogCall(node) && node.arguments.length > 0) {
        handleJoinedLinesOrExpr(node.arguments[0], "confirm:message");
        if (node.arguments[1]) {
          const opts = unwrapExpr(node.arguments[1]);
          if (opts?.type === "ObjectExpression") {
            for (const prop of opts.properties) {
              if (prop.type !== "Property") continue;
              const k = getPropertyKeyName(prop);
              if (
                k === "title" ||
                k === "description" ||
                k === "confirmLabel" ||
                k === "cancelLabel"
              ) {
                handleDisplayExpr(prop.value, `confirm:${k}`, true);
              }
            }
          }
        }
      } else if (isTsx && node.callee?.type === "Identifier") {
        const calleeName = node.callee.name;
        if (calleeName === "confirmProviderInstanceRemoval" && node.arguments[0]) {
          handleJoinedLinesOrExpr(node.arguments[0], "confirm:message");
        } else if (calleeName === "reportFailure" || calleeName === "reportError") {
          if (node.arguments[0]) handleDisplayExpr(node.arguments[0], `call:${calleeName}`, true);
          if (node.arguments[1]) handleDisplayExpr(node.arguments[1], `call:${calleeName}`, true);
        } else if (
          /^(?:set(?:[A-Z]\w*)?(?:Error|Notice|Warning|Message)|groupLabel|inertControl)$/.test(
            calleeName,
          ) &&
          node.arguments[0]
        ) {
          handleDisplayExpr(node.arguments[0], `call:${calleeName}`, true);
        } else if (
          calleeName === "limit" &&
          node.arguments.length >= 3 &&
          node.arguments.length <= 4 &&
          node.arguments[0]?.type === "Literal" &&
          node.arguments[1]
        ) {
          handleDisplayExpr(node.arguments[1], "call:limit", true);
        } else if (
          calleeName === "useAtomCommand" &&
          node.arguments[1]?.type === "Literal" &&
          typeof node.arguments[1].value === "string"
        ) {
          handleDisplayExpr(node.arguments[1], "call:useAtomCommand", true);
        } else if (calleeName === "booleanStateLabel" && node.arguments[1]) {
          handleDisplayRecordOrList("booleanStateLabel", node.arguments[1]);
        } else if (
          (calleeName === "runCommand" || calleeName === "run") &&
          node.arguments.length === 2 &&
          node.arguments[0] &&
          isFunctionNode(unwrapExpr(node.arguments[1]) ?? {})
        ) {
          handleDisplayExpr(node.arguments[0], `call:${calleeName}`, true);
        } else if (
          (calleeName === "updateAllMembers" || calleeName === "write") &&
          node.arguments.length === 2 &&
          node.arguments[1]
        ) {
          handleDisplayExpr(node.arguments[1], `call:${calleeName}`, true);
        }
      } else if (
        isTsx &&
        node.callee?.type === "MemberExpression" &&
        node.callee.property?.type === "Identifier"
      ) {
        const methodName = node.callee.property.name;
        const receiver = unwrapExpr(node.callee.object);
        if (
          methodName === "push" &&
          receiver?.type === "Identifier" &&
          TSX_OBJ_DISPLAY_NAMES.has(receiver.name) &&
          node.arguments[0]
        ) {
          const arg0 = unwrapExpr(node.arguments[0]);
          if (arg0?.type === "ObjectExpression") {
            handleObjectDisplayProps(arg0, `push:${receiver.name}`);
          }
        } else if (methodName === "map" && receiver?.type === "ArrayExpression") {
          for (const el of receiver.elements) {
            const item = unwrapExpr(el);
            if (
              item?.type === "ObjectExpression" &&
              item.properties.some((p) => getPropertyKeyName(p) === "title") &&
              item.properties.some((p) => getPropertyKeyName(p) === "description")
            ) {
              handleObjectDisplayProps(item, "inline-map");
            }
          }
        }
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

    if (node.type === "JSXElement" || node.type === "JSXFragment") {
      const elemName = node.openingElement ? getJsxElementName(node.openingElement) : "";
      if (elemName === "style" || elemName === "script" || elemName === "T" || elemName === "Tx") {
        return;
      }
      if (node.openingElement?.attributes) {
        for (const attr of node.openingElement.attributes) {
          if (attr.type === "JSXSpreadAttribute" && attr.argument) {
            const spreadArg = unwrapExpr(attr.argument);
            if (
              spreadArg?.type === "ObjectExpression" ||
              spreadArg?.type === "ConditionalExpression"
            ) {
              handleDisplayRecordOrList("jsx-spread", spreadArg);
            }
            continue;
          }
          if (attr.type !== "JSXAttribute" || attr.name?.type !== "JSXIdentifier" || !attr.value) {
            continue;
          }
          const attrName = attr.name.name;
          if (
            elemName === "DiagnosticsTable" &&
            attrName === "headers" &&
            attr.value.type === "JSXExpressionContainer"
          ) {
            handleDisplayRecordOrList("HEADERS", attr.value.expression);
            continue;
          }
          if (attrName === "size" && attr.value.type === "JSXExpressionContainer") {
            const sizeObj = unwrapExpr(attr.value.expression);
            if (sizeObj?.type === "ObjectExpression") {
              handleObjectDisplayProps(sizeObj, "attr:size");
              continue;
            }
          }
          if (
            attr.value.type === "JSXExpressionContainer" &&
            unwrapExpr(attr.value.expression)?.type === "ArrayExpression" &&
            /(?:permissions|steps|items|options|tabs|rows|actions)$/i.test(attrName)
          ) {
            handleDisplayRecordOrList(`attr:${attrName}`, attr.value.expression);
            continue;
          }
          if (!isDisplayJsxAttr(attrName, elemName)) continue;
          if (attr.value.type === "Literal" && typeof attr.value.value === "string") {
            handleStringLiteralExpr(attr.value, `attr:${attrName}`, true);
          } else if (attr.value.type === "JSXExpressionContainer") {
            handleDisplayExpr(attr.value.expression, `attr:${attrName}`);
          }
        }
      }

      if (elemName === "pre" || elemName === "kbd" || elemName === "svg") {
        return;
      }
      if (elemName !== "code") {
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
            handleJoinedLinesOrExpr(child.expression, "jsx-expr", false);
          }
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
