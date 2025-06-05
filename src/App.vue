<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '公司介绍', path: '/about' },
  { name: '产品介绍', path: '/products' },
  { name: '联系方式', path: '/contact' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-2xl font-bold text-primary">
            Logo
          </router-link>
          <div class="hidden md:flex space-x-8">
            <router-link v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="text-gray-600 hover:text-primary transition-colors"
              active-class="text-primary font-medium">
              {{ item.name }}
            </router-link>
          </div>
          <!-- 移动端菜单按钮 -->
          <button class="md:hidden" @click="isMenuOpen = !isMenuOpen">
            <div class="i-carbon-menu text-2xl"></div>
          </button>
        </div>
      </div>
      <!-- 移动端菜单 -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
            active-class="text-primary font-medium"
            @click="isMenuOpen = false">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="bg-dark text-white mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">关于我们</h3>
            <p class="text-gray-300">
              我们致力于为客户提供最优质的服务和产品。
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">联系方式</h3>
            <p class="text-gray-300">
              电话：123-456-7890<br>
              邮箱：info@example.com
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">
                <div class="i-carbon-logo-facebook text-2xl"></div>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <div class="i-carbon-logo-twitter text-2xl"></div>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <div class="i-carbon-logo-instagram text-2xl"></div>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-300">
          <p>&copy; 2024 公司名称. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
