# 工程开发类功法

> 孙悟空的第十八变至第二十九变，涵盖TDD开发、复合工程、全栈冲刺、轻量工具集、代码审查、头脑风暴、计划编写。

---

## 第十八变「金箍棒」— TDD驱动开发

### 来源
整合自 Superpowers（obra/superpowers）

### 核心工作流

```
brainstorming → planning → TDD implementation → code review → branch finalization
```

### 头脑风暴阶段
1. 理解需求，不急于实现
2. 提出2-3个方案，列出利弊
3. 用户选择后进入计划阶段

### 计划编写规则

**零上下文假设**：假设执行计划的工程师对你一无所知。

**任务拆分原则**：
- 每个任务2-5分钟可完成
- 不允许任何TBD、TODO、"添加适当的错误处理"
- 每个任务必须是可独立验证的

**任务循环**：
```
1. 写失败的测试
2. 验证测试失败
3. 写最小实现
4. 验证测试通过
5. 提交
```

### TDD铁律
1. 不写产品代码，除非是为了让失败的测试通过
2. 测试写的量刚好够让它失败
3. 产品代码写的量刚好够让测试通过

### 代码审查
- 规格符合性检查先行
- 代码质量检查随后
- 自审清单：规格覆盖、占位符扫描、类型一致性

---

## 第十九变「炼丹」— 复合工程

### 来源
整合自 Compound Engineering（EveryInc/compound-engineering-plugin）

### 核心理念
**每个工程工作单元应该让后续工作更容易，而不是更难。**
80%规划审查 + 20%执行。

### 六命令循环

| 命令 | 阶段 | 说明 |
|------|------|------|
| `/ce:ideate` | 发现 | 主动分析代码库，提出改进建议 |
| `/ce:brainstorm` | 发散 | 交互式Q&A细化想法 |
| `/ce:plan` | 规划 | 创建详细执行计划 |
| `/ce:work` | 执行 | 按计划执行 |
| `/ce:review` | 审查 | 审查完成的工作 |
| `/ce:compound` | 复利 | 记录学习，让未来工作更容易 |

### 关键：/ce:compound

这是核心差异点。每个迭代结束后，将学习到的东西写回系统，形成**复利效应**。

### 跨平台支持
支持10+平台：OpenCode、Codex、Droid、Pi、Gemini、Copilot、Kiro、Windsurf、OpenClaw、Qwen

---

## 第二十变「天兵」— 全栈冲刺

### 来源
整合自 Gstack（garrytan/gstack）

### 冲刺流水线

```
Think → Plan → Build → Review → Test → Ship → Reflect
```

### 23位专家角色

**Think阶段：**
| 角色 | 说明 |
|------|------|
| YC Office Hours | YC创业导师视角 |

**Plan阶段：**
| 角色 | 说明 |
|------|------|
| CEO/Founder | 商业视角 |
| Engineering Manager | 工程管理视角 |
| Senior Designer | 设计视角 |
| DX Lead | 开发体验视角 |

**Review阶段：**
| 角色 | 说明 |
|------|------|
| Staff Engineer | 高级工程师审查 |
| Debugger | 调试专家 |
| Designer Who Codes | 设计工程师 |
| DX Tester | 开发体验测试 |

**Test阶段：**
| 角色 | 说明 |
|------|------|
| QA Lead | 质量保证 |
| Chief Security Officer | 安全审查（有hard-stop权） |

**Ship阶段：**
| 角色 | 说明 |
|------|------|
| Release Engineer | 发布工程 |
| SRE | 站点可靠性（金丝雀发布） |
| Performance Engineer | 性能基准 |
| Technical Writer | 文档 |

**Reflect阶段：**
| 角色 | 说明 |
|------|------|
| Engineering Manager | 回顾复盘 |

### 关键特性
- **阶段门控**：必须获得相应专家签字才能进入下一阶段
- **CSO hard-stop**：安全问题可以阻止任何合并
- **多Agent并行审查**：用Agent工具并行启动专家审查
- **浏览器自动化**：集成Playwright进行QA测试

---

## 第二十一变「武艺」— 轻量工程技能集

### 来源
整合自 Waza（tw93/waza）

### 8个核心技能

#### /think — 设计验证
```
4阶段：评估深度 → 理解问题 → 提出2-3方案(含权衡) → 验证架构
置信度3轴评估
"代码不写到用户批准设计后"
```

#### /hunt — 系统调试
```
核心原则："不确定根因前不动代码"
已知失败形态表：
- Timing（时序）
- Missing guard（缺失守卫）
- Ordering（顺序）
- Boundary（边界）
- Environment（环境）
- Stale value（过期值）
- Condition wait（条件等待）
3次假设失败 = 停止并上报
```

