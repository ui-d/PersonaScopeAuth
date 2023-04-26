import type { ChartData } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface chartProps {
  data: ChartData<'line'>;
  title: string;
  description: string;
  tags: string[];
  isNew?: boolean;
}

export function AreaChart({
  data,
  title,
  description,
  tags,
  isNew,
}: chartProps) {
  return (
    <div className='card bg-base-100 col-span-12 p-5 shadow-xl'>
      <div>
        <Line data={data} />{' '}
      </div>
      <div className='card-body'>
        <h2 className='card-title'>
          {title}
          {isNew && <div className='badge badge-secondary'>NEW</div>}
        </h2>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          {!!tags &&
            tags.map((tag, index) => (
              <div key={index} className='badge badge-outline'>
                {tag}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
