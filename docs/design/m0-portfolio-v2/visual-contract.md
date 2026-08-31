# M0 Portfolio v2 — Visual Baseline Contract

- Date: 2026-08-31
- Project: deshengkong-site
- Direction status: `CURRENT_M0_DIRECTION_SELECTED`
- SVG status: `RECONSTRUCTED_BASELINE / USER_REVIEW_PENDING`
- M1 implementation: `NOT_AUTHORISED_IN_THIS_BATCH`

## 1. 本次保存的是什么

用户要求按推荐保存当前展示内容为 SVG，以约束后续 M1，并先查看施工步骤。本合同记录已选的当前 M0 方向；不把“保存方向”扩大成 M1 开工、主域名部署或真实材料公开授权。

- **原 PNG 是视觉参考**：[桌面首页](../m0-portfolio-v1/01-home-desktop.png)、[案例详情](../m0-portfolio-v1/02-case-study-desktop.png)、[手机首页节选](../m0-portfolio-v1/03-home-mobile.png)。保留原文件、原 manifest、旧候选说明和历史图，不覆盖。
- **SVG 是可编辑布局基线**：[三页合集母版](portfolio-master.svg)，以及 [桌面首页](01-home-desktop.svg)、[案例详情](02-case-study-desktop.svg)、[手机首页节选](03-home-mobile.svg)。它们重建文字、框架、分组和素材位置；不是原 PNG 的逐像素等价版本，也不是已单独验收的精确 SVG。
- 数值入口为 [design-tokens.json](design-tokens.json)；SVG 的最终实际坐标由同目录 `layout-spec.json` 描述。二者是重建记录，不能冒称生成图片附带的原始设计参数。
- 优先顺序：**用户明确文字修正 → 原 PNG 的布局与视觉意图 → 经核对的 SVG/坐标 → CSS 实现**。几何或字号冲突先与原 PNG 比较并记录修正，不以重建误差重新设计页面。
- v1 的候选状态是当时的历史状态；本次只将当前方向记录为 selected。SVG 编辑重开、视觉检查和后续用户接受仍按各自 QA 如实记录；本合同不替代它们。

## 2. 固定内容及业务边界

类型是求职与合作用途的公开个人作品集/内容站。主流程是“看案例 → 理解个人贡献及成果边界 → 联系或查看明确标注的外部 demo”。只展示内容，不提供公司服务的操作入口；没有后台、登录、客户数据、支付或生产控制。

唯一标题修正：原图中的 `AI Platform & Customer Portal` 统一改为 **`UAI API Customer Portal`**，对应 `uai-api-private-beta` 已有的 M1 客户门户演示，不代表共享 GPU 平台全部产品化或真实客户 API 已上线。为避免图片冒充实证，所有概念缩略图补齐明确的示意标识；这属于来源披露，不是更换视觉方向。

| 首页顺序 | 展示标题 | 状态及允许主张 |
|---|---|---|
| 1 | Virtual Concierge | `FIELD-TESTED`；有记录的用户现场链路验收，不承诺 SLA/实时健康 |
| 2 | UAI API Customer Portal | `DEMO`；fixture 客户旅程，不是真实 API、计费或客户访问 |
| 3 | Media & Visual Tools | `IN DEVELOPMENT`；人审参与的内容与视觉流程，新编辑交付仍待验 |
| 4 | iClaude Workbench | `IN DEVELOPMENT`；本机上下文与受控交接，最新视觉工作仍待验 |

首页保留 `AI systems. Built for real work.`、当前短摘要、主次 CTA 及四案例层级，不另写虚构业绩。详情页持续显示 `DEMO · SYNTHETIC DATA` 及“无 live API / 真实客户 / billing / production inference”边界。

**全部原图、SVG 内的产品图和界面缩略图均为概念素材。** 每一幅显示 `Concept illustration` 或 `Illustrative interface`；门户另外保留 `DEMO DATA`。真实截图只有在内容校准、遮盖敏感信息并获准公开后，才能在原有素材框中替换；不得发送私密报告、账号、内部拓扑或客户信息给外部生成服务。已有证据与这套示意图是两条不同来源链。

## 3. 布局与视觉基线

下列数值是 SVG 重建坐标单位，不代表浏览器 CSS 像素，也不是从原 PNG 精确恢复的字体参数。以视觉层级、容器关系、对齐、留白与内容顺序约束 M1。

