-- V1__Initial_Schema.sql
-- Migração inicial do banco de dados para a plataforma de Upskilling/Reskilling

-- Tabela de usuários da plataforma
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    area_atuacao VARCHAR(100),
    nivel_carreira VARCHAR(50),
    data_cadastro DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de trilhas de aprendizagem
CREATE TABLE trilhas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    nivel VARCHAR(50) NOT NULL,
    carga_horaria INT NOT NULL,
    foco_principal VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de competências (skills)
CREATE TABLE competencias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100),
    descricao TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relação N:N entre trilhas e competências
CREATE TABLE trilha_competencia (
    trilha_id BIGINT NOT NULL,
    competencia_id BIGINT NOT NULL,
    PRIMARY KEY (trilha_id, competencia_id),
    CONSTRAINT fk_trilha_competencia_trilha
        FOREIGN KEY (trilha_id) REFERENCES trilhas (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_trilha_competencia_competencia
        FOREIGN KEY (competencia_id) REFERENCES competencias (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Matrícula de usuários em trilhas
CREATE TABLE matriculas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    trilha_id BIGINT NOT NULL,
    data_inscricao DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_matricula_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_matricula_trilha
        FOREIGN KEY (trilha_id) REFERENCES trilhas (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para otimização
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_trilhas_nivel ON trilhas(nivel);
CREATE INDEX idx_matriculas_usuario ON matriculas(usuario_id);
CREATE INDEX idx_matriculas_trilha ON matriculas(trilha_id);
CREATE INDEX idx_matriculas_status ON matriculas(status);
