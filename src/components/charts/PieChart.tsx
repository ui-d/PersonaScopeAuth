import type { ChartData } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface propType {
  data: ChartData<'pie'>;
  title: string;
  description: string;
  tags?: string[];
  isNew?: boolean;
}
export function PieChart({ data, title, description, tags, isNew }: propType) {
  return (
    <div className='card bg-base-100 col-span-12 p-5 shadow-xl xl:col-span-4'>
      <div>
        <Pie data={data} />
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
