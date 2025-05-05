import { m } from '@/paraglide/messages';

import { NoteEvent } from '@openathlete/shared';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface P {
  event: NoteEvent;
}

export function NoteDetails({ event }: P) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>{m.description()}</CardTitle>
        </CardHeader>
        <CardContent>
          {event.description.split('\n').map((part) => (
            <>
              {part}
              <br />
            </>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
