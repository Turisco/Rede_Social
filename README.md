# Projeto Final - Rede Social Interativa

## 📌 Descrição Geral

Este projeto é uma aplicação web full-stack de rede social, desenvolvida com o objetivo de aprimorar minhas habilidades em desenvolvimento de software. A proposta é criar uma plataforma interativa onde os usuários possam se conectar, compartilhar conteúdo e participar de discussões em grupo. Diferentemente de redes sociais tradicionais, esta aplicação não possui perfis privados, promovendo um ambiente de acesso livre ao conteúdo e incentivando a descoberta de novas conexões por afinidades e interesses.

Tecnologias obrigatórias:
- **Front-end:** React.js
- **Back-end:** Node.js
- **Banco de Dados:** MySQL

Além das tecnologias principais, foram utilizadas bibliotecas adicionais para apoiar o desenvolvimento e melhorar a experiência do usuário

---

## 🧑‍💼 Funcionalidades Principais

### 1. Cadastro de Usuários
Cada usuário poderá se registrar fornecendo:
- Nome de usuário (**único**)
- E-mail
- Data de nascimento
- Foto de perfil

#### 🔐 Autenticação
- Login seguro com **e-mail e senha**
- Senhas devem ser **armazenadas de forma segura (criptografadas)**
- Os usuários podem **se conectar entre si** por meio de solicitações e aceitações de conexão

⚠️ **Não há perfis privados**: qualquer usuário pode visualizar postagens, perfis e interações de outros usuários, mesmo sem conexão.

---

### 2. Postagens e Interações

#### 📢 Postagens
Usuários podem criar postagens públicas com:
- Data de criação
- Tipo de conteúdo:
  - Texto
  - Imagem (com ou sem texto)
  - Vídeo (com ou sem texto)
- Conteúdo

#### 🤝 Interações Permitidas
- Avaliações positivas ou negativas nas postagens
- Comentários em postagens
- Respostas a comentários (comentários em comentários)
- Avaliações em comentários

---

### 3. Grupos e Comunidades

Usuários podem criar ou participar de grupos temáticos com:
- Nome único
- Descrição
- Data de criação
- Lista de membros com funções:
  - Membro
  - Administrador

#### ⚖️ Regras dos Grupos
- **Apenas administradores** podem apagar mensagens de outros membros
- Grupos permitem **discussões públicas** entre seus membros
