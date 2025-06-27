export function Features() {
  const features = [
    {
      icon: '🎬',
      title: 'AI 视频生成',
      description: '基于 VEO3 AI 技术，智能生成高质量的 ASMR 视频内容',
      details: [
        '多种视频风格选择',
        '自定义时长和参数',
        '批量生成功能',
        '实时预览效果'
      ]
    },
    {
      icon: '🎵',
      title: '丰富音效库',
      description: '内置多种自然音效，包括雨声、海浪、森林等',
      details: [
        '自然音效库',
        '自定义音效混合',
        '音效强度调节',
        '背景音乐支持'
      ]
    },
    {
      icon: '⚡',
      title: '快速处理',
      description: '优化的处理流程，几分钟内即可生成完整视频',
      details: [
        '并行处理技术',
        '智能队列管理',
        '进度实时显示',
        '自动质量优化'
      ]
    },
    {
      icon: '🎨',
      title: '自定义风格',
      description: '支持自定义视频风格、色彩和视觉效果',
      details: [
        '多种视觉风格',
        '色彩主题定制',
        '特效滤镜',
        '分辨率选择'
      ]
    },
    {
      icon: '📱',
      title: '多平台支持',
      description: '支持多种设备和平台，随时随地创作',
      details: [
        '响应式设计',
        '移动端优化',
        '跨平台兼容',
        '离线预览'
      ]
    },
    {
      icon: '🔒',
      title: '安全可靠',
      description: '企业级安全保护，确保您的数据安全',
      details: [
        '数据加密存储',
        '隐私保护',
        '安全传输',
        '定期备份'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            强大的功能特性
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们提供全面的 ASMR 视频生成解决方案，让您的创作更加简单高效
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              准备开始您的创作之旅？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              立即注册免费账户，体验 AI 驱动的 ASMR 视频生成功能。
              无需信用卡，即可享受每月 3 个免费视频生成额度。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                免费开始使用
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 