import Avatar from './Avatar';
import { mockUsers } from "../../data/mockUsers.js";

export default function StoryRow() {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 no-scrollbar">
      {mockUsers.map(user => (
        <div key={user.id} className="flex-shrink-0 flex flex-col items-center space-y-1">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
            <Avatar src={user.avatar} className="border-2 border-white" />
          </div>
          <span className="text-[10px] text-gray-500 w-12 truncate text-center">{user.name}</span>
        </div>
      ))}
    </div>
  );
}