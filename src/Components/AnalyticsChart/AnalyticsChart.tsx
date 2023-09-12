import {FC} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import css from './analyticsChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IProps {
    onClose: () => void;
    uniqueLabels: string[],
    lineLabels: number[]
    scores: number[][]

}

const AnalyticsChart: FC<IProps> = ({ onClose, uniqueLabels, lineLabels, scores}) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Graphs of test results',
            },
        },
    };
    const chartData = {
        labels: uniqueLabels,
        datasets: scores.map((score, index) => ({
            label: `Quiz ${lineLabels[index]}`,
            data: score,
            fill: false,
            borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        })),
    };

    return (
        <div className={css.chartWrapper}>
            <div className={css.chartButtonClose}>
                <button className={css.modal_close} onClick={onClose}> X</button>
            </div>

            <Line data={chartData} options={options}/>
        </div>
    );
};
export {AnalyticsChart};