#### /check — 代码审查
```
3深度级别：Lightweight / Standard / Deep
Hard stops：破坏性自动执行、注入、共享状态
专家并行审查（Agent子代理）
自动修复路由：safe_auto / gated_auto / manual / advisory
Deep模式追加：对抗性安全审查
```

#### /design — UI设计
```
先锁定美学方向（4问）
字体规则：不用Inter/Roboto/system-ui作为展示字体
一色主导、3个有意的动效、控制性不对称
```

#### /write — 写作编辑
```
自动检测中英文
中文加载 write-zh.md，英文加载 write-en.md
先问受众，再编辑
不问就不解释
```

#### /learn — 深度研究
```
6阶段：Collect → Digest → Outline → Fill In → Refine → Publish
三层验证：跨域复现、生成力、独特性
红线：不对未读论文做AI摘要
```

#### /read — URL/PDF阅读
```
路由：飞书→API，PDF→提取，其他→fetch.sh代理级联
保存到~/Downloads/ + YAML前置元数据
无需API密钥（使用r.jina.ai代理）
```

#### /health — 配置审计
```
6层框架：CLAUDE.md → rules → skills → hooks → subagents → verifiers
3项目等级：Simple / Standard / Complex
启动2个并行子代理
严重性级别：[PASS] / [!] / [~] / [-]
```

---

## 第二十二变「妙笔」— 写作编辑

整合自 Waza /write
（见第二十一变中的 /write 部分）

### 补充规则
- 中英文自动检测，绝不混用
- 中文文案用中文语气，英文文案用英文语气
- 先了解目标受众再动笔

---

## 第二十三变「画圣」— UI设计

整合自 Waza /design
（见第二十一变中的 /design 部分）

### 补充规则
- 字体选择必须有理由，不接受"默认"
- 色彩方案必须有主导色
- 动效必须有目的
- 不对称必须有理由

---

## 第二十四变「悟空」— 深度研究

整合自 Waza /learn
（见第二十一变中的 /learn 部分）

---

## 第二十五变「过目」— 阅读

整合自 Waza /read
（见第二十一变中的 /read 部分）

---

## 第二十六变「火眼金睛」— 配置审计

整合自 Waza /health
（见第二十一变中的 /health 部分）

---

## 第二十七变「明察」— 代码审查

### 来源
整合自 Waza /check + Gstack /review

### 执行流程

1. **深度评估**：确定审查深度（Lightweight/Standard/Deep）
2. **文件扫描**：读取变更文件
3. **多维度检查**：
   - 功能正确性
   - 安全漏洞
   - 性能问题
   - 代码风格
   - 测试覆盖
4. **并行专家审查**（Deep模式）：
   - 安全专家
   - 性能专家
   - 架构专家
5. **对抗性审查**（Deep模式）：专门寻找边界情况和漏洞
6. **分类输出**：
   - safe_auto：可自动修复
   - gated_auto：确认后自动修复
   - manual：必须手动处理
   - advisory：建议性质

### Hard Stops
- 检测到破坏性自动执行 → 停止
- 检测到注入风险 → 停止
- 检测到共享状态问题 → 停止

---

## 第二十八变「灵光」— 头脑风暴

### 来源
整合自 Compound Engineering /ce:brainstorm + Superpowers brainstorming

### 执行流程

1. **理解问题**：确认要解决的问题
2. **发散阶段**：
   - 提出3-5个不同方向
   - 每个方向列出核心优势和风险
   - 不做评判，只做发散
3. **收敛阶段**：
   - 对比各方向
   - 识别最佳2个方案
   - 列出权衡清单
4. **决策辅助**：
   - 给出推荐（附理由）
   - 但最终决策权在用户

### 原则
- 不急于实现
- 每个方案都要有足够的细节来评估
- 明确标注假设和不确定性

---

## 第二十九变「布阵」— 计划编写

### 来源
整合自 Superpowers writing-plans

### 计划格式

```markdown
# [计划标题]

## 背景
[为什么需要做这个]

## 方案概述
[一句话描述选定的方案]

## 任务列表

### 任务1：[标题]
**预计时间**：2-5分钟
**文件**：[要修改的文件]
**测试**：[验证方式]
**步骤**：
1. [具体步骤]
2. [具体步骤]

### 任务2：...

## 验收标准
- [ ] [标准1]
- [ ] [标准2]
```

### 铁律
1. 零上下文假设：计划给一个完全不了解项目的人也能执行
2. 不允许TBD、TODO、"添加适当的错误处理"等占位符
3. 每个任务必须可独立验证
4. 先写测试，再写实现

### 自审清单
- [ ] 每个任务都有对应的测试
- [ ] 没有占位符
- [ ] 类型一致性已验证
- [ ] 边缘情况已考虑
