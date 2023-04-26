import type { ChartData } from 'chart.js';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: ChartData<'bar'>;
  // options: ChartJS.ChartOptions<'bar'>;
  title: string;
  description: string;
  tags: string[];
  isNew?: boolean;
}

export function BarChart({
  data,
  title,
  description,
  tags,
  isNew,
}: BarChartProps) {
  return (
    <div className='card bg-base-100 col-span-4 p-5 shadow-xl'>
      <div>
        <Bar data={data} />
      </div>
      <div className='card-body'>
        <h2 className='card-title'>
          {title}
          {isNew && <div className='badge badge-accent'>NEW</div>}
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
