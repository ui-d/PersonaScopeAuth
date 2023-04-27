import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
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

interface propType {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  title: string;
  description: string;
  tags?: string[];
  isNew?: boolean;
  isFullWidth?: boolean;
}

export function StackedBarChart({
  data,
  options,
  title,
  description,
  tags,
  isNew,
  isFullWidth,
}: propType) {
  return (
    <div
      className={`${
        isFullWidth ? 'col-span-12' : 'col-span-8'
      } card bg-base-100 p-5 shadow-xl`}
    >
      <div>
        <Bar options={options} data={data} />
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
