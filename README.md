# Projeto Final - Rede Social Interativa

## 📌 Descrição Geral

Este projeto é uma aplicação web completa (front-end e back-end) com foco em **interatividade aberta entre usuários**, promovendo conexões, compartilhamento de conteúdo, discussões em grupo e comunicação aberta.  
O sistema **não possui perfis privados**, incentivando o acesso livre ao conteúdo e a descoberta de novas conexões por afinidades e interesses.

Tecnologias obrigatórias:
- **Front-end:** React.js
- **Back-end:** Node.js
- **Banco de Dados:** MySQL

É permitido o uso de quaisquer bibliotecas adicionais para apoiar o desenvolvimento.

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
