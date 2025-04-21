import { ConnectionsList } from "@/components/connections-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConnectionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Connections</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="classmates">Classmates</TabsTrigger>
          <TabsTrigger value="seniors">Seniors</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ConnectionsList type="all" />
        </TabsContent>
        <TabsContent value="classmates">
          <ConnectionsList type="classmates" />
        </TabsContent>
        <TabsContent value="seniors">
          <ConnectionsList type="seniors" />
        </TabsContent>
        <TabsContent value="pending">
          <ConnectionsList type="pending" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
