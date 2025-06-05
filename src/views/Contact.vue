<template>
  <div class="py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold mb-6">联系我们</h1>
        <p class="text-xl text-gray-600">
          我们期待听到您的声音，随时为您提供帮助和支持
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- 联系信息 -->
        <div class="space-y-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6">联系方式</h2>
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="text-primary text-2xl">
                  <div class="i-carbon-location"></div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">地址</h3>
                  <p class="text-gray-600">北京市朝阳区科技园区888号</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="text-primary text-2xl">
                  <div class="i-carbon-phone"></div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">电话</h3>
                  <p class="text-gray-600">+86 10 8888 8888</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="text-primary text-2xl">
                  <div class="i-carbon-email"></div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">邮箱</h3>
                  <p class="text-gray-600">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6">营业时间</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">周一至周五</span>
                <span class="font-semibold">9:00 - 18:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">周六</span>
                <span class="font-semibold">10:00 - 16:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">周日</span>
                <span class="font-semibold">休息</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系表单 -->
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-6">发送消息</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-gray-700 mb-2" for="name">姓名</label>
              <input 
                id="name"
                v-model="form.name"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{'border-red-500': errors.name}"
                placeholder="请输入您的姓名"
              >
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-gray-700 mb-2" for="email">邮箱</label>
              <input 
                id="email"
                v-model="form.email"
                type="email"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{'border-red-500': errors.email}"
                placeholder="请输入您的邮箱"
              >
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-gray-700 mb-2" for="phone">电话</label>
              <input 
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{'border-red-500': errors.phone}"
                placeholder="请输入您的电话"
              >
              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
            </div>

            <div>
              <label class="block text-gray-700 mb-2" for="message">消息内容</label>
              <textarea 
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{'border-red-500': errors.message}"
                placeholder="请输入您的消息"
              ></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
            </div>

            <button 
              type="submit"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">发送中...</span>
              <span v-else>发送消息</span>
            </button>
          </form>
        </div>
      </div>

      <!-- 地图 -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6">我们的位置</h2>
        <div class="h-96 bg-gray-200 rounded-lg">
          <!-- 这里可以集成实际的地图组件 -->
          <div class="w-full h-full flex items-center justify-center text-gray-500">
            地图区域
          </div>
        </div>
      </div>
    </div>

    <!-- 成功提示弹窗 -->
    <div v-if="showSuccess" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showSuccess = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <div class="text-center">
          <div class="text-green-500 text-5xl mb-4">
            <div class="i-carbon-checkmark-filled"></div>
          </div>
          <h3 class="text-xl font-bold mb-2">提交成功</h3>
          <p class="text-gray-600 mb-4">
            感谢您的留言，我们会尽快与您联系！
          </p>
          <button 
            @click="showSuccess = false"
            class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
  let isValid = true
  
  // 重置错误
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.name.trim()) {
    errors.name = '请输入姓名'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = '请输入邮箱'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = '请输入电话'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    errors.phone = '请输入有效的手机号码'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = '请输入消息内容'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 重置表单
    Object.keys(form).forEach(key => form[key] = '')
    showSuccess.value = true
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script> 