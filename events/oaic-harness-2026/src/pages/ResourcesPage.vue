<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en')

const links = [
  {
    zhName: 'ARC 中文文章《需求编译：让需求从文档走向“源代码”》',
    enName: 'Introductory article (Chinese): "Requirement Compilation"',
    url: 'https://mp.weixin.qq.com/s/AQSjEMdhEZZRetgQyVclGw',
    zhNote: '由 CoPhi 课题组于 2026 年 7 月 6 日发布，包含图解和实例，是最易读的入门材料。',
    enNote: 'Published by the CoPhi group, July 6, 2026. The gentlest introduction, with diagrams and worked examples.',
  },
  {
    zhName: 'ARC 代码仓库',
    enName: 'ARC source repository',
    url: 'https://github.com/code-philia/agentic-requirement-compiler',
    zhNote: '开源，MIT 许可。README 覆盖流水线说明、需求模型、CLI 用法和 ARC-Bench 集成。',
    enNote: 'Open source under MIT. The README covers the pipeline, requirement model, CLI usage, and ARC-Bench integration.',
  },
  {
    zhName: 'ARC-Bench 平台',
    enName: 'ARC-Bench platform',
    url: 'http://arc-bench.com',
    zhNote: '智能体实际运行和展示过程的平台。Quick Start 提供了上传自定义智能体包的完整步骤。',
    enNote: 'Where things actually run. The Quick Start walks through uploading a custom agent bundle.',
  },
  {
    zhName: 'ARC 论文预印本（arXiv:2602.13723）',
    enName: 'ARC paper preprint (arXiv:2602.13723)',
    url: 'https://arxiv.org/abs/2602.13723',
    zhNote: '《Compiling Large Multi-Modal Requirement Documents into Runnable Software Systems: From an Agentic Test-Driven Perspective》，ISSTA 2026 录用。评测细节、DSL 文法和用户研究都在里面。',
    enNote: '"Compiling Large Multi-Modal Requirement Documents into Runnable Software Systems: From an Agentic Test-Driven Perspective," accepted to ISSTA 2026. Evaluation details, the DSL grammar, and the user study are all here.',
  },
  {
    zhName: '订票系统需求样例',
    enName: 'Ticket-booking requirement sample',
    url: 'https://github.com/code-philia/agentic-requirement-compiler/tree/main/example/ticketbooking-demo',
    zhNote: '位于 ARC 仓库内，包含 requirements.yaml、requirements.md 和 7 张界面参考图，可快速了解一份需求文档应当是什么样子。',
    enNote: 'Inside the ARC repository. A requirements.yaml, a requirements.md, and seven reference screenshots — the fastest answer to "what should a requirement document look like?"',
  },
]
</script>

