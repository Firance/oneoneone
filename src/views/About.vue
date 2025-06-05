<template>
  <div class="py-16">
    <div class="container mx-auto px-4">
      <!-- 公司简介 -->
      <section class="mb-20">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h1 class="text-4xl font-bold mb-6">公司简介</h1>
          <p class="text-xl text-gray-600">
            二十年专注建筑工程领域，打造精品工程
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/about/800/600" alt="公司简介" class="rounded-lg shadow-lg">
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-4">专注建筑工程二十载</h2>
            <p class="text-gray-600 mb-6">
              公司成立于2000年，是一家专业从事建筑工程施工、设计、监理的综合性企业。二十年来，
              我们始终坚持"质量第一、诚信为本"的经营理念，以专业的技术和优质的服务，
              赢得了广大客户的信赖与支持。
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">20+</div>
                <div class="text-gray-600">年行业经验</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">500+</div>
                <div class="text-gray-600">成功项目</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-12">发展历程</h2>
        <div class="relative">
          <!-- 时间线 -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          
          <div class="space-y-16">
            <div v-for="(milestone, index) in milestones" 
              :key="index"
              class="relative"
              :class="index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'"
            >
              <div class="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <div class="text-2xl font-bold text-primary mb-2">{{ milestone.year }}</div>
                <h3 class="text-xl font-bold mb-2">{{ milestone.title }}</h3>
                <p class="text-gray-600">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section class="mb-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">企业文化</h2>
          <p class="text-gray-600">以人为本，追求卓越，共创价值</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(culture, index) in cultures" 
            :key="index"
            class="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <div class="text-4xl text-primary mb-4" :class="culture.icon"></div>
            <h3 class="text-xl font-bold mb-3">{{ culture.title }}</h3>
            <p class="text-gray-600">{{ culture.description }}</p>
          </div>
        </div>
      </section>

      <!-- 资质荣誉 -->
      <section>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">资质荣誉</h2>
          <p class="text-gray-600">专业实力的见证</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(certificate, index) in certificates" 
            :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img :src="certificate.image" :alt="certificate.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ certificate.title }}</h3>
              <p class="text-gray-600">{{ certificate.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const milestones = [
  {
    year: '2000',
    title: '公司成立',
    description: '公司正式成立，开启建筑工程服务之路'
  },
  {
    year: '2005',
    title: '资质升级',
    description: '获得建筑工程施工总承包一级资质'
  },
  {
    year: '2010',
    title: '业务扩展',
    description: '成功拓展设计、监理等综合业务'
  },
  {
    year: '2015',
    title: '技术创新',
    description: '成立技术研发中心，推动行业创新'
  },
  {
    year: '2020',
    title: '品牌升级',
    description: '完成品牌升级，进一步提升市场竞争力'
  }
]

const cultures = [
  {
    icon: 'i-carbon-idea',
    title: '创新',
    description: '持续创新，引领行业发展'
  },
  {
    icon: 'i-carbon-collaboration',
    title: '协作',
    description: '团结协作，共创价值'
  },
  {
    icon: 'i-carbon-trust',
    title: '诚信',
    description: '诚信为本，信守承诺'
  },
  {
    icon: 'i-carbon-growth',
    title: '发展',
    description: '追求卓越，持续发展'
  }
]

const certificates = [
  {
    title: '建筑工程施工总承包一级资质',
    description: '国家住建部颁发的最高级别施工资质',
    image: 'https://picsum.photos/seed/cert1/800/600'
  },
  {
    title: '工程设计甲级资质',
    description: '具备承接各类建筑工程设计的资格',
    image: 'https://picsum.photos/seed/cert2/800/600'
  },
  {
    title: '质量管理体系认证',
    description: 'ISO9001质量管理体系认证',
    image: 'https://picsum.photos/seed/cert3/800/600'
  }
]
</script> 