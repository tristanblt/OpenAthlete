import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ConnectorsTab } from './connectors-tab';
import { TrainingZonesTab } from './training-zones-tab';

export function SettingsView() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Tabs defaultValue="connectors" className="mt-4">
        <TabsList>
          <TabsTrigger value="connectors">Connectors</TabsTrigger>
          <TabsTrigger value="training_zones">Training zones</TabsTrigger>
        </TabsList>
        <TabsContent value="connectors">
          <ConnectorsTab />
        </TabsContent>
        <TabsContent value="training_zones">
          <TrainingZonesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