<template>
  <article class="py-32 bg-bg-primary min-h-screen">
    <div class="max-w-3xl mx-auto px-6 resources-content">
      <router-link to="/" class="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-12">← {{ isEn ? 'Back to Home' : '返回首页' }}</router-link>

      <h1 class="heading-serif text-4xl md:text-5xl text-text-primary mb-4">{{ isEn ? 'Start Here' : '从这里开始' }}</h1>
      <p class="text-text-tertiary mb-12">{{ isEn ? 'ARC, ARC-Bench, and requirement compilation — explained in one place.' : '一页了解 ARC、ARC-Bench 和需求编译。' }}</p>

      <p class="lede">{{ isEn ? 'This series uses ARC-Bench, built at Shanghai Jiao Tong University, as its main competition system. Material on ARC and ARC-Bench is scattered across several places — the article on WeChat, the code on GitHub, the platform at its own address, and the paper as a PDF. This page gathers it all in one place, in the order we suggest reading it. No prior background is assumed.' : '本系列赛事采用由上海交通大学研发的 ARC-Bench 作为主要比赛系统。ARC 和 ARC-Bench 的资料分散在多个渠道：介绍文章发布在微信公众号，代码托管在 GitHub，平台有独立网站，论文则以 PDF 形式提供。本页将这些资料汇总到一起，并按照建议的阅读顺序排列，无需任何前置知识。' }}</p>

      <section>
        <h2>{{ isEn ? '1. Three names, often confused' : '1. 先分清三个概念' }}</h2>
        <p>{{ isEn ? 'Three terms come up constantly and get mixed together. They are not the same kind of thing.' : '以下三个概念经常同时出现，也很容易被混淆，但它们并不是同一类事物。' }}</p>
        <ul>
          <li><strong>{{ isEn ? 'Requirement compilation' : '需求编译' }}</strong> — {{ isEn ? 'an idea, or a way of working.' : '一种理念，也是一套工作方法。' }}</li>
          <li><strong>ARC</strong> — {{ isEn ? 'a tool that implements that idea.' : '实现需求编译理念的工具。' }}</li>
          <li><strong>ARC-Bench</strong> — {{ isEn ? 'the platform where that tool runs and shows its work.' : '运行 ARC 并展示其工作过程的平台。' }}</li>
        </ul>
        <p>{{ isEn ? 'An analogy: requirement compilation is like the idea of writing programs in a high-level language. ARC is the compiler. ARC-Bench is the machine you run the compiler on, with a screen attached.' : '可以这样类比：需求编译相当于“使用高级语言编程”这一理念，ARC 是编译器，ARC-Bench 则是运行编译器并展示运行过程的计算机。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '2. What problem is being solved' : '2. 它想解决什么问题' }}</h2>
        <p>{{ isEn ? 'The common way to write code with AI today is prompt-centric: you write a long description, the model infers the structure on its own, and it produces code in one or a few broad passes. This works for small things. As requirements grow, the model drifts — and when the result is wrong, it is hard to say which sentence was the one that was underspecified.' : '目前使用 AI 编写代码的常见方式以提示词为中心：先写一段较长的描述，由模型自行推断结构，再通过一次或几次大范围生成产出代码。这种方式适合小型任务；随着需求增多，模型容易偏离目标，而结果出错时，也很难定位究竟是哪一处描述不够明确。' }}</p>
        <p>{{ isEn ? 'Requirement compilation takes a different view, borrowed from compilers:' : '需求编译借鉴了编译器的思路，从另一个角度处理这个问题：' }}</p>
        <ul>
          <li>{{ isEn ? 'Requirements are not just context. They are the source program.' : '需求不只是上下文，它就是源程序。' }}</li>
          <li>{{ isEn ? 'Tests are not just verification. They are executable constraints.' : '测试不只是验证手段，它是可执行的约束。' }}</li>
          <li>{{ isEn ? 'Traceability is not optional metadata. It is part of the contract.' : '追溯不是可有可无的元数据，它是契约的一部分。' }}</li>
        </ul>
        <p>{{ isEn ? 'In practice that means modelling the requirement document as a structured graph — each node carrying its dependencies, its scenarios, and optional references such as screenshots — and then compiling it in stages: design the interfaces first, generate tests from the scenarios, then write the implementation against those tests. Each ⟨node, stage⟩ pair leaves a git commit behind, so the chain from requirement to design to test to code stays traceable.' : '具体来说，需求文档会被建模为一张结构化图：每个需求节点都包含依赖关系、场景，以及截图等可选参考资料。随后按阶段进行编译：先设计接口，再根据场景生成测试，最后依据这些测试完成实现。每一组〈节点，阶段〉都会留下一个 Git 提交，使“需求 → 设计 → 测试 → 代码”的完整链路始终可追溯。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '3. What ARC is' : '3. ARC 是什么' }}</h2>
        <p>{{ isEn ? 'ARC (Agentic Requirement Compiler) is the open-source implementation of that method — MIT licensed, Python 3.11+, currently offered as a command-line tool. Its pipeline runs in four stages: structured requirement modelling, interface design, test-first generation, and test-driven implementation.' : 'ARC（Agentic Requirement Compiler）是上述方法的开源实现，采用 MIT 许可证，支持 Python 3.11 及以上版本，目前以命令行工具的形式提供。它的流水线分为四个阶段：结构化需求建模、接口设计、测试优先生成和测试驱动实现。' }}</p>
        <p>{{ isEn ? 'If you only look at one thing in the repository, make it the ticket-booking sample under example/. It is a complete requirement document for a booking system, and it answers the question everyone asks first — what is ARC actually expecting me to write? — faster than the documentation does.' : '如果只查看仓库中的一项内容，建议先看 example/ 目录下的订票系统样例。它包含一份完整的订票系统需求文档，能够比说明文档更快地回答最常见的问题：ARC 到底需要我编写什么？' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '4. What ARC-Bench is' : '4. ARC-Bench 是什么' }}</h2>
        <p>{{ isEn ? 'ARC-Bench provides the container runtime, workspace lifecycle, event streaming, and the visualization layer. ARC does the actual requirement-to-project compilation inside that environment. You can package your own agent and upload it, then watch the run unfold rather than reading it out of a log afterwards.' : 'ARC-Bench 提供容器运行时、工作区生命周期管理、事件流和可视化层，ARC 则在这一环境中完成从需求到项目的实际编译。你可以将自己的智能体打包上传，直接观察完整运行过程，无需事后从日志中反向还原。' }}</p>
        <p>{{ isEn ? 'For teams in this series, this is where a harness gets run and submitted. The Quick Start on the platform has the full upload instructions.' : '对本系列赛事的参赛队伍而言，ARC-Bench 是运行和提交 Harness 的平台。平台的 Quick Start 提供了完整的上传说明。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '5. The research behind it' : '5. 背后的研究' }}</h2>
        <p>{{ isEn ? 'The method is described in "Compiling Large Multi-Modal Requirement Documents into Runnable Software Systems: From an Agentic Test-Driven Perspective," accepted to ISSTA 2026 on June 25, 2026, from the CoPhi group at Shanghai Jiao Tong University. The evaluation covers six medium-sized web systems of 50 to 200 requirement scenarios each, plus 101 small mobile applications.' : '上海交通大学 CoPhi 团队在论文《Compiling Large Multi-Modal Requirement Documents into Runnable Software Systems: From an Agentic Test-Driven Perspective》中阐述了这套方法；该论文于 2026 年 6 月 25 日被 ISSTA 2026 录用。评测覆盖 6 个中型 Web 系统（每个包含 50—200 个需求场景）和 101 个小型移动应用。' }}</p>
        <p class="muted">{{ isEn ? 'The preprint is on arXiv (2602.13723) and is linked below. Note that the arXiv version is revised from time to time, so the numbers you read there may be slightly ahead of the ones quoted here.' : '预印本已在 arXiv 公开（2602.13723），链接见下方清单。注意 arXiv 上的版本会不定期修订，你读到的数字可能比这里引用的更新。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '6. Where to start' : '6. 建议的上手顺序' }}</h2>
        <ol>
          <li><strong>{{ isEn ? 'Read the article' : '读文章' }}</strong> — {{ isEn ? 'about 30 minutes. It builds the concepts with pictures.' : '大约 30 分钟，用图把概念讲清楚。' }}</li>
          <li><strong>{{ isEn ? 'Open the sample' : '看样例' }}</strong> — {{ isEn ? 'see what a requirement document looks like before writing one.' : '在自己动手写之前，先看看需求文档长什么样。' }}</li>
          <li><strong>{{ isEn ? 'Run it locally' : '本地跑起来' }}</strong> — {{ isEn ? 'clone the repository and try the CLI on the sample.' : '克隆仓库，拿样例试一遍命令行。' }}</li>
          <li><strong>{{ isEn ? 'Move to the platform' : '使用平台' }}</strong> — {{ isEn ? 'package your agent and upload it to ARC-Bench.' : '将智能体打包并上传到 ARC-Bench。' }}</li>
          <li><strong>{{ isEn ? 'Go deeper' : '再深入' }}</strong> — {{ isEn ? 'read the paper when you want the evaluation details.' : '想了解评测细节时，读论文。' }}</li>
        </ol>
        <p>{{ isEn ? 'To clone the repository:' : '克隆仓库的命令：' }}</p>
        <pre><code>git clone https://github.com/code-philia/agentic-requirement-compiler.git</code></pre>
      </section>

      <section>
        <h2>{{ isEn ? '7. The list' : '7. 资料清单' }}</h2>
        <ul class="linklist">
          <li v-for="link in links" :key="link.url">
            <a :href="link.url" target="_blank" rel="noopener">{{ isEn ? link.enName : link.zhName }}</a>
            <span class="block">{{ isEn ? link.enNote : link.zhNote }}</span>
          </li>
        </ul>
      </section>

      <p class="closing">{{ isEn ? 'If something you need is still missing from this page, tell us — the gap is ours to close, not yours to work around.' : '如果本页仍缺少你需要的内容，请告诉我们——补齐材料是我们的责任，不应由你自行寻找替代方案。' }}</p>
    </div>
  </article>
</template>

<style scoped>
.resources-content section { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; }
.resources-content h2 { font-family: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif; color: var(--color-text-primary); font-size: 1.6rem; font-weight: 600; letter-spacing: -.035em; margin-bottom: 1rem; }
.resources-content p, .resources-content li { color: var(--color-text-secondary); line-height: 1.85; margin-bottom: .75rem; }
.resources-content ul, .resources-content ol { padding-left: 1.35rem; list-style: disc; }
.resources-content ol { list-style: decimal; }
.resources-content .lede { font-size: 1.075rem; color: var(--color-text-tertiary); line-height: 1.9; }
.resources-content .muted { color: var(--color-text-muted); font-size: .9rem; }
.resources-content .closing { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; color: var(--color-text-tertiary); }
.resources-content pre { background: var(--color-bg-secondary); border: 1px solid var(--color-border); padding: .85rem 1rem; overflow-x: auto; margin-bottom: .75rem; }
.resources-content code { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: .82rem; color: var(--color-text-secondary); }
.resources-content .linklist { list-style: none; padding-left: 0; }
.resources-content .linklist li { border-left: 2px solid var(--color-border); padding-left: 1rem; margin-bottom: 1.5rem; }
.resources-content .linklist a { color: var(--color-accent); text-decoration: none; font-weight: 600; }
.resources-content .linklist a:hover { text-decoration: underline; }
.resources-content .linklist span { color: var(--color-text-muted); font-size: .92rem; line-height: 1.7; margin-top: .3rem; }
</style>
