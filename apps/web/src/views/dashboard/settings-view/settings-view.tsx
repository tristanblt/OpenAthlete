import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserRoles } from '@/contexts/auth';

import { AthletesTab } from './athletes-tab';
import { CoachesTab } from './coaches-tab';
import { ConnectorsTab } from './connectors-tab';
import { TrainingZonesTab } from './training-zones-tab';

export function SettingsView() {
  const roles = useUserRoles();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Tabs defaultValue="connectors" className="mt-4">
        <TabsList>
          <TabsTrigger value="connectors">Connectors</TabsTrigger>
          <TabsTrigger value="training_zones">Training zones</TabsTrigger>
          {roles?.includes('COACH') && (
            <TabsTrigger value="athletes">Athletes</TabsTrigger>
          )}
          {roles?.includes('ATHLETE') && (
            <TabsTrigger value="coaches">Coaches</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="connectors">
          <ConnectorsTab />
        </TabsContent>
        <TabsContent value="training_zones">
          <TrainingZonesTab />
        </TabsContent>
        <TabsContent value="athletes">
          <AthletesTab />
        </TabsContent>
        <TabsContent value="coaches">
          <CoachesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
