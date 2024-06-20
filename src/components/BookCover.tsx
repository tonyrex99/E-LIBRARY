import React from 'react';

interface BookCoverProps {
  title: string;
  author: string;
  width?: number;
  height?: number;
  color?: string;
}

const defaultColors = ['bg-gray-500', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * defaultColors.length);
  return defaultColors[randomIndex];
};

const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  width = 200,
  height = 300,
  color,
}) => {
  const coverColor = color || getRandomColor();

  return (
    <div
      className={`flex flex-col justify-between p-4 ${coverColor} text-white`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="text-md font-semibold">{author}</div>
    </div>
  );
};

export default BookCover;
