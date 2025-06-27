export function FAQ() {
  const faqs = [
    {
      question: '什么是 AI AMSR？',
      answer: 'AI AMSR 是一个基于 VEO3 AI 技术的 ASMR 视频生成平台。它可以帮助用户快速创建高质量的放松视频内容，支持多种自然音效和视觉风格。'
    },
    {
      question: '如何开始使用？',
      answer: '注册免费账户即可开始使用。免费版本每月提供 3 个视频生成额度，您可以体验所有核心功能。升级到付费版本可以获得更多额度和高级功能。'
    },
    {
      question: '支持哪些视频风格？',
      answer: '我们支持多种 ASMR 风格，包括雨声、海浪、森林、火焰、白噪音、冥想、睡眠、放松等。您还可以自定义音效混合和视觉风格。'
    },
    {
      question: '视频生成需要多长时间？',
      answer: '视频生成时间取决于视频长度和复杂度。通常 30 秒的视频需要 2-3 分钟，1 分钟的视频需要 5-8 分钟。我们会实时显示生成进度。'
    },
    {
      question: '可以下载生成的视频吗？',
      answer: '是的，所有生成的视频都可以下载。我们支持多种格式和分辨率，包括 MP4、720p、1080p 和 4K。'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            常见问题
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            找不到您需要的答案？我们的支持团队随时为您提供帮助
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              还有其他问题？
            </h3>
            <p className="text-gray-600 mb-6">
              我们的支持团队很乐意为您提供帮助。
              您可以通过以下方式联系我们：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">📧</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">邮件支持</div>
                <div className="text-sm text-gray-600">support@ai-amsr.com</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">💬</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">在线聊天</div>
                <div className="text-sm text-gray-600">24/7 在线支持</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">📚</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">帮助文档</div>
                <div className="text-sm text-gray-600">详细使用指南</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 