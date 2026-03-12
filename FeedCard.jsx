import Avatar from './Avatar';
import Card from './Card';

export default function FeedCard({ post, user }) {
  return (
    <Card className="mb-4 !p-0 overflow-hidden">
      <div className="p-3 flex items-center space-x-3">
        <Avatar src={user?.avatar} size="sm" />
        <div>
          <p className="text-sm font-bold">{user?.name}</p>
          <p className="text-[10px] text-gray-400">{post.timestamp}</p>
        </div>
      </div>
      <img src={post.image} className="w-full aspect-square object-cover" alt="post" />
      <div className="p-3">
        <p className="text-sm text-gray-700">{post.content}</p>
      </div>
    </Card>
  );
}