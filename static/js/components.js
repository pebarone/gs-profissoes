// UI Components Module
// Reusable component functions for creating UI elements

const Components = {
    // ========================================
    // TOAST NOTIFICATIONS
    // ========================================
    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // ========================================
    // MODAL
    // ========================================
    createModal(title, content, footer = null) {
        const container = document.getElementById('modal-container');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">${content}</div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close on ESC key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        container.innerHTML = '';
        container.appendChild(modal);
        
        return modal;
    },

    closeModal() {
        const container = document.getElementById('modal-container');
        container.innerHTML = '';
    },

    // ========================================
    // LOADING OVERLAY
    // ========================================
    showLoading() {
        document.getElementById('loading-overlay').classList.add('active');
    },

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    },

    // ========================================
    // USUARIO CARD
    // ========================================
    createUsuarioCard(usuario) {
        return `
            <div class="card" data-id="${usuario.id}">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${this.escapeHtml(usuario.nome)}</h3>
                        <p class="card-subtitle">ID: ${usuario.id}</p>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn edit" data-action="edit-usuario" data-id="${usuario.id}" title="Editar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="card-btn delete" data-action="delete-usuario" data-id="${usuario.id}" title="Deletar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-field">
                        <div class="card-label">Email</div>
                        <div class="card-value">${this.escapeHtml(usuario.email)}</div>
                    </div>
                    ${usuario.cpf ? `
                        <div class="card-field">
                            <div class="card-label">CPF</div>
                            <div class="card-value">${this.formatCpf(usuario.cpf)}</div>
                        </div>
                    ` : ''}
                    ${usuario.telefone ? `
                        <div class="card-field">
                            <div class="card-label">Telefone</div>
                            <div class="card-value">${this.formatTelefone(usuario.telefone)}</div>
                        </div>
                    ` : ''}
                    ${usuario.dataNascimento ? `
                        <div class="card-field">
                            <div class="card-label">Data de Nascimento</div>
                            <div class="card-value">${this.formatDate(usuario.dataNascimento)}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // ========================================
    // TRILHA CARD
    // ========================================
    createTrilhaCard(trilha) {
        return `
            <div class="card" data-id="${trilha.id}">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${this.escapeHtml(trilha.nome)}</h3>
                        <p class="card-subtitle">ID: ${trilha.id}</p>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn edit" data-action="edit-trilha" data-id="${trilha.id}" title="Editar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="card-btn delete" data-action="delete-trilha" data-id="${trilha.id}" title="Deletar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-field">
                        <div class="card-label">Descrição</div>
                        <div class="card-value">${this.escapeHtml(trilha.descricao)}</div>
                    </div>
                    ${trilha.nivel ? `
                        <div class="card-field">
                            <div class="card-label">Nível</div>
                            <div class="card-value">${this.escapeHtml(trilha.nivel)}</div>
                        </div>
                    ` : ''}
                    ${trilha.cargaHoraria ? `
                        <div class="card-field">
                            <div class="card-label">Carga Horária</div>
                            <div class="card-value">${trilha.cargaHoraria}h</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // ========================================
    // FORMS
    // ========================================
    createUsuarioForm(usuario = null) {
        const isEdit = usuario !== null;
        
        return `
            <form id="usuario-form">
                <div class="form-group">
                    <label class="form-label required" for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" class="form-input" 
                           value="${isEdit ? this.escapeHtml(usuario.nome) : ''}" 
                           required maxlength="100">
                    <div class="form-error" id="nome-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-input" 
                           value="${isEdit ? this.escapeHtml(usuario.email) : ''}" 
                           required maxlength="100">
                    <div class="form-error" id="email-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="cpf">CPF</label>
                    <input type="text" id="cpf" name="cpf" class="form-input" 
                           value="${isEdit && usuario.cpf ? usuario.cpf : ''}" 
                           placeholder="000.000.000-00" maxlength="14">
                    <div class="form-error" id="cpf-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="telefone">Telefone</label>
                    <input type="text" id="telefone" name="telefone" class="form-input" 
                           value="${isEdit && usuario.telefone ? usuario.telefone : ''}" 
                           placeholder="(00) 00000-0000" maxlength="15">
                    <div class="form-error" id="telefone-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="dataNascimento">Data de Nascimento</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" class="form-input" 
                           value="${isEdit && usuario.dataNascimento ? usuario.dataNascimento.split('T')[0] : ''}">
                    <div class="form-error" id="dataNascimento-error"></div>
                </div>
            </form>
        `;
    },

    createTrilhaForm(trilha = null) {
        const isEdit = trilha !== null;
        
        return `
            <form id="trilha-form">
                <div class="form-group">
                    <label class="form-label required" for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" class="form-input" 
                           value="${isEdit ? this.escapeHtml(trilha.nome) : ''}" 
                           required maxlength="100">
                    <div class="form-error" id="nome-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="descricao">Descrição</label>
                    <textarea id="descricao" name="descricao" class="form-textarea" 
                              required maxlength="500">${isEdit ? this.escapeHtml(trilha.descricao) : ''}</textarea>
                    <div class="form-error" id="descricao-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="nivel">Nível</label>
                    <select id="nivel" name="nivel" class="form-select">
                        <option value="">Selecione...</option>
                        <option value="INICIANTE" ${isEdit && trilha.nivel === 'Iniciante' ? 'selected' : ''}>Iniciante</option>
                        <option value="INTERMEDIARIO" ${isEdit && trilha.nivel === 'Intermediário' ? 'selected' : ''}>Intermediário</option>
                        <option value="AVANCADO" ${isEdit && trilha.nivel === 'Avançado' ? 'selected' : ''}>Avançado</option>
                    </select>
                    <div class="form-error" id="nivel-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="cargaHoraria">Carga Horária (horas)</label>
                    <input type="number" id="cargaHoraria" name="cargaHoraria" class="form-input" 
                           value="${isEdit && trilha.cargaHoraria ? trilha.cargaHoraria : ''}" 
                           min="1" max="10000" step="1">
                    <div class="form-error" id="cargaHoraria-error"></div>
                </div>
            </form>
        `;
    },

    // ========================================
    // EMPTY STATE
    // ========================================
    createEmptyState(title, description, actionText = null, actionCallback = null) {
        return `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-description">${description}</p>
                ${actionText ? `<button class="btn btn-primary" onclick="${actionCallback}">${actionText}</button>` : ''}
            </div>
        `;
    },

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatCpf(cpf) {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },

    formatTelefone(telefone) {
        if (!telefone) return '';
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    },

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    },

    // Form validation
    validateForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.name}-error`);
            
            if (!input.value.trim()) {
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Este campo é obrigatório';
                }
                isValid = false;
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });

        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorElement = document.getElementById(`${emailInput.name}-error`);
            
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Email inválido';
                }
                isValid = false;
            }
        }

        return isValid;
    },

    // Get form data
    getFormData(formId) {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (value.trim()) {
                data[key] = value.trim();
            }
        }

        return data;
    },

    // Display API errors on form
    displayFormErrors(errors) {
        Object.keys(errors).forEach(fieldName => {
            const field = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
            const errorElement = document.getElementById(`${field}-error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                inputElement.classList.add('error');
                errorElement.textContent = errors[fieldName].join(', ');
            }
        });
    },

    // Mask inputs
    maskCpf(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        input.value = value;
    },

    maskTelefone(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        input.value = value;
    }
};
