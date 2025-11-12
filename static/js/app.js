// Main Application Module
// Handles routing, state management, and application logic

class App {
    constructor() {
        this.currentPage = 'home';
        this.usuarios = [];
        this.trilhas = [];
        this.filteredUsuarios = [];
        this.filteredTrilhas = [];
        
        this.init();
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    async init() {
        this.setupEventListeners();
        this.setupRouting();
        this.setupMasks();
        
        // Load initial data
        await this.loadData();
        
        // Navigate to initial page
        const hash = window.location.hash.slice(1) || 'home';
        this.navigateTo(hash);
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.getAttribute('data-page');
                this.navigateTo(page);
            });
        });

        // Hero actions
        document.querySelectorAll('[data-action="goto-usuarios"]').forEach(btn => {
            btn.addEventListener('click', () => this.navigateTo('usuarios'));
        });

        document.querySelectorAll('[data-action="goto-trilhas"]').forEach(btn => {
            btn.addEventListener('click', () => this.navigateTo('trilhas'));
        });

        // Search
        const searchUsuarios = document.getElementById('search-usuarios');
        if (searchUsuarios) {
            searchUsuarios.addEventListener('input', (e) => {
                this.filterUsuarios(e.target.value);
            });
        }

        const searchTrilhas = document.getElementById('search-trilhas');
        if (searchTrilhas) {
            searchTrilhas.addEventListener('input', (e) => {
                this.filterTrilhas(e.target.value);
            });
        }

        // Delegate events for dynamically created elements
        document.addEventListener('click', async (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.getAttribute('data-action');
            const id = target.getAttribute('data-id');

            switch (action) {
                case 'new-usuario':
                    this.showNewUsuarioModal();
                    break;
                case 'edit-usuario':
                    this.showEditUsuarioModal(id);
                    break;
                case 'delete-usuario':
                    this.deleteUsuario(id);
                    break;
                case 'new-trilha':
                    this.showNewTrilhaModal();
                    break;
                case 'edit-trilha':
                    this.showEditTrilhaModal(id);
                    break;
                case 'delete-trilha':
                    this.deleteTrilha(id);
                    break;
            }
        });
    }

    // ========================================
    // ROUTING
    // ========================================
    setupRouting() {
        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1) || 'home';
            this.navigateTo(page, false);
        });
    }

    navigateTo(page, updateHash = true) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Update active page
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            if (updateHash) {
                window.location.hash = page;
            }

            // Load page-specific data
            if (page === 'usuarios') {
                this.renderUsuarios();
            } else if (page === 'trilhas') {
                this.renderTrilhas();
            }
        }
    }

    // ========================================
    // DATA LOADING
    // ========================================
    async loadData() {
        try {
            Components.showLoading();
            
            // Load both datasets in parallel
            const [usuarios, trilhas] = await Promise.all([
                api.getUsuarios(),
                api.getTrilhas()
            ]);

            this.usuarios = usuarios || [];
            this.trilhas = trilhas || [];
            this.filteredUsuarios = [...this.usuarios];
            this.filteredTrilhas = [...this.trilhas];

            Components.hideLoading();
        } catch (error) {
            Components.hideLoading();
            Components.showToast('Erro ao carregar dados: ' + error.message, 'error');
        }
    }

    // ========================================
    // USUARIOS
    // ========================================
    renderUsuarios() {
        const grid = document.getElementById('usuarios-grid');
        
        if (this.filteredUsuarios.length === 0) {
            grid.innerHTML = Components.createEmptyState(
                'Nenhum usuário encontrado',
                'Comece criando seu primeiro usuário',
                'Criar Usuário',
                'app.showNewUsuarioModal()'
            );
            return;
        }

        grid.innerHTML = this.filteredUsuarios
            .map(usuario => Components.createUsuarioCard(usuario))
            .join('');
    }

    filterUsuarios(query) {
        const searchTerm = query.toLowerCase();
        this.filteredUsuarios = this.usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(searchTerm) ||
            usuario.email.toLowerCase().includes(searchTerm) ||
            (usuario.cpf && usuario.cpf.includes(searchTerm))
        );
        this.renderUsuarios();
    }

    showNewUsuarioModal() {
        const modal = Components.createModal(
            'Novo Usuário',
            Components.createUsuarioForm(),
            `
                <button class="btn btn-ghost" onclick="Components.closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="app.createUsuario()">Criar</button>
            `
        );
    }

    async showEditUsuarioModal(id) {
        try {
            Components.showLoading();
            const usuario = await api.getUsuario(id);
            Components.hideLoading();

            const modal = Components.createModal(
                'Editar Usuário',
                Components.createUsuarioForm(usuario),
                `
                    <button class="btn btn-ghost" onclick="Components.closeModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="app.updateUsuario(${id})">Salvar</button>
                `
            );
        } catch (error) {
            Components.hideLoading();
            Components.showToast('Erro ao carregar usuário: ' + error.message, 'error');
        }
    }

    async createUsuario() {
        if (!Components.validateForm('usuario-form')) {
            return;
        }

        const data = Components.getFormData('usuario-form');

        try {
            Components.showLoading();
            const newUsuario = await api.createUsuario(data);
            Components.hideLoading();

            this.usuarios.push(newUsuario);
            this.filteredUsuarios = [...this.usuarios];
            
            Components.closeModal();
            Components.showToast('Usuário criado com sucesso!', 'success');
            
            if (this.currentPage === 'usuarios') {
                this.renderUsuarios();
            }
        } catch (error) {
            Components.hideLoading();
            
            if (error.errors && Object.keys(error.errors).length > 0) {
                Components.displayFormErrors(error.errors);
            } else {
                Components.showToast('Erro ao criar usuário: ' + error.message, 'error');
            }
        }
    }

    async updateUsuario(id) {
        if (!Components.validateForm('usuario-form')) {
            return;
        }

        const data = Components.getFormData('usuario-form');

        try {
            Components.showLoading();
            const updatedUsuario = await api.updateUsuario(id, data);
            Components.hideLoading();

            const index = this.usuarios.findIndex(u => u.id === id);
            if (index !== -1) {
                this.usuarios[index] = updatedUsuario;
                this.filteredUsuarios = [...this.usuarios];
            }

            Components.closeModal();
            Components.showToast('Usuário atualizado com sucesso!', 'success');
            
            if (this.currentPage === 'usuarios') {
                this.renderUsuarios();
            }
        } catch (error) {
            Components.hideLoading();
            
            if (error.errors && Object.keys(error.errors).length > 0) {
                Components.displayFormErrors(error.errors);
            } else {
                Components.showToast('Erro ao atualizar usuário: ' + error.message, 'error');
            }
        }
    }

    async deleteUsuario(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (!usuario) return;

        const confirmed = confirm(`Tem certeza que deseja deletar o usuário "${usuario.nome}"?`);
        if (!confirmed) return;

        try {
            Components.showLoading();
            await api.deleteUsuario(id);
            Components.hideLoading();

            this.usuarios = this.usuarios.filter(u => u.id !== id);
            this.filteredUsuarios = [...this.usuarios];

            Components.showToast('Usuário deletado com sucesso!', 'success');
            
            if (this.currentPage === 'usuarios') {
                this.renderUsuarios();
            }
        } catch (error) {
            Components.hideLoading();
            Components.showToast('Erro ao deletar usuário: ' + error.message, 'error');
        }
    }

    // ========================================
    // TRILHAS
    // ========================================
    renderTrilhas() {
        const grid = document.getElementById('trilhas-grid');
        
        if (this.filteredTrilhas.length === 0) {
            grid.innerHTML = Components.createEmptyState(
                'Nenhuma trilha encontrada',
                'Comece criando sua primeira trilha de aprendizado',
                'Criar Trilha',
                'app.showNewTrilhaModal()'
            );
            return;
        }

        grid.innerHTML = this.filteredTrilhas
            .map(trilha => Components.createTrilhaCard(trilha))
            .join('');
    }

    filterTrilhas(query) {
        const searchTerm = query.toLowerCase();
        this.filteredTrilhas = this.trilhas.filter(trilha => 
            trilha.nome.toLowerCase().includes(searchTerm) ||
            trilha.descricao.toLowerCase().includes(searchTerm) ||
            (trilha.nivel && trilha.nivel.toLowerCase().includes(searchTerm))
        );
        this.renderTrilhas();
    }

    showNewTrilhaModal() {
        const modal = Components.createModal(
            'Nova Trilha',
            Components.createTrilhaForm(),
            `
                <button class="btn btn-ghost" onclick="Components.closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="app.createTrilha()">Criar</button>
            `
        );
    }

    async showEditTrilhaModal(id) {
        try {
            Components.showLoading();
            const trilha = await api.getTrilha(id);
            Components.hideLoading();

            const modal = Components.createModal(
                'Editar Trilha',
                Components.createTrilhaForm(trilha),
                `
                    <button class="btn btn-ghost" onclick="Components.closeModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="app.updateTrilha(${id})">Salvar</button>
                `
            );
        } catch (error) {
            Components.hideLoading();
            Components.showToast('Erro ao carregar trilha: ' + error.message, 'error');
        }
    }

    async createTrilha() {
        if (!Components.validateForm('trilha-form')) {
            return;
        }

        const data = Components.getFormData('trilha-form');

        try {
            Components.showLoading();
            const newTrilha = await api.createTrilha(data);
            Components.hideLoading();

            this.trilhas.push(newTrilha);
            this.filteredTrilhas = [...this.trilhas];
            
            Components.closeModal();
            Components.showToast('Trilha criada com sucesso!', 'success');
            
            if (this.currentPage === 'trilhas') {
                this.renderTrilhas();
            }
        } catch (error) {
            Components.hideLoading();
            
            if (error.errors && Object.keys(error.errors).length > 0) {
                Components.displayFormErrors(error.errors);
            } else {
                Components.showToast('Erro ao criar trilha: ' + error.message, 'error');
            }
        }
    }

    async updateTrilha(id) {
        if (!Components.validateForm('trilha-form')) {
            return;
        }

        const data = Components.getFormData('trilha-form');

        try {
            Components.showLoading();
            const updatedTrilha = await api.updateTrilha(id, data);
            Components.hideLoading();

            const index = this.trilhas.findIndex(t => t.id === id);
            if (index !== -1) {
                this.trilhas[index] = updatedTrilha;
                this.filteredTrilhas = [...this.trilhas];
            }

            Components.closeModal();
            Components.showToast('Trilha atualizada com sucesso!', 'success');
            
            if (this.currentPage === 'trilhas') {
                this.renderTrilhas();
            }
        } catch (error) {
            Components.hideLoading();
            
            if (error.errors && Object.keys(error.errors).length > 0) {
                Components.displayFormErrors(error.errors);
            } else {
                Components.showToast('Erro ao atualizar trilha: ' + error.message, 'error');
            }
        }
    }

    async deleteTrilha(id) {
        const trilha = this.trilhas.find(t => t.id === id);
        if (!trilha) return;

        const confirmed = confirm(`Tem certeza que deseja deletar a trilha "${trilha.nome}"?`);
        if (!confirmed) return;

        try {
            Components.showLoading();
            await api.deleteTrilha(id);
            Components.hideLoading();

            this.trilhas = this.trilhas.filter(t => t.id !== id);
            this.filteredTrilhas = [...this.trilhas];

            Components.showToast('Trilha deletada com sucesso!', 'success');
            
            if (this.currentPage === 'trilhas') {
                this.renderTrilhas();
            }
        } catch (error) {
            Components.hideLoading();
            Components.showToast('Erro ao deletar trilha: ' + error.message, 'error');
        }
    }

    // ========================================
    // INPUT MASKS
    // ========================================
    setupMasks() {
        document.addEventListener('input', (e) => {
            if (e.target.id === 'cpf') {
                Components.maskCpf(e.target);
            } else if (e.target.id === 'telefone') {
                Components.maskTelefone(e.target);
            }
        });
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
