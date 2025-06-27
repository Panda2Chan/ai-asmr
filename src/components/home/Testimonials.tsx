export function Testimonials() {
  const testimonials = [
    {
      name: '张小明',
      role: '内容创作者',
      avatar: '/avatars/user1.jpg',
      content: 'AI AMSR 让我的视频创作变得非常简单。几分钟就能生成高质量的 ASMR 内容，我的观众反馈非常好！',
      rating: 5
    },
    {
      name: '李小红',
      role: '冥想导师',
      avatar: '/avatars/user2.jpg',
      content: '作为一名冥想导师，我需要大量的放松背景音。这个平台完美满足了我的需求，音效质量非常高。',
      rating: 5
    },
    {
      name: '王大力',
      role: 'YouTuber',
      avatar: '/avatars/user3.jpg',
      content: '批量生成功能太棒了！我可以一次性创建多个视频，大大提高了我的工作效率。强烈推荐！',
      rating: 5
    },
    {
      name: '陈美丽',
      role: '睡眠博主',
      avatar: '/avatars/user4.jpg',
      content: '我的睡眠频道因为使用了 AI AMSR 的视频而获得了更多关注。视频质量专业，音效非常治愈。',
      rating: 5
    },
    {
      name: '刘志强',
      role: '企业培训师',
      avatar: '/avatars/user5.jpg',
      content: '我们公司用这个平台为员工制作放松视频，效果很好。API 集成也很方便，技术团队很满意。',
      rating: 5
    },
    {
      name: '赵雅琪',
      role: '个人用户',
      avatar: '/avatars/user6.jpg',
      content: '免费版本就很好用了！界面简洁，操作简单，生成的视频质量超出预期。会继续使用！',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            用户怎么说
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            来自全球各地用户的真实反馈，了解他们如何使用 AI AMSR 提升创作效率
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">用户评分</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">满意度</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">活跃用户</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">生成视频</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              加入我们的用户社区
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              立即开始使用 AI AMSR，体验 AI 驱动的视频生成技术。
              加入数千名满意的用户，提升您的创作效率。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                免费开始使用
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                查看演示
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 