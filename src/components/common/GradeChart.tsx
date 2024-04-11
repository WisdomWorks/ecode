import { Doughnut } from 'react-chartjs-2'

import 'chart.js/auto'
import { ChartOptions } from 'chart.js'

interface DoughnutChartProps {
  between5And8: number
  greaterThan8: number
  lessThan5: number
}

export const DoughnutChart = ({
  between5And8,
  greaterThan8,
  lessThan5,
}: DoughnutChartProps) => {
  const data = {
    labels: ['Less than 5', 'Between 5 and 8', 'Greater than 8'],
    datasets: [
      {
        data: [lessThan5, between5And8, greaterThan8],
        backgroundColor: ['#FF6384', '#FFCE56', '#22c55e'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#22c55e'],
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
    },
  }

  return <Doughnut data={data} options={options} />
}
