import PostForm from '../components/PostForm';

function Feed() {
  return (
    <div>
      <h2>Nova Postagem</h2>
      <PostForm />
      {/* Aqui pode vir a lista de postagens também */}
    </div>
  );
}

export default Feed;
