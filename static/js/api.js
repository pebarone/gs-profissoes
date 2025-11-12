// API Service Module
// Handles all HTTP requests to the backend API

const API_BASE_URL = window.location.origin;

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Generic request handler with error handling
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            // Handle different response statuses
            if (response.status === 204) {
                return null; // No content
            }

            const data = await response.json();

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: data.message || data.title || 'Erro desconhecido',
                    errors: data.errors || {},
                };
            }

            return data;
        } catch (error) {
            if (error.status) {
                throw error;
            }
            throw {
                status: 0,
                message: 'Erro de conexão com o servidor',
                errors: {},
            };
        }
    }

    // ========================================
    // USUARIOS ENDPOINTS
    // ========================================

    // GET /api/usuarios - Listar todos os usuários
    async getUsuarios() {
        return this.request('/api/usuarios', {
            method: 'GET',
        });
    }

    // GET /api/usuarios/{id} - Buscar usuário por ID
    async getUsuario(id) {
        return this.request(`/api/usuarios/${id}`, {
            method: 'GET',
        });
    }

    // POST /api/usuarios - Criar novo usuário
    async createUsuario(usuario) {
        return this.request('/api/usuarios', {
            method: 'POST',
            body: JSON.stringify(usuario),
        });
    }

    // PUT /api/usuarios/{id} - Atualizar usuário
    async updateUsuario(id, usuario) {
        return this.request(`/api/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(usuario),
        });
    }

    // DELETE /api/usuarios/{id} - Deletar usuário
    async deleteUsuario(id) {
        return this.request(`/api/usuarios/${id}`, {
            method: 'DELETE',
        });
    }

    // ========================================
    // TRILHAS ENDPOINTS
    // ========================================

    // GET /api/trilhas - Listar todas as trilhas
    async getTrilhas() {
        return this.request('/api/trilhas', {
            method: 'GET',
        });
    }

    // GET /api/trilhas/{id} - Buscar trilha por ID
    async getTrilha(id) {
        return this.request(`/api/trilhas/${id}`, {
            method: 'GET',
        });
    }

    // POST /api/trilhas - Criar nova trilha
    async createTrilha(trilha) {
        return this.request('/api/trilhas', {
            method: 'POST',
            body: JSON.stringify(trilha),
        });
    }

    // PUT /api/trilhas/{id} - Atualizar trilha
    async updateTrilha(id, trilha) {
        return this.request(`/api/trilhas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(trilha),
        });
    }

    // DELETE /api/trilhas/{id} - Deletar trilha
    async deleteTrilha(id) {
        return this.request(`/api/trilhas/${id}`, {
            method: 'DELETE',
        });
    }
}

// Export singleton instance
const api = new ApiService(API_BASE_URL);
