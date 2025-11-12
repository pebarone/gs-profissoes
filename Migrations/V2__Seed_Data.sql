-- V2__Seed_Data.sql
-- Dados iniciais (seeds) para a plataforma

-- Inserir competências do futuro do trabalho
INSERT INTO competencias (nome, categoria, descricao) VALUES
('Inteligência Artificial', 'Tecnologia', 'Compreensão e aplicação de IA, Machine Learning e Deep Learning'),
('Análise de Dados', 'Tecnologia', 'Capacidade de interpretar e extrair insights de grandes volumes de dados'),
('Cloud Computing', 'Tecnologia', 'Conhecimento em computação em nuvem (AWS, Azure, GCP)'),
('Cibersegurança', 'Tecnologia', 'Proteção de sistemas e dados contra ameaças digitais'),
('Desenvolvimento Sustentável', 'Tecnologia', 'Tecnologias verdes e práticas sustentáveis'),
('Pensamento Crítico', 'Humana', 'Capacidade de análise lógica e tomada de decisões fundamentadas'),
('Criatividade', 'Humana', 'Inovação e desenvolvimento de soluções originais'),
('Inteligência Emocional', 'Humana', 'Capacidade de reconhecer e gerenciar emoções'),
('Colaboração', 'Humana', 'Trabalho efetivo em equipe e ambientes híbridos'),
('Adaptabilidade', 'Humana', 'Flexibilidade para mudanças e novas situações'),
('Gestão de Projetos Ágeis', 'Gestão', 'Metodologias ágeis (Scrum, Kanban)'),
('Liderança Digital', 'Gestão', 'Liderança em ambientes digitais e remotos');

-- Inserir trilhas de aprendizagem
INSERT INTO trilhas (nome, descricao, nivel, carga_horaria, foco_principal) VALUES
('IA Generativa para Profissionais', 'Aprenda a utilizar ferramentas de IA generativa no dia a dia profissional', 'INICIANTE', 40, 'IA'),
('Cientista de Dados 2030', 'Formação completa em análise de dados, estatística e machine learning', 'AVANCADO', 200, 'Dados'),
('Cloud Engineer Essentials', 'Fundamentos de computação em nuvem e arquitetura de sistemas distribuídos', 'INTERMEDIARIO', 80, 'Cloud'),
('Cibersegurança para o Futuro', 'Proteção de dados e sistemas em ambientes digitais', 'INTERMEDIARIO', 120, 'Segurança'),
('Soft Skills para Líderes Digitais', 'Desenvolva habilidades humanas essenciais para liderança no futuro', 'INICIANTE', 60, 'Soft Skills'),
('Green Tech e Sustentabilidade', 'Tecnologias sustentáveis e economia circular', 'INICIANTE', 50, 'Sustentabilidade'),
('Transformação Digital Completa', 'Entenda e lidere processos de transformação digital nas organizações', 'AVANCADO', 160, 'Gestão'),
('Desenvolvimento Ágil de Software', 'Metodologias ágeis aplicadas ao desenvolvimento de software', 'INTERMEDIARIO', 100, 'Tecnologia');

-- Relacionar trilhas com competências
INSERT INTO trilha_competencia (trilha_id, competencia_id) VALUES
-- IA Generativa
(1, 1), (1, 6), (1, 7),
-- Cientista de Dados
(2, 1), (2, 2), (2, 6),
-- Cloud Engineer
(3, 3), (3, 11),
-- Cibersegurança
(4, 4), (4, 6),
-- Soft Skills
(5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 12),
-- Green Tech
(6, 5), (6, 7), (6, 10),
-- Transformação Digital
(7, 1), (7, 3), (7, 11), (7, 12),
-- Desenvolvimento Ágil
(8, 9), (8, 11);

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, area_atuacao, nivel_carreira, data_cadastro) VALUES
('Ana Silva', 'ana.silva@email.com', 'Tecnologia da Informação', 'Pleno', '2025-01-15'),
('Carlos Santos', 'carlos.santos@email.com', 'Gestão de Projetos', 'Senior', '2025-02-10'),
('Maria Oliveira', 'maria.oliveira@email.com', 'Marketing Digital', 'Junior', '2025-03-05'),
('João Pereira', 'joao.pereira@email.com', 'Análise de Dados', 'Em transição', '2025-03-20');

-- Inserir matrículas de exemplo
INSERT INTO matriculas (usuario_id, trilha_id, data_inscricao, status) VALUES
(1, 1, '2025-01-20', 'ATIVA'),
(1, 3, '2025-02-01', 'ATIVA'),
(2, 5, '2025-02-15', 'ATIVA'),
(2, 7, '2025-02-20', 'CONCLUIDA'),
(3, 1, '2025-03-10', 'ATIVA'),
(4, 2, '2025-03-25', 'ATIVA');
