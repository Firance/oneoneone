// 网页内容提取器
class ContentExtractor {
    constructor() {
        this.content = {
            skills: [],
            contact: {},
            about: '',
            projects: []
        };
    }

    extractContent() {
        // 提取技能信息
        const skillElements = document.querySelectorAll('.skill-item');
        this.content.skills = Array.from(skillElements).map(skill => ({
            name: skill.querySelector('.skill-name')?.textContent || '',
            level: skill.querySelector('.skill-level')?.textContent || ''
        }));

        // 提取联系方式
        const wechatInfo = document.querySelector('#wechatModal .wechat-info')?.textContent || '';
        const emailInfo = document.querySelector('#emailModal .wechat-info')?.textContent || '';
        this.content.contact = {
            wechat: wechatInfo,
            email: emailInfo
        };

        // 提取关于信息
        const aboutSection = document.querySelector('.about-content');
        this.content.about = aboutSection?.textContent || '';

        // 提取项目信息
        const projectElements = document.querySelectorAll('.project-item');
        this.content.projects = Array.from(projectElements).map(project => ({
            title: project.querySelector('.project-title')?.textContent || '',
            description: project.querySelector('.project-description')?.textContent || ''
        }));

        return this.content;
    }
}

// 知识库管理器
class KnowledgeBase {
    constructor() {
        this.content = null;
        this.systemPrompt = '';
    }

    updateContent(content) {
        this.content = content;
        this.generateSystemPrompt();
    }

    generateSystemPrompt() {
        if (!this.content) return '';

        let prompt = '你是一个专业的网站助手，可以帮助用户了解网站内容和站主信息。以下是网站的关键信息：\n\n';

        // 添加技能信息
        if (this.content.skills.length > 0) {
            prompt += '站主的专业技能：\n';
            this.content.skills.forEach(skill => {
                prompt += `- ${skill.name}: ${skill.level}\n`;
            });
            prompt += '\n';
        }

        // 添加联系方式
        if (this.content.contact.wechat || this.content.contact.email) {
            prompt += '联系方式：\n';
            if (this.content.contact.wechat) {
                prompt += `- 微信: ${this.content.contact.wechat}\n`;
            }
            if (this.content.contact.email) {
                prompt += `- 邮箱: ${this.content.contact.email}\n`;
            }
            prompt += '\n';
        }

        // 添加关于信息
        if (this.content.about) {
            prompt += `关于站主：\n${this.content.about}\n\n`;
        }

        // 添加项目信息
        if (this.content.projects.length > 0) {
            prompt += '项目经验：\n';
            this.content.projects.forEach(project => {
                prompt += `- ${project.title}: ${project.description}\n`;
            });
        }

        prompt += '\n请基于以上信息，专业、友好地回答用户的问题。如果问题超出这些信息的范围，请诚实地表示无法回答。';
        
        this.systemPrompt = prompt;
        return prompt;
    }
}

class Chatbot {
    constructor() {
        this.messages = [];
        this.isOpen = false;
        this.contentExtractor = new ContentExtractor();
        this.knowledgeBase = new KnowledgeBase();
        this.initElements();
        this.bindEvents();
        this.initializeKnowledgeBase();
        this.welcomeMessage();
    }

    initializeKnowledgeBase() {
        const content = this.contentExtractor.extractContent();
        this.knowledgeBase.updateContent(content);
    }

    initElements() {
        this.chatbotToggle = document.querySelector('.chatbot-toggle');
        this.chatbotWindow = document.querySelector('.chatbot-window');
        this.closeButton = document.querySelector('.close-chat');
        this.messagesContainer = document.querySelector('.chatbot-messages');
        this.input = document.querySelector('.chatbot-input input');
        this.sendButton = document.querySelector('.send-message');
    }

    bindEvents() {
        this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatbotWindow.classList.toggle('active', this.isOpen);
    }

    closeChat() {
        this.isOpen = false;
        this.chatbotWindow.classList.remove('active');
    }

    welcomeMessage() {
        const welcomeMessages = [
            "你好！我是你的AI助手，有什么我可以帮你的吗？",
            "我可以回答关于这个网站的问题，",
            "也可以帮你了解更多关于站主的信息。"
        ];
        
        let delay = 0;
        welcomeMessages.forEach(msg => {
            setTimeout(() => this.addMessage(msg, 'bot'), delay);
            delay += 500;
        });
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        // 清空输入框
        this.input.value = '';

        // 添加用户消息
        this.addMessage(text, 'user');

        // 添加消息到历史记录
        this.messages.push({
            role: 'user',
            content: text
        });

        // 显示思考状态
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message bot-message thinking';
        thinkingDiv.textContent = '思考中...';
        this.messagesContainer.appendChild(thinkingDiv);

        try {
            // 调用通义千问API
            const response = await this.callQwenAPI(text);
            
            // 移除思考状态
            this.messagesContainer.removeChild(thinkingDiv);
            
            // 添加AI回复
            this.addMessage(response, 'bot');
            
            // 添加消息到历史记录
            this.messages.push({
                role: 'assistant',
                content: response
            });
        } catch (error) {
            // 移除思考状态
            this.messagesContainer.removeChild(thinkingDiv);
            
            // 显示错误消息
            this.addMessage('抱歉，我遇到了一些问题，请稍后再试。', 'bot');
            console.error('API调用错误:', error);
        }
    }

    async callQwenAPI(text) {
        const API_KEY = 'sk-de622bd6f1034fb9a61e64a031f7de46';
        const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

        // 构建完整的消息历史，包含系统提示
        const fullMessages = [
            {
                role: 'system',
                content: this.knowledgeBase.systemPrompt
            },
            ...this.messages
        ];

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: 'qwen-plus',
                    messages: fullMessages,
                    temperature: 0.7,
                    top_p: 0.8,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用错误:', error);
            throw error;
        }
    }
}

// 初始化聊天机器人
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 