| 项目 | 固定基线 |
|---|---|
| 桌面参考画布 | 首页与详情均 `1024 × 1536`；左右留白约 `40`，主内容宽约 `944` |
| 手机参考画布 | `853 × 1844`，只截取首页前两案例；左右约 `48–52`，其余案例在真实页面继续 |
| 颜色 | 浅底 `#FBFCFD`、深墨 `#080B10`、蓝 `#064FF5`、分隔线 `#CFD7E3`、浅蓝面 `#F3F7FF`、卡片白 `#FFFFFF`；具体重建值见 tokens |
| 字体 | 干净的无衬线；SVG 重建选择 `Arial/Helvetica/sans-serif`，标签 `Consolas/Courier New/monospace`，以实际生成脚本为准，不是识别出的原图字体。M1 先复用可用系统字体，不下载或嵌入未核授权的系统字体；校准字面宽与行高 |
| 文字层级 | 桌面首页 hero 约 `80`/700，详情约 `68`/700；手机原图 hero 约 `90`/700、主要正文约 `28`。这些手机数值不得直接作为 390px 网页字号 |
| 首页 hero | 桌面左大标题/简介/CTA，右 Interface–Knowledge–Workflow 概念图；大标题保持三行节奏。手机去掉复杂系统图，用精简能力文字带 |
| 导航/能力带 | 顶部姓名、Work、About、Get in touch；细横线分隔。桌面四项能力横排，手机简化为 `AI · Interfaces · Workflows` |
| 案例列表 | 桌面两列两行，图在上、状态/标题/摘要/链接在下；卡片起点约 `x40/515`、`y781/1079`，间隙约 `16`，细边框与轻圆角 |
| 手机案例 | 单列、图片在上文字在下，不能退回拥挤的横向图文卡。首图约 `y908` 高 `230`，第二卡约 `y1349`；保留状态文字 |
| 详情页 | 返回链接 → 状态 → 标题/摘要/CTA → Role/Focus/Stage → 大幅带披露的示意界面 → 三列 My contribution → demo 能力与边界 → 联系带 |
| 手机详情适配 | 沿用详情阅读顺序，贡献三列和下方两栏改纵排；这是待实现响应式映射，不是另一个获批设计稿 |
| 组件/留白 | 蓝主按钮、低强调次按钮，链接带方向提示；卡片轻边框、约 `8–12` 圆角；区块靠留白与细线分隔，不新增重阴影、渐变大背景或漂浮装饰 |

## 4. M1 不能漂移的部分

- 不能未经确认换深色主题、主色、字体风格、hero 构图、四例顺序、卡片方向、详情阅读顺序或增加全新营销板块。
- 不用一张 PNG/SVG 充当可操作网页。导航、标题、状态、卡片、链接与正文须用真实 Next/React/HTML 组件；概念素材只占图片层。
- 可以为实际文字、键盘使用、触控目标与无横向溢出做最薄适配，但必须记录差异并对照原图，不借适配扩大成新设计。
- 不因手机原图只显示两例而删掉剩余两例；也不把 SVG 的 `textLength` 机械转换成网页压扁文字。
- M1 记录实际采用的字体名称、版本/度量与验收环境；本地及线上对照使用相同字体环境、固定容器和显式 hero 换行。不能只记录 CSS font-family 就宣称字形完全一致。跨设备字体原样复现当前 `NOT_VERIFIED`；先检查回退字体不会溢出，不宣称 Windows/macOS 已一致。
- 当前控件表仍是 [v1 的待实现映射](../m0-portfolio-v1/README.md#proposed-controls--not-an-approved-interaction-contract)。M1 内实现并验收真实导航、菜单、外链、缺图与 404；本文件不是 `APPROVED_INTERACTION_CONTRACT`。

## 5. 对照验收与下一阶段

M1 在选定执行环境后，以 `320/390/768/1024/1440` CSS 像素宽检查。`1024` 是桌面原图对照宽度；手机 `853` 是生成图片宽度，不应被误称为手机浏览器视口。`390` 实现先对照手机图的比例、顺序和密度，再验证其它窄屏。

保留同宽截图、原图/SVG/网页对照和简短差异表：检查标题换行、hero 比例、卡片列数/顺序、图片框、状态、CTA、段间留白及示意标识。生成图与浏览器抗锯齿并不相同，不能用“像素完全相同”作虚假承诺；发现明显结构变化须先修复或获得明确的新方向确认。本地 SVG 结构/渲染检查不等于 Penpot/draw.io GUI 编辑重开验收，未做的后端检查必须留作未验证。

网站源码与同一构建的稳定预览按 [M1 workflow v1](../../workflows/m1-portfolio-workflow-v1.md) 执行。当前只交付保存内容和施工步骤，不启动 M1、dev server、E2E 或任何部署。
