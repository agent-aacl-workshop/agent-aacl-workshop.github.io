# From Reasoning to Agency · AACL-IJCNLP 2026

英文 workshop 网站：**Learning, Acting, and Adapting with Foundation Models**。

森林绿与米白配色、原创 SVG 循环图、移动端导航、研究主题筛选、AoE／本地时间切换、CFP 文本下载、日历 `.ics` 下载，以及可展开的投稿 FAQ。字体和会场图片在站内提供，访问时不依赖 Google Fonts 等第三方资源。

生产构建会将全部内容预渲染到 HTML，方便搜索引擎索引；关闭 JavaScript 仍然可以阅读完整 CFP、主题、日期、组织者与 FAQ。部署后无需 Node.js 服务器。

## 本地运行

需要 Node.js 22.12+（或 20.19+）。

```bash
npm install
npm run dev
```

打开 Vite 输出的地址，通常为 `http://localhost:5173`。

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`，可以直接托管到 GitHub Pages、Cloudflare Pages、Netlify、Vercel 或普通静态服务器。资源使用相对路径，支持 GitHub Pages 的项目子目录。

如果本机已有 npm 缓存的权限问题，可使用独立缓存：

```bash
npm install --cache /tmp/aacl-npm-cache
```

## 修改内容

大部分内容集中在 **`src/data.ts`**：

- `workshop.organizers`：九位组织者，按提供的顺序排列。可添加 `url`（个人主页）和 `image`（照片路径）。未提供照片时显示姓名首字母。
- `workshop.speakers`：确定嘉宾后添加姓名、单位、主页、照片。
- `workshop.submissionUrl`：目前为 `null`。填入真实投稿地址后，页面自动显示投稿按钮。
- `workshop.contactEmail`：填入联系邮箱后，组织者区自动出现联系入口，下载的 CFP 也会包含邮箱。
- `workshop.confirmedWorkshopDay`：具体日期确认后填入 `YYYY-MM-DD`。当前 `null` 表示 11 月 9–10 日仅为 workshop 日期窗口；日历将此事件标为 tentative。
- `topics`：六个投稿研究方向与子主题。
- `deadlines`：Workshop Chair 提供的官方截止日期。
- `faqs`：投稿和出版政策。

整体布局与固定英文文案在 `src/App.tsx`；样式在 `src/styles.css`；日历和 CFP 内容生成在 `src/downloads.ts`；原创首屏图在 `src/Orbit.tsx`。

### 已确认内容

- Workshop 名称及完整副标题。
- ACL/ARR 模板，双盲评审，论文与补充材料匿名。
- 九位组织者及其单位。
- 2026 年 9 月 1 日 CFP；9 月 30 日截稿；10 月 7 日通知；10 月 12 日终稿；10 月 15 日论文集提交。
- 所有截止时间为 23:59 AoE（UTC−12）。网页的本地时区转换和 `.ics` 文件都正确处理日期跨天。
- 2026 年 11 月 9–10 日为 workshop 窗口，地点为珠海横琴，具体举办日和房间待公布。

### 待确认内容

- 投稿平台链接、联系邮箱、页数限制。
- 是否收录 ACL Anthology、是否提供非存档选项、同一工作向其他 venue 投稿的具体政策。
- 是否接收 ARR 已审稿论文及对应 commitment 时间。使用 ARR 模板不等于确认接收 ARR commitment。
- 具体举办日、房间、讲者、最终议程、线上参与和报告要求。

这些项目在网站中明确标注待确认，没有虚构提交链接、嘉宾姓名或出版承诺。10 月 15 日是组织者提交论文集的截止日；仅在正式出版论文集时适用。

具体举办日确认后，也请同步更新 `src/App.tsx` 页脚、`src/downloads.ts` CFP 文案和 `index.html` 分享描述中的日期。

## 检查

```bash
npx playwright install chromium
npm run build
npm test
```

测试覆盖主题筛选、手机菜单与键盘操作、官方日期和单位、AoE 到北京时间的换算、下载内容和 RFC 5545 日历格式、FAQ、站内链接、图片加载，以及 320／390／768／1024／1440px 的布局。

也可用已有 Chromium：

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chrome npm test
```

## 信息与素材来源

- 时间表：用户提供的 AACL 2026 Workshop Chair 邮件，以邮件日期为准，没有套用其他 workshop 的延期。
- 会议信息：[AACL-IJCNLP 2026](https://2026.aaclnet.org/)。
- 主会场名称及图片：[官方会场页面](https://2026.aaclnet.org/venue)，图片为 `venue_1.jpg` 的 WebP 优化版本。网站中显示来源署名。
- 模板：[ACL style files](https://github.com/acl-org/acl-style-files)。
- 字体：DM Sans、Manrope，通过 Fontsource 本地打包，采用 SIL Open Font License。
- 图标：Lucide，ISC License。
- 参考结构：用户提供的 NORA、WIESP、PlurVA-LLM、TrustAudio、ARRSI 网站；本站视觉及具体主题文案独立制作。

## GitHub Pages

仓库：[agent-aacl-workshop/agent-aacl-workshop.github.io](https://github.com/agent-aacl-workshop/agent-aacl-workshop.github.io)。

网站：[https://agent-aacl-workshop.github.io/](https://agent-aacl-workshop.github.io/)。

首次迁移：

1. 使用现有 GitHub 账号创建名为 `agent-aacl-workshop` 的免费组织。
2. 在该组织下创建公开仓库 `agent-aacl-workshop.github.io`，上传本项目代码。
3. 在新仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
4. 在 **Actions → Deploy workshop website → Run workflow** 中选择 `main` 并运行，等待部署成功。
5. 检查新网址的页面、图片和 CFP 下载链接；新站确认可用后，可将原站改为跳转页。

`github.io` 的子域名由所属账号或组织名决定，组织名和上述仓库名都必须匹配。资源使用相对路径，已兼容根目录部署，无需设置自定义域名或添加 `CNAME` 文件。

Pages 使用 **GitHub Actions** 发布。推送到 `main` 分支会自动运行 **Deploy workshop website**，构建并更新网站；也可以在 Actions 页面手动运行该 workflow。构建无需个人访问令牌，使用 GitHub 自动提供的部署权限。

也可以将 `dist/` 内容直接上传到其他静态站点。

网站的公开地址同时用于 `src/data.ts` 中的 CFP 下载链接，以及 `index.html` 中的 canonical 和 Open Graph 元数据。
