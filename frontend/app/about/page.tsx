import { BookOpen, Shield, Zap, DollarSign, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl bg-gray-50 py-6">
      <h1 className="mb-4 text-xl font-medium text-gray-800">关于我们</h1>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm leading-relaxed text-gray-700">
          开源雷达（free and open source software
          rader，fossrader）旨在为开发者、企业和组织提供优质项目索引、项目评估和漏洞分析服务。
          我们聚合了多个开源项目平台（如Github、Gitte、Gitclode），从这些平台获取开源项目数据并进行分析。
        </p>
      </div>

      <h2 className="mb-3 text-lg font-medium text-gray-800">我们的服务</h2>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center">
            <div className="mr-2 rounded-full bg-blue-100 p-1.5">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-800">项目索引</h3>
          </div>
          <p className="text-sm text-gray-600">提供全面的开源项目目录，帮助开发者快速找到适合的工具和库。</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center">
            <div className="mr-2 rounded-full bg-green-100 p-1.5">
              <Zap className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-800">项目评估</h3>
          </div>
          <p className="text-sm text-gray-600">对开源项目进行全面评估，包括代码质量、社区活跃度和维护状态。</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center">
            <div className="mr-2 rounded-full bg-amber-100 p-1.5">
              <Shield className="h-4 w-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-800">漏洞分析</h3>
          </div>
          <p className="text-sm text-gray-600">识别和报告开源项目中的安全漏洞，帮助开发者和企业降低风险。</p>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-medium text-gray-800">我们的盈利模式</h2>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5 rounded-full bg-purple-100 p-1.5">
            <DollarSign className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm leading-relaxed text-gray-700">
              目前，项目采取了非盈利的经营方式。您可以无限制地浏览项目列表、查看项目的基本分析数据，和提交项目分析请求。
              请注意，高峰期阶段的项目分析请求将会以队列的方式排队进行处理。
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-medium text-gray-800">项目里程碑</h2>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative">
          {/* 时间线轴 */}
          <div className="absolute left-[15px] top-0 h-full w-[2px] bg-gray-200"></div>

          {/* 里程碑项目 */}
          <div className="ml-8 space-y-6">
            <div className="relative">
              {/* 时间点 */}
              <div className="absolute -left-8 mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white shadow-sm">
                <Clock className="h-3 w-3" />
              </div>

              {/* 内容 */}
              <div>
                <h3 className="text-sm font-medium text-gray-800">项目发起</h3>
                <time className="mb-1 block text-xs font-normal text-gray-500">2025年3月</time>
                <p className="text-sm text-gray-600">开源雷达项目正式启动，开始构建基础架构和数据采集系统。</p>
              </div>
            </div>

            <div className="relative">
              {/* 时间点 */}
              <div className="absolute -left-8 mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-sm">
                <Clock className="h-3 w-3" />
              </div>

              {/* 内容 */}
              <div>
                <h3 className="text-sm font-medium text-gray-800">项目MVP版本发布</h3>
                <time className="mb-1 block text-xs font-normal text-gray-500">2025年4月11日</time>
                <p className="text-sm text-gray-600">发布最小可行产品(MVP)，提供基本的项目索引和简单分析功能。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-medium text-gray-800">支持的平台</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
          Github
        </span>
        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
          Gitte
        </span>
        <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
          Gitclode
        </span>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-500">© 2023 开源雷达 (fossrader). 保留所有权利。</p>
      </div>
    </div>
  )
}
