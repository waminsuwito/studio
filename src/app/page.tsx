import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Equipment, type EquipmentStatus } from '@/types';
import {
  CircuitBoard,
  ThumbsUp,
  AlertTriangle,
  CircleX,
  ClipboardList,
  ClipboardCheck,
} from 'lucide-react';

const equipmentData: Equipment[] = [
  {
    id: 'EQP-001',
    location: 'Sector A, Bay 1',
    status: 'Good',
    lastChecked: '2024-07-20',
  },
  {
    id: 'EQP-002',
    location: 'Sector A, Bay 2',
    status: 'Attention',
    lastChecked: '2024-07-19',
  },
  {
    id: 'EQP-003',
    location: 'Sector B, Bay 1',
    status: 'Good',
    lastChecked: '2024-07-21',
  },
  {
    id: 'EQP-004',
    location: 'Sector C, Bay 1',
    status: 'Broken',
    lastChecked: '2024-07-18',
  },
  {
    id: 'EQP-005',
    location: 'Sector C, Bay 2',
    status: 'Good',
    lastChecked: '2024-07-21',
  },
  {
    id: 'EQP-006',
    location: 'Maintenance',
    status: 'Good',
    lastChecked: '2024-07-22',
  },
  {
    id: 'EQP-007',
    location: 'Sector A, Bay 3',
    status: 'Attention',
    lastChecked: '2024-07-22',
  },
];

const statusConfig: Record<
  EquipmentStatus,
  {
    variant: 'default' | 'secondary' | 'destructive';
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }
> = {
  Good: { variant: 'default', icon: ThumbsUp, label: 'Good' },
  Attention: { variant: 'secondary', icon: AlertTriangle, label: 'Attention' },
  Broken: { variant: 'destructive', icon: CircleX, label: 'Broken' },
};

export default function DashboardPage() {
  const total = equipmentData.length;
  const checked = equipmentData.filter(e => e.lastChecked === new Date().toISOString().split('T')[0] || new Date(e.lastChecked) > new Date(new Date().setDate(new Date().getDate()-1))).length;
  const good = equipmentData.filter((e) => e.status === 'Good').length;
  const attention = equipmentData.filter((e) => e.status === 'Attention').length;
  const broken = equipmentData.filter((e) => e.status === 'Broken').length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 animate-in fade-in-0 duration-500">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Equipment
            </CardTitle>
            <CircuitBoard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{total}</div>
            <p className="text-xs text-muted-foreground">All registered units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checked</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{checked}</div>
            <p className="text-xs text-muted-foreground">Inspected today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unchecked</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{total - checked}</div>
            <p className="text-xs text-muted-foreground">Pending inspection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Condition</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{good}</div>
            <p className="text-xs text-muted-foreground">Operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{attention}</div>
            <p className="text-xs text-muted-foreground">Minor issues found</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Broken</CardTitle>
            <CircleX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{broken}</div>
            <p className="text-xs text-muted-foreground">Out of service</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Equipment Overview</CardTitle>
          <CardDescription>
            Live status of all equipment units.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipmentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium font-code">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastChecked}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={statusConfig[item.status].variant}
                      className="capitalize"
                    >
                      {statusConfig[item.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
