// App.tsx
import { useEffect, useState } from 'react';
import { Layout, Alert } from 'antd';
import ConfessionForm from './components/ConfessionForm';
import PostList from './components/PostList';
import { getPosts, subscribeToUpdates } from './services/api';

const { Header, Content } = Layout;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('无法加载帖子');
      }
    };

    fetchData();
    const unsubscribe = subscribeToUpdates((newPost: Post) => {
      setPosts(prev => [newPost, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <Header style={{ color: 'white' }}>匿名告解室</Header>
      <Content style={{ padding: '24px 50px' }}>
        {error && <Alert message={error} type="error" />}
        <ConfessionForm />
        <PostList posts={posts} />
      </Content>
    </Layout>
  );
}