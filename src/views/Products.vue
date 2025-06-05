<template>
  <div class="py-16">
    <div class="container mx-auto px-4">
      <!-- 产品头部 -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold mb-6">我们的产品</h1>
        <p class="text-xl text-gray-600">
          探索我们的创新产品和解决方案，为您的业务带来更多可能
        </p>
      </div>

      <!-- 产品分类标签 -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          class="px-6 py-2 rounded-full transition-colors"
          :class="selectedCategory === category ? 
            'bg-primary text-white' : 
            'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ category }}
        </button>
      </div>

      <!-- 产品列表 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold">{{ product.name }}</h3>
              <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {{ product.category }}
              </span>
            </div>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-primary">¥{{ product.price }}</span>
              <button 
                @click="showProductDetails(product)"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                了解详情
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 产品详情弹窗 -->
      <div v-if="selectedProduct" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="selectedProduct = null"
      >
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <h3 class="text-2xl font-bold">{{ selectedProduct.name }}</h3>
              <button @click="selectedProduct = null" class="text-gray-500 hover:text-gray-700">
                <div class="i-carbon-close text-2xl"></div>
              </button>
            </div>
            <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full h-64 object-cover rounded-lg mb-6">
            <div class="space-y-4">
              <p class="text-gray-600">{{ selectedProduct.description }}</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">价格</h4>
                  <p class="text-2xl font-bold text-primary">¥{{ selectedProduct.price }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">分类</h4>
                  <p>{{ selectedProduct.category }}</p>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-2">主要特点</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li v-for="(feature, index) in selectedProduct.features" 
                    :key="index"
                    class="text-gray-600"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button 
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                @click="contactUs"
              >
                联系咨询
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedProduct = ref(null)
const selectedCategory = ref('全部')

const categories = ['全部', '软件服务', '硬件产品', '解决方案']

const products = [
  {
    id: 1,
    name: '智能管理系统',
    category: '软件服务',
    price: 19999,
    description: '一站式企业管理解决方案，提升效率，降低成本。',
    image: 'https://picsum.photos/seed/product1/800/600',
    features: [
      '多平台支持',
      '实时数据分析',
      '智能决策支持',
      '安全加密保护'
    ]
  },
  {
    id: 2,
    name: '高性能服务器',
    category: '硬件产品',
    price: 29999,
    description: '企业级服务器，为您的业务提供强大的计算能力。',
    image: 'https://picsum.photos/seed/product2/800/600',
    features: [
      '高性能处理器',
      '大容量存储',
      '智能散热系统',
      '7*24小时支持'
    ]
  },
  {
    id: 3,
    name: '数字化转型方案',
    category: '解决方案',
    price: 39999,
    description: '全方位的数字化转型解决方案，助力企业升级。',
    image: 'https://picsum.photos/seed/product3/800/600',
    features: [
      '个性化定制',
      '全程技术支持',
      '培训服务',
      '持续优化'
    ]
  },
  {
    id: 4,
    name: '云存储服务',
    category: '软件服务',
    price: 9999,
    description: '安全可靠的云存储服务，随时随地访问您的数据。',
    image: 'https://picsum.photos/seed/product4/800/600',
    features: [
      '无限存储空间',
      '数据加密',
      '快速同步',
      '多设备支持'
    ]
  },
  {
    id: 5,
    name: '网络安全套件',
    category: '解决方案',
    price: 15999,
    description: '全面的网络安全防护方案，保护您的业务安全。',
    image: 'https://picsum.photos/seed/product5/800/600',
    features: [
      '实时监控',
      '威胁检测',
      '自动防护',
      '安全报告'
    ]
  },
  {
    id: 6,
    name: '智能办公设备',
    category: '硬件产品',
    price: 12999,
    description: '新一代智能办公设备，提升办公效率。',
    image: 'https://picsum.photos/seed/product6/800/600',
    features: [
      '智能识别',
      '远程控制',
      '节能环保',
      '简单易用'
    ]
  }
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === '全部') return products
  return products.filter(product => product.category === selectedCategory.value)
})

const showProductDetails = (product) => {
  selectedProduct.value = product
}

const contactUs = () => {
  selectedProduct.value = null
  router.push('/contact')
}
</script> 