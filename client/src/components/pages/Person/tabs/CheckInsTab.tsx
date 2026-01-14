import { Card, CardContent } from '@mui/joy';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '../../../../theme/ThemeProvider';
import { CheckIn } from '../../../../generated';
import { prepareCheckInChartData } from './utils';

interface CheckInsTabProps {
  checkIns: CheckIn[];
}

export default function CheckInsTab({ checkIns }: CheckInsTabProps) {
  const { theme } = useTheme();

  const chartColor = theme.text.primary;
  const chartData = prepareCheckInChartData(checkIns);

  return (
    <Card
      variant="plain"
      sx={{
        bgcolor: theme.person.cardBackground,
        border: 'none',
        '--Card-padding': '1rem',
      }}
    >
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke={chartColor} tick={{ fill: chartColor }} />
            <YAxis domain={[0, 5]} stroke={chartColor} tick={{ fill: chartColor }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: theme.person.cardBackground,
                        padding: '12px',
                        border: `1px solid ${theme.colors.divider}`,
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      <p style={{ color: chartColor, margin: '4px 0' }}>{`Date: ${payload[0].payload.date}`}</p>
                      <p style={{ color: chartColor, margin: '4px 0' }}>{`Score: ${payload[0].value}`}</p>
                      {payload[0].payload.goal && (
                        <p style={{ color: chartColor, margin: '4px 0' }}>{`Goal: ${payload[0].payload.goal}`}</p>
                      )}
                      {payload[0].payload.reason && (
                        <p style={{ color: chartColor, margin: '4px 0' }}>{`Confidence Reason: ${payload[0].payload.reason}`}</p>
                      )}
                      {payload[0].payload.meetingRequested && (
                        <p
                          style={{ color: chartColor, margin: '4px 0' }}
                        >{`Meeting Requested Reasons: ${payload[0].payload.meetingRequested}`}</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={chartColor}
              strokeWidth={2}
              dot={{
                fill: chartColor,
                stroke: chartColor,
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: chartColor,
                stroke: chartColor,
                strokeWidth: 2,
                r: 6,
              }}
            />
            <CartesianGrid strokeDasharray="1 1" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
