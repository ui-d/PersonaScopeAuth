import type { ChartData } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: ChartData<'doughnut'>;
  title: string;
  description: string;
  tags?: string[];
  isNew?: boolean;
}

export function DoughnutChart({
  data,
  title,
  description,
  tags,
  isNew,
}: DoughnutChartProps) {
  return (
    <div className='card bg-base-100 col-span-4 p-5 shadow-xl'>
      <div>
        <Doughnut data={data} />
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
