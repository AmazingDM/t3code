# T3 Code

**[English](./README.md)** · **简体中文**

T3 Code 是一个面向编程智能体的统一控制中心（Agent Harness Control Surface）。你可以通过移动端应用（[iOS](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824)、[Android](https://play.google.com/store/apps/details?id=com.t3tools.t3code)）、[Web 端](https://app.t3.codes) 以及基于 Electron 的桌面客户端统一调度并掌控本机或远端环境中的编程智能体。

支持直接复用你在 Claude Code、Codex、Cursor、Grok Build、OpenCode、Google Antigravity 与 fx 上的现有订阅与登录状态——只要本机已完成配置，T3 Code 即可直接接管协同。

## 国际化（i18n）中文汉化与多语言支持

本仓库在持续跟进上游官方正式版的基础上，内置了完整的 **i18n 国际化架构**与开箱即用的**简体中文（`zh-Hans`）汉化支持**，并原生具备**扩展任意更多语言**的能力：

- **开箱即用的简体中文汉化与双语切换**：
  - 全量覆盖 Web 与桌面端 **5,088+ 条编译期 UI 文案**，以及跨包服务商配置说明、认证引导、模型推理挡位、状态徽章、Toast 通知、确认弹窗、Electron 原生顶部菜单与右键上下文菜单（严格保留 `T3 Code` 品牌名、各服务商名称与用户自定义项目标题不翻译，贴合多智能体开发场景语义）。
  - 支持在 **`设置 -> 常规 -> 显示语言`**（**Settings → General → Display language**）中随时切换 `跟随系统` / `简体中文` / `English`。
  - 设置搜索支持**中英双语检索**：在中文界面下输入英文原词或中文关键词均可命中对应配置项。
  - 已打包好的简体中文桌面客户端安装包可直接前往 **[AmazingDM/t3code Releases](https://github.com/AmazingDM/t3code/releases)** 下载。
- **架构级可扩展支持更多语言（如 `zh-Hant`、`ja`、`ko`、`es`、`fr`、`de` 等）**：
  - 本项目采用 **Oxc AST 编译期无侵入自动提取改写插件**（`i18n/transform.mjs` + `i18n/sync.mjs`）与**轻量运行时词典**（`apps/web/src/i18n/`）双层设计，无需逐个侵入修改上游 React 业务组件，既保证与上游版本低冲突同步，又可轻松扩展任意新语种：
    1. **提取与生成语言词典**：运行 `node i18n/sync.mjs` 从全仓 AST 自动扫描提取标准英文键，新增目标语言的 `i18n/<locale>.auto.json` 与 `i18n/<locale>.override.json` 词典文件（支持配置 `OPENAI_API_KEY` 自动批量初译）。
    2. **注册语言选项与运行时映射**：在 `apps/web/src/i18n/locale.ts` 与 `SettingsPanels.tsx` 的显示语言下拉框中注册新语种代码及动态词典，并在 `i18n/transform.mjs` 中接入对应语种字典映射。
    3. **适配桌面原生菜单**：在 `apps/desktop/src/window/` 与打包配置的 `electronLanguages` 中补充对应语种的原生菜单文案与语言包即可完整交付。

## 安装与获取

> [!WARNING]
> T3 Code 目前支持 Codex、Claude、Cursor、Grok Build、OpenCode、Antigravity 和 fx。使用前请至少安装并登录其中一个服务商：
>
> - **Codex**：安装 [Codex CLI](https://developers.openai.com/codex/cli) 并运行 `codex login`
> - **Claude**：安装 [Claude Code](https://claude.com/product/claude-code) 并运行 `claude auth login`
> - **Cursor**：安装 [Cursor CLI](https://cursor.com/cli) 并运行 `agent login`
> - **Grok Build**：安装 [Grok Build CLI](https://x.ai/cli) 并运行 `grok login`
> - **OpenCode**：安装 [OpenCode](https://opencode.ai) 并运行 `opencode auth login`
> - **Antigravity**：在设置中启用后点击 **安装 Antigravity** 并使用 Google 账号登录，无需额外安装 CLI
> - **fx**：在运行 T3 Code 服务端的机器上安装 [fx](https://fx.sh) 并执行 `fx login`（参考[配置指南](./docs/user/providers-fx.md)）

### 下载中文/多语言桌面客户端（推荐）

前往本仓库 **[AmazingDM/t3code Releases](https://github.com/AmazingDM/t3code/releases)** 下载最新版本的安装包（如 `T3-Code-*-x64.exe`）直接安装即可；安装后默认跟随系统语言自动启用简体中文，也可在 `设置 -> 常规 -> 显示语言` 中手动切换。

### 上游官方安装渠道（英文原版）

若需安装上游原版 CLI 或包管理器版本，可参考 [pingdotgg/t3code Releases](https://github.com/pingdotgg/t3code/releases)：

#### 命令行安装

```bash
curl -fsSL https://t3.codes/install.sh | sh
```

Windows PowerShell：

```powershell
irm https://t3.codes/install.ps1 | iex
```

随后运行 `t3` 即可启动本地服务并打开 Web 界面；`t3 service install` 可注册后台常驻服务，`t3 --help` 查看完整命令参数。

## 文档导航

完整英文文档位于 [docs/](./docs) 目录：

- [常见问题（FAQ）](./docs/user/faq.md)
- [安装与首次运行](./docs/user/install.md)
- [权限模式说明](./docs/user/permission-modes.md)
- [键盘快捷键](./docs/user/keybindings.md)
- [项目设置](./docs/user/project-settings.md)
- [外观偏好设置](./docs/user/appearance.md)
- [手机或跨设备远程访问](./docs/user/remote-access.md)
- [通过 MCP 连接外部智能体](./docs/user/outside-agents.md)
- [版本控制集成](./docs/user/source-control.md)
- 多账号管理：[Codex](./docs/user/providers-codex.md) · [Claude](./docs/user/providers-claude.md)
- [作为后台服务运行](./docs/user/background-service.md)
- 源码架构与构建指南：[docs/internals/overview.md](./docs/internals/overview.md)

## 本地源码构建与多语言词条同步

### 1. 安装 `vp`（Vite+）

```bash
# macOS / Linux
curl -fsSL https://vite.plus | bash
```

```powershell
# Windows PowerShell
irm https://vite.plus/ps1 | iex
```

### 2. 安装依赖与开发调试

```bash
vp i
node i18n/sync.mjs   # 扫描并校验 i18n 词条覆盖率
vp dev:desktop       # 启动桌面端开发模式
```
