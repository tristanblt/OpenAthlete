import { useGetMyAthleteQuery } from '@/services/athlete';

interface P {}

export function TrainingZonesTab({}: P) {
  const { data: athlete } = useGetMyAthleteQuery();

  return (
    <div>
      {athlete?.trainingZones.map((zone) => (
        <div key={zone.trainingZoneId}>
          <h3>{zone.name}</h3>
          <p>{zone.description}</p>
          <p>Type: {zone.type}</p>
          <ul>
            {zone.values.map((value) => (
              <li key={value.trainingZoneValueId}>
                {value.min} - {value.max} ({value.sports.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
