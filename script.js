class Chatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.quickPrompts = document.getElementById('quickPrompts');
        
        this.responses = {
            saudacao: [
                "Olá! Como posso ajudar você hoje?",
                "Oi! Em que posso ser útil?",
                "Olá! Estou aqui para ajudar!"
            ],
            horarios: [
                "Nossos horários de funcionamento são:\n• Segunda a Sexta: 8h às 18h\n• Sábado: 8h às 12h\n• Domingo: Fechado"
            ],
            contato: [
                "Você pode entrar em contato conosco:\n• Telefone: (11) 1234-5678\n• Email: contato@empresa.com\n• WhatsApp: (11) 98765-4321"
            ],
            servicos: [
                "Oferecemos os seguintes serviços:\n• Consultoria especializada\n• Suporte técnico\n• Desenvolvimento de soluções\n• Treinamentos personalizados"
            ],
            localizacao: [
                "Estamos localizados em:\nRua das Flores, 123\nCentro - São Paulo/SP\nCEP: 01234-567"
            ],
            suporte: [
                "Para suporte técnico:\n• Abra um chamado pelo email: suporte@empresa.com\n• Ligue para: (11) 1234-5678\n• Horário de atendimento: 8h às 17h"
            ],
            precos: [
                "Para informações sobre preços e orçamentos, entre em contato conosco:\n• Email: vendas@empresa.com\n• Telefone: (11) 1234-5678\n• Teremos prazer em elaborar uma proposta personalizada!"
            ],
            default: [
                "Desculpe, não entendi sua pergunta. Pode reformular?",
                "Não tenho certeza sobre isso. Pode ser mais específico?",
                "Hmm, não compreendi. Tente usar uma das opções sugeridas ou reformule sua pergunta."
            ]
        };
        
        this.init();
    }
    
    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.quickPrompts.addEventListener('click', (e) => {
            if (e.target.classList.contains('prompt-btn')) {
                const prompt = e.target.getAttribute('data-prompt');
                this.sendMessage(prompt);
            }
        });
    }
    
    sendMessage(text = null) {
        const message = text || this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        content.appendChild(paragraph);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (this.containsWords(lowerMessage, ['oi', 'olá', 'hello', 'ola', 'bom dia', 'boa tarde', 'boa noite'])) {
            return this.getRandomResponse('saudacao');
        }
        
        if (this.containsWords(lowerMessage, ['horário', 'horarios', 'funcionamento', 'aberto', 'fecha', 'abre'])) {
            return this.getRandomResponse('horarios');
        }
        
        if (this.containsWords(lowerMessage, ['contato', 'telefone', 'email', 'whatsapp', 'falar'])) {
            return this.getRandomResponse('contato');
        }
        
        if (this.containsWords(lowerMessage, ['serviços', 'servicos', 'oferece', 'faz', 'trabalha'])) {
            return this.getRandomResponse('servicos');
        }
        
        if (this.containsWords(lowerMessage, ['onde', 'localização', 'localizacao', 'endereço', 'endereco', 'fica'])) {
            return this.getRandomResponse('localizacao');
        }
        
        if (this.containsWords(lowerMessage, ['suporte', 'ajuda', 'problema', 'erro', 'bug', 'técnico'])) {
            return this.getRandomResponse('suporte');
        }
        
        if (this.containsWords(lowerMessage, ['preço', 'preco', 'valor', 'custa', 'orçamento', 'orcamento'])) {
            return this.getRandomResponse('precos');
        }
        
        return this.getRandomResponse('default');
    }
    
    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            content.appendChild(dot);
        }
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
