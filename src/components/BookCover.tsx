import React from 'react';
import './styles.css';
interface BookCoverProps {
  title: string;
  author: string;
  width?: number;
  height?: number;
  color?: string;
}

const defaultColors = [
  'bg-amber-200',
  'bg-orange-200',
  'bg-yellow-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-red-200',
  'bg-teal-200',
  'bg-purple-200',
  'bg-rose-200',
];
{
  /** 
const altDefaultColors = [
  'bg-gray-400',
  'bg-gray-600',
  'bg-gray-700',
  'bg-gray-800',
  //'bg-gray-900',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-red-300',
  'bg-slate-300',
];
*/
}
const patterns = [
  'bg-pattern-stripes',
  'bg-pattern-dots',
  'bg-pattern-crosshatch',
  'bg-pattern-diagonal-stripes',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * defaultColors.length);
  return defaultColors[randomIndex];
};

const getRandomPattern = () => {
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};

const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  width = 200,
  height = 300,
  color,
}) => {
  const [coverColor] = React.useState(color || getRandomColor());
  const [pattern] = React.useState(getRandomPattern());

  return (
    <div
      className={`relative flex flex-col justify-between p-4 ${coverColor} ${pattern} text-white shadow-lg border-2 border-gray-500 transition-transform transform hover:scale-105 hover:z-10 active:z-10 active:scale-110`}
      style={{ width: `${width}px`, height: `${height}px`, perspective: '1000px' }}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="text-md font-semibold">{author}</div>
      <div className="absolute top-0 left-0 w-full h-full border border-gray-300 transform rotate-y-10 -translate-x-1 translate-y-1" />
    </div>
  );
};

export default BookCover;
