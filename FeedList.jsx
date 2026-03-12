import FeedCard from './FeedCard';
import { mockPosts } from '../../data/mockPosts';
import { mockUsers } from "../../data/mockUsers.js";

export default function FeedList({ venueId }) {
  const posts = venueId ? mockPosts.filter(p => p.venueId === venueId) : mockPosts;
  return (
    <div className="px-4 pb-20">
      {posts.map(post => (
        <FeedCard key={post.id} post={post} user={mockUsers.find(u => u.id === post.userId)} />
      ))}
    </div>
  );
}