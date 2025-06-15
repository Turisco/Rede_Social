const express = require('express');
const cors = require('cors');
const path = require('path');

const CadastroRoutes = require('./routes/CadastroRoutes');
const PerfilRoutes = require('./routes/PerfilRoutes');
const GroupRoutes = require('./routes/CreateGroupRoutes');
const JoinGroupRoutes = require('./routes/JoinGroupRoutes');
const ChatRoutes = require('./routes/ChatRoutes');
const PostagemRoutes = require("./routes/PostagemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/cadastro', CadastroRoutes);
app.use('/perfil', PerfilRoutes);
app.use('/grupo', GroupRoutes);
app.use('/grupos', JoinGroupRoutes);
app.use('/chat', ChatRoutes);
app.use("/postagem", PostagemRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
