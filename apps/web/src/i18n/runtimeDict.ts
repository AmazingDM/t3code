/**
 * Runtime Chinese lookup table for user-visible strings originating outside
 * `apps/web/src` (shared contracts, provider schemas, model capability
 * descriptors, and server status payloads).
 */
export const ZH_RUNTIME_EXACT: Readonly<Record<string, string>> = {
  Reasoning: "推理强度",
  Effort: "推理强度",
  Thinking: "思考模式",
  Options: "选项",
  None: "无",
  Minimal: "最低",
  Low: "低",
  Medium: "中",
  High: "高",
  "Extra High": "超高",
  Max: "最高",
  Ultra: "极高",
  Ultracode: "Ultracode",
  Ultrathink: "Ultrathink",
  "xhigh effort plus multi-agent workflow orchestration": "超高推理强度，并启用多智能体工作流编排",
  "Service Tier": "服务档位",
  "Fast Mode": "快速模式",
  Standard: "标准",
  Normal: "标准",
  Fast: "快速",
  Ultrafast: "极速",
  "Even faster, more expensive": "速度更快，费用更高",
  "Context Window": "上下文窗口",
  Expanded: "扩展",
  Default: "默认",
  Agent: "智能体",
  Build: "构建",
  Plan: "规划",
  On: "开启",
  Off: "关闭",
  Supervised: "需审批",
  "Auto-accept edits": "自动接受编辑",
  Auto: "自动",
  "Full access": "完全访问",
  "connecting from other devices": "从其他设备连接",
  "T3 Connect": "使用 T3 Connect",
  "webhook tasks": "使用 Webhook 任务",
  "importing browser cookies": "导入浏览器 Cookie",
  "Binary path": "可执行文件路径",
  Executable: "可执行文件",
  "Executable name or path on this environment.": "当前环境中的可执行文件名称或路径。",
  "e.g. dsh": "例如 dsh",
  "Path to the Codex binary used by this instance.": "此实例使用的 Codex 可执行文件路径。",
  "CODEX_HOME path": "CODEX_HOME 路径",
  "Custom Codex home and config directory.": "自定义 Codex 主目录与配置目录。",
  "Shadow home path": "独立账户主目录路径",
  "Account-specific Codex home. Keeps auth.json separate while sharing state from CODEX_HOME.":
    "按账户隔离的 Codex 主目录，在共享 CODEX_HOME 状态的同时单独保存 auth.json。",
  "Launch arguments": "启动参数",
  "Additional CLI arguments passed to codex app-server on session start.":
    "会话启动时传递给 codex app-server 的额外 CLI 参数。",
  "When you return": "返回会话时",
  "Before the cache expires (beta)": "提示词缓存过期前（Beta）",
  Never: "从不",
  "Use default": "使用默认值",
  "Path to the Claude binary used by this instance.": "此实例使用的 Claude 可执行文件路径。",
  "CLAUDE_CONFIG_DIR path": "CLAUDE_CONFIG_DIR 路径",
  "Custom Claude home and config directory. Keeps .claude.json and .claude separate.":
    "自定义 Claude 主目录与配置目录，独立保存 .claude.json 与 .claude。",
  "Additional CLI arguments passed on session start.": "会话启动时传递的额外 CLI 参数。",
  "Auto-compact after": "自动压缩阈值",
  "Compact after 100,000 to 1,000,000 tokens. Leave empty to use Claude's default.":
    "达到 100,000 至 1,000,000 Token 后自动压缩上下文。留空则使用 Claude 默认阈值。",
  "Compact idle threads": "压缩空闲线程上下文",
  "When to compact an idle thread over 200,000 tokens: after you return, just before its prompt cache expires, or never. Overrides the default in Providers > Advanced.":
    "超过 200,000 Token 的空闲线程何时压缩上下文：返回会话时、提示词缓存即将过期前，或从不压缩。此项会覆盖“服务商 > 高级”中的默认设置。",
  "Google account": "Google 账号",
  "Gemini Enterprise": "Gemini Enterprise",
  "Gemini API key": "Gemini API 密钥",
  "Agent Platform (Vertex AI)": "Agent Platform (Vertex AI)",
  "Sign-in method": "登录方式",
  "Google accounts use your subscription; API keys and Agent Platform bill usage.":
    "Google 账号使用订阅额度；API 密钥与 Agent Platform 按实际用量计费。",
  "API key": "API 密钥",
  "Gemini or Vertex AI express key. Stored separately on the host.":
    "Gemini 或 Vertex AI Express 密钥，在服务端主机上独立加密存储。",
  Optional: "可选",
  Automatic: "自动选择",
  "GCP project": "GCP 项目",
  "Required for Gemini Enterprise. Agent Platform uses it when no API key is set.":
    "Gemini Enterprise 必填；未设置 API 密钥时 Agent Platform 也会使用此项目。",
  "GCP location": "GCP 区域",
  "Region for Gemini Enterprise or Agent Platform.":
    "Gemini Enterprise 或 Agent Platform 所在区域。",
  "Custom ACP executable. Leave empty to select automatically.":
    "自定义 ACP 可执行文件路径，留空则自动选择。",
  "ACP Registry": "ACP 注册中心",
  "ACP source": "ACP 来源",
  "Local command": "本地命令",
  "Registry agent ID": "注册中心智能体 ID",
  "Agent identifier from the official ACP Registry, for example 'devin'.":
    "官方 ACP 注册中心中的智能体标识符，例如 'devin'。",
  "Executable override": "可执行文件覆盖路径",
  "Executable on this environment. For registry agents, this overrides the distribution executable while keeping its arguments and environment.":
    "当前环境中的可执行文件路径。对于注册中心智能体，此项会替换默认分发程序，但保留其原有参数与环境变量。",
  "Registry default": "注册中心默认程序",
  "Authentication method": "认证方式",
  "Optional ACP authentication method ID. By default, the first agent-managed method is selected.":
    "可选的 ACP 认证方式 ID，默认选择智能体提供的第一种认证方式。",
  "Cursor API key": "Cursor API 密钥",
  "Optional. Overrides browser sign-in for this provider.":
    "可选。设置后将覆盖此服务商的浏览器登录。",
  "Paste API key": "粘贴 API 密钥",
  "Path to the fx binary. All fx instances on this machine share its fx login.":
    "fx 可执行文件路径。本机上的所有 fx 实例共享同一个 fx 登录状态。",
  "Path to the Grok CLI binary.": "Grok CLI 可执行文件路径。",
  "Early Access": "抢先体验",
  "Kiro API key": "Kiro API 密钥",
  "Optional. Signs in without `kiro-cli login` (Kiro Pro and above).":
    "可选。无需执行 `kiro-cli login` 即可登录（需 Kiro Pro 及以上订阅）。",
  "Path to the Kiro CLI binary.": "Kiro CLI 可执行文件路径。",
  "Path to the Muse Code binary on this environment. Sign in with muse login on that host.":
    "当前环境中 Muse Code 可执行文件的路径。请在该主机上运行 `muse login` 完成登录。",
  "Path to the OpenCode binary.": "OpenCode 可执行文件路径。",
  "Server URL": "服务端 URL",
  "Leave blank to let T3 Code spawn the server when needed.":
    "留空则由 T3 Code 在需要时自动启动服务端。",
  "Server password": "服务端密码",
  "Stored separately on the host.": "在服务端主机上独立加密存储。",
  "Path to the Pi coding agent binary.": "Pi 编程智能体可执行文件路径。",
  "Additional CLI arguments passed to pi --mode rpc on session start.":
    "会话启动时传递给 `pi --mode rpc` 的额外 CLI 参数。",
  "Provider default": "服务商默认方式",
  "Claude API Key": "Claude API 密钥",
  "OpenAI API Key": "OpenAI API 密钥",
  "Amazon Bedrock": "Amazon Bedrock",
  "Custom API endpoint": "自定义 API 端点",
  "Grok account": "Grok 账号",
  "Kiro account": "Kiro 账号",
  "Google Antigravity": "Google Antigravity",
  "Sign in with Cursor": "使用 Cursor 登录",
  "Sign in with ChatGPT": "使用 ChatGPT 登录",
  "Use a different ChatGPT account": "使用其他 ChatGPT 账号",
  "Register a connection for another ChatGPT account.": "为另一个 ChatGPT 账号注册新连接。",
  "Reuse this account's original sign-in registration.": "复用该账号原有的登录注册信息。",
  "ChatGPT Free Subscription": "ChatGPT 免费版",
  "ChatGPT Go Subscription": "ChatGPT Go 订阅",
  "ChatGPT Plus Subscription": "ChatGPT Plus 订阅",
  "ChatGPT Pro Subscription": "ChatGPT Pro 订阅",
  "ChatGPT Pro 100 Subscription": "ChatGPT Pro 100 订阅",
  "ChatGPT Pro 200 Subscription": "ChatGPT Pro 200 订阅",
  "ChatGPT Pro 500 Subscription": "ChatGPT Pro 500 订阅",
  "ChatGPT Business Subscription": "ChatGPT Business 订阅",
  "ChatGPT Business Premium Subscription": "ChatGPT Business 高级订阅",
  "ChatGPT Enterprise Subscription": "ChatGPT Enterprise 企业订阅",
  "ChatGPT Edu Subscription": "ChatGPT Edu 教育订阅",
  "ChatGPT Subscription": "ChatGPT 订阅",
  Enterprise: "企业版",
  Team: "团队版",
  Pro: "Pro",
  Free: "免费版",
  "Checking provider status": "正在检查服务商状态",
  "Waiting for the server to report installation and authentication details.":
    "正在等待服务端返回安装与认证状态。",
  Disabled: "已禁用",
  "This provider is installed but disabled for new sessions in T3 Code.":
    "该服务商已安装，但在 T3 Code 中已对新会话禁用。",
  "Not found": "未找到",
  "CLI not detected on PATH.": "未在系统 PATH 中检测到 CLI。",
  "Not authenticated": "未认证",
  Authenticated: "已认证",
  "Installed · Sign-in not checked": "已安装 · 未检查登录状态",
  "Needs attention": "需要处理",
  "The provider is installed, but the server could not fully verify it.":
    "该服务商已安装，但服务端无法完成完整校验。",
  Unavailable: "不可用",
  "The provider failed its startup checks.": "服务商未能通过启动自检。",
  Available: "可用",
  "Limited support": "支持受限",
  "Unsupported version": "不支持的版本",
  "Known broken version": "已知存在故障的版本",
  "Update for full support.": "请更新以获得完整支持。",
  "Update available": "有可用更新",
  "Update available: install the latest provider version.": "有可用更新：请安装最新版服务商程序。",
  "Starting update": "正在启动更新",
  "Update command failed to run.": "更新命令启动失败。",
  "Waiting for another provider update to finish.": "正在等待另一个服务商更新完成。",
  "Provider installation changed. Refresh and try again.": "服务商安装状态已变更，请刷新后重试。",
  "Already up to date.": "当前已是最新版本。",
  "Update command failed.": "更新命令执行失败。",
  "Provider refresh failed after update.": "更新后刷新服务商状态失败。",
  "The ACP agent does not advertise session listing.": "该 ACP 智能体未声明会话列表能力。",
  "The ACP agent does not advertise session deletion.": "该 ACP 智能体未声明删除会话能力。",
  "The ACP agent does not advertise provider configuration.": "该 ACP 智能体未声明服务商配置能力。",
  "The ACP agent does not advertise logout.": "该 ACP 智能体未声明退出登录能力。",
  "Could not delete the ACP session.": "无法删除 ACP 会话。",
  "Could not list ACP providers.": "无法列出 ACP 服务商。",
  "Could not update the ACP provider configuration.": "无法更新 ACP 服务商配置。",
  "The ACP session list request timed out.": "获取 ACP 会话列表请求超时。",
  "The ACP session delete request timed out.": "删除 ACP 会话请求超时。",
  "The ACP provider list request timed out.": "获取 ACP 服务商列表请求超时。",
  "The ACP provider configuration request timed out.": "配置 ACP 服务商请求超时。",
  "The ACP provider disable request timed out.": "禁用 ACP 服务商请求超时。",
  "The ACP logout request timed out.": "ACP 退出登录请求超时。",
  "Could not read the Cursor sign-in. Try signing in again.":
    "无法读取 Cursor 登录状态，请重新登录。",
  "Cursor sign-in or sign-out is in progress. Try again after it finishes.":
    "正在进行 Cursor 登录或登出操作，请稍后重试。",
  "Sign in with Cursor or add CURSOR_API_KEY in provider settings.":
    "请使用 Cursor 登录，或在服务商设置中配置 CURSOR_API_KEY。",
  "Could not load the Cursor SDK. Try signing in again.": "无法加载 Cursor SDK，请重新登录。",
  "Open the Cursor sign-in page and finish signing in. This page updates automatically.":
    "请打开 Cursor 登录页面完成登录，此页面会自动刷新。",
  "Cursor sign-in failed. Start sign-in again.": "Cursor 登录失败，请重新发起登录。",
  "Checking Cursor sign-in.": "正在检查 Cursor 登录状态。",
  "Could not save the Cursor sign-in. Try again.": "无法保存 Cursor 登录状态，请重试。",
  "Could not clear the rejected Cursor sign-in. Try signing out.":
    "无法清除被拒绝的 Cursor 登录状态，请尝试手动退出登录。",
  "Signed in with Cursor.": "已使用 Cursor 登录。",
  "Cursor sign-in expired. Start sign-in again.": "Cursor 登录已过期，请重新登录。",
  "This sign-in is no longer active in this client.": "此登录会话在当前客户端中已失效。",
  "Enable Cursor before signing in.": "请先启用 Cursor 再进行登录。",
  "Remove CURSOR_API_KEY from this provider's environment before using browser sign-in.":
    "使用浏览器登录前，请先从该服务商的环境变量中移除 CURSOR_API_KEY。",
  "Cursor setup is already in progress.": "Cursor 配置流程正在进行中。",
  "Could not start Cursor sign-in. Try again.": "无法启动 Cursor 登录，请重试。",
  "Starting Cursor sign-in.": "正在启动 Cursor 登录。",
  "Finish signing in on the Cursor website. No redirect URL is needed.":
    "请在 Cursor 网站完成登录，无需粘贴回调链接。",
  "Cursor sign-in was cancelled.": "已取消 Cursor 登录。",
  "Remove CURSOR_API_KEY from this provider's environment to disconnect it.":
    "要断开连接，请从该服务商的环境变量中移除 CURSOR_API_KEY。",
  "Cursor setup is already stopping.": "正在停止 Cursor 配置流程。",
  "Could not clear the Cursor sign-in. Try again.": "无法清除 Cursor 登录信息，请重试。",
  "Cursor is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Cursor。",
  "Checking Cursor SDK availability...": "正在检查 Cursor SDK 可用性…",
  "Run `fx login` to sign in.": "请运行 `fx login` 完成登录。",
  "Grok is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Grok。",
  "Checking Grok CLI availability...": "正在检查 Grok CLI 可用性…",
  "Grok CLI is installed but timed out while running `grok --version`.":
    "已安装 Grok CLI，但运行 `grok --version` 超时。",
  "Grok CLI is installed but failed to run.": "已安装 Grok CLI，但无法正常运行。",
  "Grok CLI is installed but not logged in. Run `grok login`.":
    "已安装 Grok CLI，但尚未登录。请运行 `grok login`。",
  "Kiro is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Kiro。",
  "Kiro CLI is installed but failed to run.": "已安装 Kiro CLI，但无法正常运行。",
  "Kiro CLI is installed but not signed in. Run `kiro-cli login`.":
    "已安装 Kiro CLI，但尚未登录。请运行 `kiro-cli login`。",
  "Could not confirm the Kiro sign-in. Run `kiro-cli whoami` to check.":
    "无法确认 Kiro 登录状态，请运行 `kiro-cli whoami` 检查。",
  "Muse returned a catalog for another provider.": "Muse 返回了其他服务商的模型目录。",
  "Muse Code CLI version check timed out.": "Muse Code CLI 版本检查超时。",
  "Muse Code CLI is installed but failed to run.": "已安装 Muse Code CLI，但无法正常运行。",
  "Muse Code SDK could not read the model catalog. Check your Muse installation and run `muse login` on this T3 server host.":
    "Muse Code SDK 无法读取模型目录。请检查 Muse 安装状态，并在当前 T3 服务端主机上运行 `muse login`。",
  "Muse Code returned no models. Run `muse login` on this T3 server host and refresh its status.":
    "Muse Code 未返回任何模型。请在当前 T3 服务端主机上运行 `muse login` 后刷新状态。",
  "OpenCode server rejected authentication. Check the server URL and password.":
    "OpenCode 服务端拒绝认证，请检查服务端 URL 与密码。",
  "OpenCode CLI (`opencode`) is not installed or not on PATH.":
    "未安装 OpenCode CLI（`opencode`）或未加入系统 PATH。",
  "OpenCode provider status has not been checked in this session yet.":
    "当前会话尚未检查 OpenCode 服务商状态。",
  "The OpenCode server URL is not a valid http:// or https:// URL.":
    "OpenCode 服务端 URL 不是有效的 http:// 或 https:// 地址。",
  "Couldn't reach the OpenCode server.": "无法连接到 OpenCode 服务端。",
  "Timed out while checking the OpenCode server version.": "检查 OpenCode 服务端版本超时。",
  "401 Unauthorized: the OpenCode server rejected the password.":
    "401 未授权：OpenCode 服务端拒绝了该密码。",
  "Invalid model inventory": "模型列表无效",
  "Invalid model identity": "模型标识无效",
  "Pi is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Pi。",
  "Checking Pi CLI availability...": "正在检查 Pi CLI 可用性…",
  "Pi CLI is installed but timed out while running `pi --version`.":
    "已安装 Pi CLI，但运行 `pi --version` 超时。",
  "Pi CLI is installed but failed to run.": "已安装 Pi CLI，但无法正常运行。",
  "Pi is available, but T3 Code could not refresh its models and commands. The live session will retry startup.":
    "Pi 可用，但 T3 Code 暂时无法刷新其模型与命令列表，实时会话将在启动时自动重试。",
  "Pi is available, but model and command discovery needs interactive input. The live session will handle it.":
    "Pi 可用，但模型与命令发现需要交互式输入，将由实时会话接管处理。",
  "Sign-in is in progress in another client.": "另一个客户端正在进行登录流程。",
  "Antigravity started more than one Google sign-in request.":
    "Antigravity 发起了多个重复的 Google 登录请求。",
  "Open the Google sign-in link. If you are remote, paste the redirect URL here.":
    "请打开 Google 登录链接。如果当前连接的是远程环境，请将回调 URL 粘贴到此处。",
  "Checking Antigravity access and models.": "正在检查 Antigravity 访问权限并加载模型。",
  "Waiting for Google to finish sign-in.": "正在等待 Google 完成登录。",
  "Google sign-in was cancelled by sign-out.": "已因退出登录而取消 Google 登录流程。",
  "Downloading Google's official Antigravity runtime.": "正在下载 Google 官方 Antigravity 运行时。",
  "The managed Antigravity runtime is incomplete. Remove it and reinstall.":
    "托管的 Antigravity 运行时不完整，请移除后重新安装。",
  "Could not resolve the Antigravity profile directory.": "无法解析 Antigravity 配置目录。",
  "Could not create an Antigravity runtime temp directory.":
    "无法创建 Antigravity 运行时临时目录。",
  "Could not create an Antigravity setup workspace.": "无法创建 Antigravity 初始化工作区。",
  "Could not prepare the Antigravity provider status.": "无法获取 Antigravity 服务商状态。",
  "Antigravity model refresh timed out. Try again or check Google sign-in.":
    "刷新 Antigravity 模型超时，请重试或检查 Google 登录状态。",
  "Could not read Antigravity workspace skills.": "无法读取 Antigravity 工作区技能。",
  "Antigravity profile directory could not be resolved.": "无法解析 Antigravity 配置目录。",
  "Some Antigravity history could not be read.": "部分 Antigravity 历史记录无法读取。",
  "Claude is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Claude。",
  "Claude Agent CLI is installed but failed to run. Timed out while running command.":
    "已安装 Claude Agent CLI，但运行命令超时。",
  "Claude Agent CLI is installed but failed to run.": "已安装 Claude Agent CLI，但无法正常运行。",
  "Claude provider status has not been checked in this session yet.":
    "当前会话尚未检查 Claude 服务商状态。",
  "Failed to build Claude orchestration adapter.": "构建 Claude 编排适配器失败。",
  "Claude could not redeem the reset.": "Claude 无法使用限额重置额度。",
  "The reset was applied, but Claude could not confirm the new limits. Refresh to check.":
    "已应用重置，但 Claude 未能确认最新限额，请刷新查看。",
  "Extracting Codex.": "正在解压 Codex。",
  "Checking Codex.": "正在检查 Codex。",
  "Downloading Codex.": "正在下载 Codex。",
  "Could not finish the Codex installation. Check disk space and directory access.":
    "无法完成 Codex 安装，请检查磁盘空间与目录读写权限。",
  "The managed Codex runtime is incomplete. Remove it and reinstall.":
    "托管的 Codex 运行时不完整，请移除后重新安装。",
  "Codex is disabled in T3 Code settings.": "已在 T3 Code 设置中禁用 Codex。",
  "Codex provider status has not been checked in this session yet.":
    "当前会话尚未检查 Codex 服务商状态。",
  "Codex CLI is not authenticated. Run `codex login` and try again.":
    "Codex CLI 尚未认证，请运行 `codex login` 后重试。",
  "Timed out while checking Codex app-server provider status.":
    "检查 Codex app-server 服务商状态超时。",
  "Set a goal Codex keeps working toward until it is done": "设定目标并让 Codex 持续推进直至完成",
  "Send this thread and Codex logs to OpenAI": "将当前线程与 Codex 日志发送给 OpenAI",
  "Codex did not return its model catalog in time.": "Codex 未能及时返回模型目录。",
  "Failed to build Codex orchestration adapter.": "构建 Codex 编排适配器失败。",
  "Codex could not redeem the reset credit.": "Codex 无法使用限额重置额度。",
  "The reset was applied, but Codex could not confirm the new limits. Refresh to check.":
    "已应用重置，但 Codex 未能确认最新限额，请刷新查看。",
  "Set up Codex to get started.": "请先配置 Codex 以开始使用。",
  "Signed in with ChatGPT, but token sharing is disabled. Sign in again and enable token sharing, or use another provider.":
    "已使用 ChatGPT 登录，但未启用令牌共享。请重新登录并开启令牌共享，或改用其他服务商。",
  "Sign in with ChatGPT to use Codex.": "请使用 ChatGPT 登录以使用 Codex。",
  "ChatGPT tracks subscription usage across connected apps. Open Usage settings with the account you connected to Codex.":
    "ChatGPT 会在所有已连接应用间合并统计订阅用量。请使用连接到 Codex 的账号打开用量设置查看。",
  "ChatGPT usage": "ChatGPT 用量",
  "The ChatGPT connection changed while checking Codex. Retry.":
    "检查 Codex 期间 ChatGPT 连接发生变更，请重试。",
  "Could not check Codex right now. Retry, or reconnect in provider settings.":
    "当前无法检查 Codex 状态。请重试，或在服务商设置中重新连接。",
  "Could not prepare managed Codex.": "无法准备托管的 Codex 运行时。",
  "Codex text generation failed.": "Codex 文本生成失败。",
  "Could not prepare the private managed Codex token listener. Restart T3 and retry.":
    "无法准备托管 Codex 的本地私有令牌监听器，请重启 T3 Code 后重试。",
  "Set up managed Codex before starting a session.": "启动会话前请先完成托管 Codex 配置。",
  "Could not prepare the managed Codex runtime.": "无法准备托管的 Codex 运行时。",
  "Could not lock the ChatGPT connection for an update. Try again.":
    "无法锁定 ChatGPT 连接以执行更新，请重试。",
  "ChatGPT sharing is unavailable for this account or workspace. Use another provider or check its sharing policy.":
    "当前账号或工作区无法使用 ChatGPT 共享连接。请改用其他服务商，或检查工作区共享策略。",
  "Your ChatGPT usage limit was reached. Check ChatGPT Usage settings for your available allowance.":
    "已达到 ChatGPT 用量上限，请在 ChatGPT 用量设置中查看剩余额度。",
  "ChatGPT usage is temporarily unavailable. Try again shortly.":
    "ChatGPT 用量服务暂时不可用，请稍后重试。",
  "Codex used a feature that ChatGPT sharing does not support. Use another provider for this request.":
    "Codex 调用了 ChatGPT 共享连接不支持的功能，请改用其他服务商处理此请求。",
  "This app is not enabled for this ChatGPT connection. Use your existing CLI or another provider.":
    "当前 ChatGPT 连接未启用此应用，请改用现有本地 CLI 或其他服务商。",
  "ChatGPT does not support this request route.": "ChatGPT 不支持此请求路由。",
  "ChatGPT could not validate this connection. Check the selected account and sharing permissions.":
    "ChatGPT 无法验证此连接，请检查所选账号与共享权限。",
  "ChatGPT is temporarily unavailable. Try again shortly.": "ChatGPT 暂时不可用，请稍后重试。",
  "ChatGPT could not authorize this connection. Check the client and sharing permissions.":
    "ChatGPT 无法授权此连接，请检查客户端与共享权限。",
  "Codex sent a tool namespace that ChatGPT sharing does not support. Use another provider for this request.":
    "Codex 发送了 ChatGPT 共享连接不支持的工具命名空间，请改用其他服务商处理此请求。",
  "Codex sent an input item that ChatGPT sharing does not support. Use another provider for this request.":
    "Codex 发送了 ChatGPT 共享连接不支持的输入项，请改用其他服务商处理此请求。",
  "Signed out locally. Remote revocation could not be confirmed. Disconnect the app in ChatGPT Settings.":
    "已在本地退出登录，但无法确认远端授权是否已撤销。请在 ChatGPT 设置中断开此应用。",
  "Could not reach ChatGPT sign-in. Try again.": "无法连接 ChatGPT 登录服务，请重试。",
  "ChatGPT sign-in configuration could not be verified.": "无法验证 ChatGPT 登录配置。",
  "Could not read the saved ChatGPT connection.": "无法读取已保存的 ChatGPT 连接。",
  "The saved ChatGPT connection is invalid. Sign in again.":
    "已保存的 ChatGPT 连接无效，请重新登录。",
  "Could not save the ChatGPT connection.": "无法保存 ChatGPT 连接。",
  "Could not read the ChatGPT sign-in registration. Try again.":
    "无法读取 ChatGPT 登录注册信息，请重试。",
  "The saved ChatGPT sign-in registration is invalid.": "已保存的 ChatGPT 登录注册信息无效。",
  "Could not save the ChatGPT sign-in registration. Try again.":
    "无法保存 ChatGPT 登录注册信息，请重试。",
  "Could not clear the ChatGPT connection. Try again.": "无法清除 ChatGPT 连接信息，请重试。",
  "ChatGPT sign-in is temporarily unavailable. Try again.": "ChatGPT 登录服务暂时不可用，请重试。",
  "ChatGPT did not accept this sign-in. Try again.": "ChatGPT 未接受此次登录，请重试。",
  "Your ChatGPT connection expired or was disconnected. Sign in again.":
    "您的 ChatGPT 连接已过期或已断开，请重新登录。",
  "OpenAI rejected this app's client registration. Check the ChatGPT connection configuration.":
    "OpenAI 拒绝了此应用的客户端注册，请检查 ChatGPT 连接配置。",
  "This sign-in code expired. Start again.": "此登录授权码已过期，请重新发起登录。",
  "ChatGPT sign-in was declined. Sign in again when you are ready.":
    "已取消或拒绝 ChatGPT 登录，准备好后可随时重新登录。",
  "ChatGPT could not complete sign-in. Try again.": "ChatGPT 无法完成登录，请重试。",
  "ChatGPT returned an invalid token response. Sign in again.":
    "ChatGPT 返回了无效的令牌响应，请重新登录。",
  "Sign-in is no longer active.": "当前登录流程已失效。",
  "Could not start the local sign-in callback. Try again.": "无法启动本地登录回调服务，请重试。",
  "Could not start the local sign-in callback.": "无法启动本地登录回调服务。",
  "This redirect URL does not belong to the active ChatGPT sign-in.":
    "该回调 URL 不属于当前进行中的 ChatGPT 登录流程。",
  "ChatGPT sign-in could not be completed.": "无法完成 ChatGPT 登录。",
  "ChatGPT sign-in could not be verified. Start again.": "无法验证 ChatGPT 登录，请重新发起。",
  "ChatGPT sign-in could not be completed. Start again.": "无法完成 ChatGPT 登录，请重新发起。",
  "ChatGPT registration is incomplete. Start sign-in again.":
    "ChatGPT 登录注册未完成，请重新登录。",
  "This sign-in code expired. Reconnect the saved ChatGPT profile to start a fresh sign-in.":
    "此登录授权码已过期，请重新连接已保存的 ChatGPT 配置以发起新登录。",
  "ChatGPT did not return a verified identity. Sign in again.":
    "ChatGPT 未返回已验证的身份信息，请重新登录。",
  "This sign-in returned a different ChatGPT account. Use the different-account sign-in option instead. Your saved connection is unchanged.":
    "此次登录返回了另一个 ChatGPT 账号。请改用“使用其他账号”选项登录；原有的已保存连接未受影响。",
  "ChatGPT returned a conflicting account registration. Start again.":
    "ChatGPT 返回了冲突的账号注册信息，请重新发起登录。",
  "ChatGPT returned an unsupported connection. Sign in again.":
    "ChatGPT 返回了不受支持的连接类型，请重新登录。",
  "Token sharing was not enabled for the new account. Your existing ChatGPT connection is unchanged.":
    "新账号未开启令牌共享，原有的 ChatGPT 连接保持不变。",
  "Sign in with ChatGPT to use managed Codex.": "请使用 ChatGPT 登录以使用托管的 Codex。",
  "The ChatGPT connection changed. Start a new session.": "ChatGPT 连接已变更，请开启新会话。",
  "Token sharing is disabled. Sign in with ChatGPT and enable token sharing.":
    "未开启令牌共享，请使用 ChatGPT 登录并开启令牌共享。",
  "ChatGPT cannot renew this connection yet. Try again shortly.":
    "ChatGPT 暂时无法续期此连接，请稍后重试。",
  "Your ChatGPT connection expired. Sign in again.": "您的 ChatGPT 连接已过期，请重新登录。",
  "Could not renew the ChatGPT connection. Retry, or sign in again.":
    "无法续期 ChatGPT 连接，请重试或重新登录。",
  "ChatGPT returned an invalid renewal. Sign in again.":
    "ChatGPT 返回了无效的续期响应，请重新登录。",
  "ChatGPT token sharing is no longer enabled. Sign in again.":
    "ChatGPT 令牌共享已关闭，请重新登录。",
  "ChatGPT account": "ChatGPT 账号",
  "Only incomplete ChatGPT connections can be removed.": "仅可移除未完成的 ChatGPT 连接。",
  "Could not remove the saved ChatGPT connection. Try again.":
    "无法移除已保存的 ChatGPT 连接，请重试。",
  "This saved connection is no longer available.": "该已保存连接已失效。",
  "Complete ChatGPT sign-in before transferring this connection.":
    "迁移此连接前请先完成 ChatGPT 登录。",
  "The transferred ChatGPT connection is invalid or expired.": "迁移的 ChatGPT 连接无效或已过期。",
  "The transferred ChatGPT identity could not be verified.": "无法验证迁移的 ChatGPT 身份信息。",
  "The transferred ChatGPT identity does not match its profile.":
    "迁移的 ChatGPT 身份信息与其配置不匹配。",
  "The transferred identity conflicts with the saved ChatGPT connection.":
    "迁移的身份信息与已保存的 ChatGPT 连接冲突。",
  "Provider sign-in changed.": "服务商登录状态已变更。",
  "Another provider instance is changing this shared sign-in. Finish or cancel it first.":
    "另一个服务商实例正在修改此共享登录状态，请先完成或取消该操作。",
  "This provider does not support ChatGPT profile transfer.":
    "该服务商不支持迁移 ChatGPT 登录配置。",
  "This provider does not accept this sign-in interaction.": "该服务商不支持此登录交互操作。",
  "This provider does not support removing saved sign-in methods.":
    "该服务商不支持移除已保存的登录方式。",
  "Could not read provider installation settings.": "无法读取服务商安装设置。",
  "Managed installation is not available for this provider instance.":
    "此服务商实例不支持托管安装。",
  "The provider instance configuration is invalid.": "服务商实例配置无效。",
  "Choose managed setup to install Codex in T3 Code.":
    "若要在 T3 Code 中安装并管理 Codex，请选择托管模式。",
  "This instance uses a custom executable. Clear its binary path to manage installation in T3 Code.":
    "此实例使用了自定义可执行文件。清空可执行文件路径后即可由 T3 Code 托管安装。",
  Cancel: "取消",
  Decline: "拒绝",
  Approve: "批准",
  "Allow all edits this session": "本会话允许所有编辑",
  "Allow once": "仅允许一次",
  "Always allow": "始终允许",
  Deny: "拒绝",
  "View environment": "查看环境",
  "Read threads, status, checkpoints, and configuration.": "读取线程、状态、检查点与配置。",
  "Operate tasks": "操作任务",
  "Start, update, and stop tasks.": "启动、更新和停止任务。",
  "Change environment settings": "修改环境设置",
  "Edit environment preferences and keybindings.": "修改环境偏好设置与快捷键绑定。",
  "Manage providers": "管理服务商",
  "Configure, install, sign in to, and update providers and usage sources.":
    "配置、安装、登录及更新服务商与用量数据源。",
  "Maintain environment": "维护运行环境",
  "Update the server and control environment processes.": "更新服务端并管理运行环境进程。",
  "Control previews": "控制预览与自动化",
  "Open browser previews and host browser automation.": "打开内置浏览器预览并执行浏览器自动化。",
  "View diagnostics and usage": "查看诊断与用量",
  "Read process diagnostics, resource history, and usage totals.":
    "读取进程诊断、资源历史记录与累计用量。",
  "View terminals": "查看终端",
  "Read existing terminal output and status.": "读取现有终端输出内容与状态。",
  "Use terminals": "使用终端",
  "Create terminals and send input to running shells.": "创建终端并向运行中的 Shell 发送输入。",
  "Change source control": "执行源代码管理操作",
  "Commit, push, manage branches and repositories, and change pull requests.":
    "提交、推送、管理分支与仓库，以及操作拉取请求。",
  "Read files": "读取文件",
  "Browse host files, search workspaces, and inspect local changes.":
    "浏览主机文件、搜索工作区并查看本地代码改动。",
  "Write files": "写入文件",
  "Edit workspace files and save plans to disk.": "编辑工作区文件并将计划保存到磁盘。",
  "View access": "查看访问授权",
  "Inspect pairing links and authorized clients.": "查看配对链接与已授权客户端。",
  "Manage access": "管理访问授权",
  "Issue and revoke credentials for other clients.": "向其他客户端签发或撤销访问凭据。",
  "View relay": "查看中继连接",
  "Inspect managed relay connectivity.": "查看托管中继连接状态。",
  "Manage relay": "管理中继连接",
  "Change managed tunnel connectivity.": "修改托管隧道连接状态。",
  "Connect to this environment to view this session’s permissions.":
    "连接到此环境后即可查看当前会话的权限。",
  "Connect to this environment to view this session's permissions.":
    "连接到此环境后即可查看当前会话的权限。",
  "This environment did not accept your session. Reconnect to try again.":
    "该环境拒绝了当前会话，请重新连接后重试。",
  "Could not verify your permissions. Retrying automatically.":
    "无法验证当前会话权限，正在自动重试。",
  "Checking permissions…": "正在检查权限…",
  Overall: "总用量池",
  "Combined usage across both allowances, not a third quota.":
    "两个额度池的综合耗用进度，并非独立的第三份配额。",
  "Cursor Models": "Cursor 模型池",
  "Grok and Composer use this first. Auto can use either pool.":
    "Grok 与 Composer 优先消耗此额度池，Auto 模式可使用任一额度池。",
  "Other Models": "其他模型池",
  "Claude, GPT, and Gemini use this pool. Grok and Composer fall back here.":
    "Claude、GPT 与 Gemini 使用此额度池；Grok 与 Composer 超出后回退至此。",
  "Show this provider's usage limits": "显示此服务商的用量限额",
  Session: "当前会话窗口",
  Weekly: "每周窗口",
  Monthly: "每月窗口",
  "Monthly spend": "月度支出限额",
  "Monthly credit limit": "月度积分限额",
  "Sign in with Google to see Antigravity limits.":
    "请使用 Google 登录以查看 Antigravity 用量限额。",
  "Antigravity did not return usable quota information.": "Antigravity 未返回可用的配额信息。",
  "Could not read Antigravity limits. Refresh provider status to retry.":
    "无法读取 Antigravity 用量限额，请刷新服务商状态后重试。",
  "Codex could not be started to read usage.": "无法启动 Codex 以读取用量信息。",
  "Codex exited before it could report usage.": "Codex 在返回用量信息前已退出。",
  "Codex did not answer the usage request.": "Codex 未响应当次用量查询请求。",
  "File Manager": "文件管理器",
  "Access token": "访问令牌",
  "Scoped to one repository, project, or workspace. Create it in that item's Bitbucket settings.":
    "仅作用于单个仓库、项目或工作区，可在对应项目的 Bitbucket 设置中创建。",
  "Atlassian account email": "Atlassian 账号邮箱",
  "With an API token instead of an access token.": "配合 API 令牌（而非访问令牌）使用。",
  "API token": "API 令牌",
  "Reaches every repository your Atlassian account can. Give it read and write access to repositories and pull requests, and read:user:bitbucket.":
    "可访问您 Atlassian 账号权限范围内的所有仓库。请授予仓库与拉取请求的读写权限，以及 read:user:bitbucket 权限。",
  Token: "访问令牌",
  "A git.cafe token, used before CAFE_TOKEN and the cafe login, so GitCafe works without the CLI signed in.":
    "git.cafe 访问令牌，优先级高于 CAFE_TOKEN 环境变量与 cafe CLI 登录状态，无需登录 CLI 即可使用 GitCafe。",
  "Commit & push": "提交并推送",
  "Sync branch": "同步分支",
  "Commit & push to default branch?": "提交并推送到默认分支？",
  "Push to default branch?": "推送到默认分支？",
  Adaptive: "自适应",
  "1M Context": "1M 上下文",
  "Go · Monthly": "Go · 每月",
  "Go · Session": "Go · 会话",
  "Go · Weekly": "Go · 每周",
  Mode: "模式",
  "Session mode advertised by the ACP agent.": "由 ACP 智能体声明的会话模式。",
  "xAI API key": "xAI API 密钥",
  "Summarize the conversation and reduce context usage": "总结对话内容并减少上下文占用",
  "Send an empty string to the extension.": "向扩展发送空字符串。",
  "Submit empty value": "提交空值",
  "Set the service tier T3 Code sends with provider requests":
    "设置 T3 Code 在服务商请求中发送的服务层级",
  "Always allow this session": "本会话始终允许",
  "Allow for this thread": "在此线程中允许",
  "Keep full history": "保留完整历史",
  "Keep full history and skip future resume prompts.": "保留完整历史，并跳过后续恢复提示。",
  "Resume with a summary and use fewer tokens.": "使用摘要恢复并减少 Token 消耗。",
  "Resume without changing the conversation.": "保持原对话不变直接恢复。",
  "Committing...": "正在提交...",
  "Generating commit message...": "正在生成提交信息...",
  "Preparing feature branch...": "正在准备功能分支...",
  "Pushing...": "正在推送...",
  Commit: "提交",
  Pull: "拉取",
  Push: "推送",
  "Running source control action": "正在执行版本控制操作",
  Declined: "已拒绝",
  "Request ended": "请求已结束",
  "Waiting for an answer in the original thread": "正在原线程中等待回复",
  "Saved securely and kept private": "已安全保存并保密",
  equals: "等于",
  "does not equal": "不等于",
  exists: "存在",
  "is one of": "属于以下之一",
  "starts with": "开头为",
  Branch: "分支",
  Environment: "环境",
  "ID or link": "ID 或链接",
  Project: "项目",
  Machine: "机器",
  Speed: "速度",
  Working: "运行中",
  Connecting: "连接中",
  Completed: "已完成",
  Failed: "失败",
  "Pending Approval": "待批准",
  "Awaiting Input": "等待输入",
  "Guest Request": "访客请求",
  Waiting: "等待中",
  "Plan Ready": "计划就绪",
  "Current thread": "当前线程",
  Remote: "远程",
  "This morning": "今天上午",
  "This afternoon": "今天下午",
  "This evening": "今天晚上",
  Tomorrow: "明天",
  "Next week": "下周",
  Monday: "周一",
  Tuesday: "周二",
  Wednesday: "周三",
  Thursday: "周四",
  Friday: "周五",
  Saturday: "周六",
  Sunday: "周日",
  "Next Monday": "下周一",
  "Next Tuesday": "下周二",
  "Next Wednesday": "下周三",
  "Next Thursday": "下周四",
  "Next Friday": "下周五",
  "Next Saturday": "下周六",
  "Next Sunday": "下周日",
  now: "现在",
  "Passed for today": "今日时间已过",
  "Duplicate of an option above": "与上方选项重复",
  "Same time as an option above": "与上方选项唤醒时间相同",
  "Superseded attempt": "已被替代的尝试",
  Continued: "已继续",
  "Compacting context": "正在压缩上下文",
  "Context compaction": "上下文压缩",
  "Compacting before the cache expires…": "正在缓存过期前压缩上下文…",
  "Compacting…": "正在压缩上下文…",
  "Context automatically compacted before cache expiry": "已在缓存过期前自动压缩上下文",
  "Context compacted before sending": "发送前已压缩上下文",
  "read and write access to pull requests and contents": "对拉取请求（PR）和仓库内容的读写权限",
  "Install Git from https://git-scm.com/downloads or with your package manager.":
    "请从 https://git-scm.com/downloads 或通过包管理器安装 Git。",
  "Install Jujutsu with `brew install jj` or from https://github.com/jj-vcs/jj.":
    "请通过 `brew install jj` 或从 https://github.com/jj-vcs/jj 安装 Jujutsu。",
  "Install the GitHub command-line tool (`gh`) via https://cli.github.com/ or your package manager (for example `brew install gh`).":
    "请通过 https://cli.github.com/ 或包管理器（例如 `brew install gh`）安装 GitHub 命令行工具（`gh`）。",
  "Install the GitLab command-line tool (`glab`) from https://gitlab.com/gitlab-org/cli or your package manager (for example `brew install glab`).":
    "请从 https://gitlab.com/gitlab-org/cli 或通过包管理器（例如 `brew install glab`）安装 GitLab 命令行工具（`glab`）。",
  "Install `fj` 0.6 or later from https://codeberg.org/forgejo-contrib/forgejo-cli and run `fj --host <server-url> auth add-token`, or install `tea` 0.16 or later from https://gitea.com/gitea/tea and run `tea login add` for each Forgejo or Gitea server.":
    "请从 https://codeberg.org/forgejo-contrib/forgejo-cli 安装 `fj` 0.6 或更高版本并运行 `fj --host <server-url> auth add-token`，或从 https://gitea.com/gitea/tea 安装 `tea` 0.16 或更高版本并为每个 Forgejo 或 Gitea 服务器运行 `tea login add`。",
  "Run `tea login add` to authenticate a Forgejo or Gitea server.":
    "请运行 `tea login add` 以认证 Forgejo 或 Gitea 服务器。",
  "Install the Origin CLI with `curl -fsSL https://downloads.cursor.com/origin/install.sh | sh`, then run `origin auth login`.":
    "请使用 `curl -fsSL https://downloads.cursor.com/origin/install.sh | sh` 安装 Origin CLI，然后运行 `origin auth login`。",
  "Provider status unavailable. Open Source Control settings and rescan.":
    "服务状态不可用，请打开“版本控制”设置并重新扫描。",
  "Provider status unavailable. Open Settings -> Source control and rescan.":
    "服务状态不可用，请打开“设置 -> 版本控制”并重新扫描。",
  "Its saved settings, including any custom binary path, will be removed.":
    "已保存的设置（包括自定义可执行文件路径）将被移除。",
  "Its saved settings, including any custom binary path, will be removed. It will also be turned off.":
    "已保存的设置（包括自定义可执行文件路径）将被移除，并且该服务商将被关闭。",
  "Close browser while the agent is using it?": "智能体正在使用浏览器，确定要关闭吗？",
  "The agent is actively controlling this browser. Closing it may interrupt the current browser action.":
    "智能体正在控制此浏览器，关闭可能会中断当前的浏览器操作。",
  "The agent is actively controlling these browsers. Closing them may interrupt the current browser actions.":
    "智能体正在控制这些浏览器，关闭可能会中断当前的浏览器操作。",
  "Any running tasks will be interrupted. Make sure you're ready before continuing.":
    "所有正在运行的任务都会被中断，请确认准备就绪后再继续。",
  "This will move the thread out of your pinned section.": "这会将该线程移出置顶区域。",
  'Unpin thread "this thread"?': "确定取消置顶此线程？",
  Settled: "已归置",
  Snoozed: "已延后",
  Unpinned: "已取消置顶",
  Archived: "已归档",
  Discarded: "已丢弃",
  "Needs approval": "待审批",
  "Needs your input": "待输入确认",
  Done: "完成",
  Stopped: "已停止",
  "Could not obtain the T3 Connect session token.": "无法获取 T3 Connect 会话令牌。",
  "Timed out obtaining the T3 Connect session token.": "获取 T3 Connect 会话令牌超时。",
  "Could not refresh slow usage sources.": "无法刷新较慢的用量来源。",
  "Could not synchronize the thread.": "无法同步线程。",
  "Thread subscription failed; resubscribing.": "线程订阅失败，正在重新订阅。",
  "Type your own answer": "输入你自己的回答",
  "Add your own answer": "添加你自己的回答",
  "Agent is already processing": "智能体正在处理",
  "ACP session rejected a configuration option value": "ACP 会话拒绝了一个配置项的值",
  "This provider does not support /compact. Start a new thread to continue with a fresh context.":
    "此服务商不支持 /compact。请新建线程，以全新上下文继续。",
  "Cursor CLI config could not be read; using the default agent transport":
    "无法读取 Cursor CLI 配置，将使用默认智能体传输方式",
  "Cursor steer requires non-empty text.": "Cursor 插话引导需要非空文本。",
  "Cursor steer was interrupted before the run could take it.":
    "Cursor 插话引导在运行接收之前被中断。",
  "Login succeeded, but creating an SDK API key failed": "登录成功，但创建 SDK API 密钥失败",
  "Cursor signed you in but could not create an API key. Your team's settings may restrict API keys: ask a team admin, or add CURSOR_API_KEY in provider settings.":
    "Cursor 已让你登录，但无法创建 API 密钥。团队设置可能限制了 API 密钥：请联系团队管理员，或在服务商设置中添加 CURSOR_API_KEY。",
  "Login failed or timed out": "登录失败或超时",
  "Cursor sign-in failed or timed out. Check that this machine can reach Cursor, then start sign-in again.":
    "Cursor 登录失败或超时。请确认这台机器可以访问 Cursor，然后重新登录。",
  "Cursor sign-in failed": "Cursor 登录失败",
  "Grok session skipped the requested reasoning effort": "Grok 会话跳过了所请求的推理强度",
  "Kiro could not compact the conversation.": "Kiro 无法压缩此对话。",
  "Muse Code has not finished installing. Run `muse --version` on this T3 server host, then refresh its status.":
    "Muse Code 尚未完成安装。请在此 T3 服务器主机上运行 `muse --version`，然后刷新其状态。",
  "OpenCode provider list was empty.": "OpenCode 服务商列表为空。",
  "OpenCode could not read workspace usage.": "OpenCode 无法读取工作区用量。",
  "Failed to replace the OpenCode service after an update.": "更新后无法替换 OpenCode 服务。",
  "OpenCode service cannot be replaced through a shell shim":
    "无法通过 shell 垫片替换 OpenCode 服务",
  "OpenCode ended the turn with an error while T3 Code was reconnecting.":
    "T3 Code 重新连接时，OpenCode 以错误结束了本轮。",
  "The OpenCode event stream was lost and could not reconnect.":
    "OpenCode 事件流已丢失，且无法重新连接。",
  "No goal is set.": "尚未设置目标。",
  "No OpenCode Console workspace is signed in.": "尚未登录 OpenCode Console 工作区。",
  "Pi session closed while awaiting prompt acknowledgment": "等待提示确认时 Pi 会话已关闭",
  "Pi transport closed while awaiting prompt acknowledgment": "等待提示确认时 Pi 传输已关闭",
  "Cannot start a Pi turn after session closure": "会话关闭后无法开始 Pi 轮次",
  "Pi turn ownership changed before it could start": "Pi 轮次在开始前更换了所属线程",
  "Pi native wake belongs to a different app thread": "Pi 原生唤醒属于另一个应用线程",
  "Forgejo API request failed without an HTTP status.":
    "Forgejo API 请求失败，且没有 HTTP 状态码。",
  "Authenticate this server with `fj --host <server-url> auth add-token`.":
    "请使用 `fj --host <server-url> auth add-token` 认证此服务器。",
  "This workflow run has not finished.": "此工作流运行尚未结束。",
  "GitHub could not find the requested resource, or the credential cannot see it.":
    "GitHub 找不到所请求的资源，或当前凭证无权查看。",
  "GitHub Self-Hosted": "GitHub 自托管",
  "GitHub returned an invalid change request list.": "GitHub 返回了无效的变更请求列表。",
  "Params must be JSON.": "参数必须是 JSON。",
  "Message too large.": "消息过大。",
  "This tab has no agent owner. Ask the user to close it in the browser panel.":
    "此标签页没有智能体所有者。请让用户在浏览器面板中关闭它。",
};
