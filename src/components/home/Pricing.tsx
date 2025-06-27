export function Pricing() {
  const plans = [
    {
      name: '免费版',
      price: '0',
      currency: '¥',
      period: '月',
      description: '适合个人用户和小型项目',
      features: [
        '每月 3 个视频',
        '最长 30 秒',
        '720p 分辨率',
        '基础风格',
        '社区支持'
      ],
      limitations: [
        '无高级风格',
        '无批量生成',
        '无优先处理'
      ],
      popular: false,
      cta: '免费开始',
      ctaVariant: 'outline' as const
    },
    {
      name: '基础版',
      price: '99',
      currency: '¥',
      period: '月',
      description: '适合内容创作者和博主',
      features: [
        '每月 20 个视频',
        '最长 2 分钟',
        '1080p 分辨率',
        '所有风格',
        '优先处理',
        '邮件支持'
      ],
      limitations: [
        '无批量生成',
        '无自定义风格'
      ],
      popular: true,
      cta: '开始使用',
      ctaVariant: 'primary' as const
    },
    {
      name: '专业版',
      price: '299',
      currency: '¥',
      period: '月',
      description: '适合专业创作者和团队',
      features: [
        '每月 100 个视频',
        '最长 5 分钟',
        '4K 分辨率',
        '所有风格',
        '优先处理',
        '批量生成',
        '自定义风格',
        '优先支持'
      ],
      limitations: [
        '无 API 访问',
        '无专属支持'
      ],
      popular: false,
      cta: '开始使用',
      ctaVariant: 'primary' as const
    },
    {
      name: '企业版',
      price: '999',
      currency: '¥',
      period: '月',
      description: '适合大型企业和机构',
      features: [
        '无限视频生成',
        '最长 10 分钟',
        '4K 分辨率',
        '所有风格',
        '最高优先级',
        '批量生成',
        '自定义风格',
        'API 访问',
        '专属支持',
        '定制开发'
      ],
      limitations: [],
      popular: false,
      cta: '联系我们',
      ctaVariant: 'primary' as const
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            选择适合您的方案
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们提供灵活的定价方案，满足不同用户的需求。
            所有方案都包含核心功能，您可以根据使用量选择合适的套餐。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.currency}{plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.ctaVariant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">包含功能：</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-6">限制：</h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-center text-sm text-gray-500">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            有疑问？查看我们的
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            常见问题解答
          </button>
        </div>
      </div>
    </section>
  );
} 