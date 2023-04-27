export const StackedBarChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
