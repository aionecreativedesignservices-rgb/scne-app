export default function Avatar({ src, size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' };
  return (
    <img 
      src={src || 'https://via.placeholder.com/150'} 
      className={`${sizes[size]} rounded-full object-cover border border-gray-100 ${className}`} 
      alt="profile"
    />
  );
}