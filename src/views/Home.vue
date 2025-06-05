<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] overflow-hidden">
      <!-- 背景图片 -->
      <div class="absolute inset-0">
        <img src="https://picsum.photos/seed/hero/1920/600" alt="背景" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div class="relative container mx-auto px-4 h-full flex items-center">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            专业的建筑工程服务
          </h1>
          <p class="text-xl text-white/90 mb-8">
            以专业的技术和优质的服务，为客户提供全方位的建筑工程解决方案
          </p>
          <div class="flex gap-4">
            <router-link 
              to="/contact" 
              class="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              立即咨询
            </router-link>
            <router-link 
              to="/products" 
              class="bg-white text-primary px-8 py-4 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              了解更多
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心业务 -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">核心业务领域</h2>
          <p class="text-gray-600">专注建筑工程领域，提供专业的一站式服务</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(service, index) in services" 
            :key="index"
            class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300"
          >
            <img :src="service.image" :alt="service.title" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-bold mb-3">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 工程案例 -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">精品工程案例</h2>
          <p class="text-gray-600">累计完成数百个工程项目，获得客户一致好评</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, index) in projects" 
            :key="index"
            class="group relative overflow-hidden rounded-lg"
          >
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div>
                <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
                <p class="text-white/80">{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司优势 -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">为什么选择我们</h2>
          <p class="text-gray-600">专业团队，优质服务，值得信赖</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(advantage, index) in advantages" 
            :key="index"
            class="bg-white p-8 rounded-lg shadow-md"
          >
            <div class="text-4xl text-primary mb-4" :class="advantage.icon"></div>
            <h3 class="text-xl font-bold mb-4">{{ advantage.title }}</h3>
            <p class="text-gray-600">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">开启您的建筑工程项目</h2>
        <p class="text-xl mb-8">
          专业的团队随时为您提供咨询服务，助力您的项目成功
        </p>
        <router-link 
          to="/contact" 
          class="bg-white text-primary px-8 py-4 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors inline-block"
        >
          免费咨询
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  {
    title: '工程施工',
    description: '提供专业的建筑工程施工服务，确保工程质量和进度',
    image: 'https://picsum.photos/seed/service1/200/200'
  },
  {
    title: '工程设计',
    description: '专业的设计团队，为您提供完整的工程设计解决方案',
    image: 'https://picsum.photos/seed/service2/200/200'
  },
  {
    title: '工程监理',
    description: '全程监督管理，确保工程质量符合标准要求',
    image: 'https://picsum.photos/seed/service3/200/200'
  },
  {
    title: '工程咨询',
    description: '提供专业的工程咨询服务，解决项目难题',
    image: 'https://picsum.photos/seed/service4/200/200'
  }
]

const projects = [
  {
    title: '城市综合体项目',
    description: '占地面积50000平方米，包含商业、办公、住宅等多种业态',
    image: 'https://picsum.photos/seed/project1/800/600'
  },
  {
    title: '高端住宅项目',
    description: '精品住宅小区，打造舒适宜居的生活环境',
    image: 'https://picsum.photos/seed/project2/800/600'
  },
  {
    title: '商业广场项目',
    description: '现代化商业综合体，引领城市商业新格局',
    image: 'https://picsum.photos/seed/project3/800/600'
  }
]

const advantages = [
  {
    icon: 'i-carbon-certificate',
    title: '专业资质',
    description: '拥有建筑工程施工总承包一级资质，技术力量雄厚'
  },
  {
    icon: 'i-carbon-user-expert',
    title: '专业团队',
    description: '百人专业团队，平均从业经验超过10年'
  },
  {
    icon: 'i-carbon-medal',
    title: '优质服务',
    description: '24小时响应机制，提供全方位的优质服务'
  }
]
</script> 