import { resolveLocale } from "@t3tools/client-runtime/locales";
import {
  DEFAULT_LOCALE,
  getSystemLocales,
  readCachedLanguageSetting,
  SUPPORTED_LOCALES,
} from "./locales";
import { ZH_RUNTIME_EXACT } from "./runtimeDict";

export function resolveIsZh(language: string = readCachedLanguageSetting()): boolean {
  return resolveLocale(language, getSystemLocales(), SUPPORTED_LOCALES, DEFAULT_LOCALE) === "zh";
}

export const __IS_ZH__: boolean = resolveIsZh();

function translateSegment(segment: string): string {
  const exact = ZH_RUNTIME_EXACT[segment];
  if (exact !== undefined) return exact;

  const speedMatch = /^(.+) (Fast|Ultrafast)$/.exec(segment);
  if (speedMatch) {
    const [, effortPart, speedPart] = speedMatch;
    if (effortPart && speedPart) {
      return `${translateSegment(effortPart)} · ${ZH_RUNTIME_EXACT[speedPart] ?? speedPart}`;
    }
  }

  const toggleMatch = /^(.+) (On|Off)$/.exec(segment);
  if (toggleMatch) {
    const [, namePart, statePart] = toggleMatch;
    if (namePart && statePart) {
      return `${translateSegment(namePart)} ${statePart === "On" ? "开启" : "关闭"}`;
    }
  }

  const nightlyDenied =
    /^(.+) manages T3 Code updates\. Only stable releases can be installed\.$/.exec(segment);
  if (nightlyDenied?.[1]) {
    return `${nightlyDenied[1]} 统一管理 T3 Code 更新，仅允许安装稳定版。`;
  }

  const updatesManaged = /^(.+) manages T3 Code updates\.$/.exec(segment);
  if (updatesManaged?.[1]) {
    return `${updatesManaged[1]} 统一管理 T3 Code 更新。`;
  }

  const policyDenied = /^(.+)'s policy does not allow (.+)\.$/.exec(segment);
  if (policyDenied?.[1] && policyDenied[2]) {
    const cap = ZH_RUNTIME_EXACT[policyDenied[2]] ?? policyDenied[2];
    return `${policyDenied[1]} 的管理策略不允许${/^[A-Za-z0-9]/.test(cap) ? " " : ""}${cap}。`;
  }

  const ceilingDenied = /^(.+) limits threads to (.+)\.$/.exec(segment);
  if (ceilingDenied?.[1] && ceilingDenied[2]) {
    const mode = ZH_RUNTIME_EXACT[ceilingDenied[2]] ?? ceilingDenied[2];
    return `${ceilingDenied[1]} 将线程权限上限限制为“${mode}”。`;
  }

  const managedBy = /^Managed by (.+)\.$/.exec(segment);
  if (managedBy?.[1]) {
    return `由 ${managedBy[1]} 统一管理。`;
  }

  const useVersion = /^Use (.+) for full support\.$/.exec(segment);
  if (useVersion?.[1]) {
    return `请使用 ${useVersion[1]} 以获得完整支持。`;
  }

  const installVersion = /^Update available: install (.+)\.$/.exec(segment);
  if (installVersion?.[1]) {
    return `有可用更新：请安装 ${installVersion[1]}。`;
  }

  const codexRpc = /^Codex could not read usage \(JSON-RPC (.+)\)\.$/.exec(segment);
  if (codexRpc?.[1]) {
    return `Codex 无法读取用量（JSON-RPC ${codexRpc[1]}）。`;
  }

  const cursorTimeout = /^Cursor SDK catalog request timed out after (\d+)ms\.$/.exec(segment);
  if (cursorTimeout?.[1]) {
    return `Cursor SDK 模型目录请求超时（${cursorTimeout[1]}ms）。`;
  }

  const snoozeIn = /^In (\d+) (minute|minutes|hour|hours|day|days)$/.exec(segment);
  if (snoozeIn?.[1] && snoozeIn[2]) {
    const unit = snoozeIn[2].startsWith("minute")
      ? "分钟"
      : snoozeIn[2].startsWith("hour")
        ? "小时"
        : "天";
    return `${snoozeIn[1]} ${unit}后`;
  }

  const weekdayTime = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (.+)$/.exec(segment);
  if (weekdayTime?.[1] && weekdayTime[2]) {
    const dayMap: Record<string, string> = {
      Sun: "周日",
      Mon: "周一",
      Tue: "周二",
      Wed: "周三",
      Thu: "周四",
      Fri: "周五",
      Sat: "周六",
    };
    return `${dayMap[weekdayTime[1]] ?? weekdayTime[1]} ${weekdayTime[2]}`;
  }

  const openOnHost = /^Open on (.+)$/.exec(segment);
  if (openOnHost?.[1]) {
    return `在 ${openOnHost[1]} 中打开`;
  }

  const scUnauth =
    /^(.+) is not authenticated\. Open (?:Source Control settings|Settings -> Source control) for setup guidance\.$/.exec(
      segment,
    );
  if (scUnauth?.[1]) {
    return `${scUnauth[1]} 尚未认证，请打开“版本控制”设置查看配置指引。`;
  }

  const wrongArch =
    /^`(.+)` is built for another CPU architecture, so this (.+) machine cannot run it\. Remove or replace it\. (.+)$/.exec(
      segment,
    );
  if (wrongArch?.[1] && wrongArch[2] && wrongArch[3]) {
    return `\`${wrongArch[1]}\` 编译自其他 CPU 架构，当前 ${wrongArch[2]} 设备无法运行。请移除或替换它。${translateSegment(wrongArch[3])}`;
  }

  const continuedFor = /^Continued for (.+)$/.exec(segment);
  if (continuedFor?.[1]) {
    return `已继续执行 ${continuedFor[1]}`;
  }

  const compactedIdle = /^Context compacted after (.+) idle$/.exec(segment);
  if (compactedIdle?.[1]) {
    return `空闲 ${compactedIdle[1]} 后已压缩上下文`;
  }

  const gitcafeHint =
    /^Install the GitCafe CLI with `(.+)`, then run `(.+)`, save a token in Settings, or set CAFE_TOKEN on the server\.$/.exec(
      segment,
    );
  if (gitcafeHint?.[1] && gitcafeHint[2]) {
    return `请使用 \`${gitcafeHint[1]}\` 安装 GitCafe CLI，然后运行 \`${gitcafeHint[2]}\`，或在设置中保存令牌，或在服务器上设置 CAFE_TOKEN。`;
  }

  const removeProviderInst = /^Remove the (.+) provider instance\?$/.exec(segment);
  if (removeProviderInst?.[1]) {
    return `确定移除 ${removeProviderInst[1]} 服务商实例？`;
  }

  const resetProviderInst = /^Reset the (.+) provider to its defaults\?$/.exec(segment);
  if (resetProviderInst?.[1]) {
    return `确定将 ${resetProviderInst[1]} 服务商恢复为默认配置？`;
  }

  const closeBrowsers = /^Close (\d+) browsers while the agent is using them\?$/.exec(segment);
  if (closeBrowsers?.[1]) {
    return `智能体正在使用这 ${closeBrowsers[1]} 个浏览器，确定要关闭吗？`;
  }

  const installUpdate = /^Install update(?: (.+))? and restart T3 Code\?$/.exec(segment);
  if (installUpdate) {
    return `确定安装更新${installUpdate[1] ? ` ${installUpdate[1]} ` : ""}并重启 T3 Code？`;
  }

  const unpinThread = /^Unpin thread "(.+)"\?$/.exec(segment);
  if (unpinThread?.[1]) {
    return `确定取消置顶线程“${unpinThread[1]}”？`;
  }

  const waitingApprove = /^(.+) is waiting for someone to approve this device$/.exec(segment);
  if (waitingApprove?.[1]) {
    return `${waitingApprove[1]} 正在等待批准此设备`;
  }

  const approveOnConnected =
    /^On a device already connected to (.+), open Settings > Sharing & access and approve (?:the device showing (.+)|this device)\.$/.exec(
      segment,
    );
  if (approveOnConnected?.[1]) {
    return `请在已连接到 ${approveOnConnected[1]} 的设备上打开“设置 > 共享与访问”，并批准${approveOnConnected[2] ? `显示验证码 ${approveOnConnected[2]} 的设备` : "此设备"}。`;
  }

  const approveCli = /^Or run `(t3 auth connect-device approve .+)` on (.+)\.$/.exec(segment);
  if (approveCli?.[1] && approveCli[2]) {
    return `或在 ${approveCli[2]} 上运行 \`${approveCli[1]}\`。`;
  }

  return segment;
}

/**
 * Translates dynamic runtime strings originating from shared contracts, provider
 * schemas, model capability descriptors, or server status payloads when Chinese
 * display locale is active. Returns `text` unchanged in English mode.
 */
export function tr(text: string): string;
export function tr(text: string | undefined): string | undefined;
export function tr(text: string | null): string | null;
export function tr(text: string | null | undefined): string | null | undefined;
export function tr(text: string | null | undefined): string | null | undefined {
  if (!__IS_ZH__ || !text) return text;
  const exact = ZH_RUNTIME_EXACT[text];
  if (exact !== undefined) return exact;
  if (text.includes("\n")) {
    return text
      .split("\n")
      .map((line) => (line ? tr(line) : line))
      .join("\n");
  }
  if (text.includes(" · ")) {
    return text.split(" · ").map(translateSegment).join(" · ");
  }
  return translateSegment(text);
}
