import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { getHardwareStats } from "../obs";
import LoadingIcon from "./LoadingIcon";
import Section from "./Section";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface Stats {
  cpu: number[];
  memory: number[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WARNING_THRESHOLD = 90;

const getChartData = (stats: Stats) => ({
  labels: Array.from(Array(stats.cpu.length).keys()).map((_) => ""),
  datasets: [
    {
      label: "CPU (%)",
      data: stats.cpu,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Memory (%)",
      data: stats.memory,
      borderColor: "rgb(56, 156, 58)",
      backgroundColor: "rgba(56, 156, 58, 0.5)",
    },
  ],
});

function HardwareSection() {
  const [stats, setStats] = useState<Stats>({ cpu: [], memory: [] });

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getHardwareStats();
      setStats({
        cpu: response.cpu,
        memory: response.memory,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section title="Hardware">
      <ButtonGroup vertical style={{ width: "100%" }}>
        {!stats ? (
          <LoadingIcon />
        ) : (
          Object.keys(stats)
            .sort()
            .map((key, index) => {
              const statsKey = key as keyof Stats;
              const value = stats[statsKey][stats[statsKey].length - 1] || 0;
              return (
                <p key={index}>
                  {key.toUpperCase()}:{" "}
                  <span
                    style={{
                      fontFamily: "monospace",
                      background:
                        value > WARNING_THRESHOLD ? "salmon" : undefined,
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  >
                    {value.toFixed(2)}%
                  </span>
                </p>
              );
            })
        )}
      </ButtonGroup>
      <Line
        options={{
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
        }}
        data={getChartData(stats)}
      />
    </Section>
  );
}

export default HardwareSection;
