Projeto Final 
Descrição Geral 
Este projeto consiste no desenvolvimento de uma aplicação web (front-end e back-end) de rede social com 
foco em interatividade aberta entre os usuários, promovendo conexões, compartilhamento de conteúdo, 
discussões em grupo e comunicação privada. O sistema não possui perfis privados, incentivando o acesso 
livre ao conteúdo da rede e a descoberta de novas conexões por afinidades e interesses. 
O projeto deve ser feito obrigatoriamente em React (front-end) e Node.js (backend), podendo ser utilizado 
quaisquer bibliotecas para apoiar o desenvolvimento das funcionalidades. 
Além disso, o back-end deve se conectar a um banco MySQL, responsável por persistir as informações da 
rede social. 
Funcionalidades Principais 
1. Cadastro de Usuários 
Cada usuário poderá se registrar fornecendo as seguintes informações: 
● Nome de usuário (único) 
● E-mail 
● Data de nascimento 
● Foto de perfil 
A autenticação será realizada de forma segura por meio de e-mail e senha e as senhas devem ser 
armazenadas de forma segura. 
Os usuários também podem se conectar entre si por meio de solicitações e aceitações de conexão. 
● O sistema não implementa perfis privados: qualquer usuário pode visualizar postagens, perfis e 
interações de outros usuários, mesmo sem conexão. 
2. Postagens e Interações 
Usuários podem criar postagens públicas, que devem ter os seguintes atributos: 
● Data de criação 
● Tipo de conteúdo (texto, imagem (com ou sem texto) ou vídeo (com ou sem texto)) 
● Conteúdo 
As interações permitidas incluem: 
● Avaliações positivas ou negativas nas postagens 
● Comentários em postagens 
● Respostas a comentários (comentários em comentários) 
● Avaliações em comentários 
3. Grupos e Comunidades 
Usuários podem criar ou participar de grupos temáticos, cada um com: 
● Nome único 
● Descrição 
● Data de criação 
● Lista de membros com funções: membro ou administrador 
Regras específicas: 
● Apenas administradores podem apagar mensagens de outros membros 
● Grupos permitem discussões públicas entre seus membros 
4. Mensagens Privadas 
Os usuários podem trocar mensagens privadas com outros usuários. As mensagens devem conter: 
● Remetente e destinatário 
● Conteúdo 
● Data e hora 
● Status (enviada, recebida, lida) 
O sistema manterá um histórico completo das conversas, permitindo a retomada de diálogos. 
5. Tags e Interesses 
Cada usuário pode atribuir até 5 tags ao seu perfil, representando seus gostos e interesses. 
● As tags ajudam na descoberta de usuários com afinidades 
● Novas tags podem ser criadas por qualquer usuário 
● A busca por usuários com tags similares será suportada na interface de pesquisa
