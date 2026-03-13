import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, DollarSign, TrendingUp } from "lucide-react";

// ENTER YOUR ADMIN EMAIL HERE
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) ?? [];

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Security Check: Only allow specified admins
  if (!user || !ADMIN_EMAILS.includes(user.email!)) {
    redirect("/dashboard");
  }

  // 2. Fetch all users from the profiles table
  const { data: allUsers, error: usersError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  // 3. Calculate simple stats
  const totalUsers = allUsers?.length || 0;
  const proUsers = allUsers?.filter(u => u.is_pro).length || 0;
  const freeUsers = totalUsers - proUsers;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground mt-2">
            Manage your users, subscriptions, and platform health.
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 gap-2 border-primary/50 text-primary">
          <ShieldCheck className="h-4 w-4" /> Admin Access
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-muted/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pro Subscribers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{proUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Free Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{freeUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Est. Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              ${(proUsers * 15).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card className="border-muted/20">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>A complete list of everyone registered on your platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Signed Up</TableHead>
                <TableHead className="text-right">Subscription ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers?.map((u) => (
                <TableRow key={u.id} className="group">
                  <TableCell className="font-medium">{u.email}</TableCell>
                  <TableCell>
                    {u.is_pro ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">Pro</Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {u.is_pro ? '∞' : u.credits}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(u.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">
                    {u.lemon_squeezy_subscription_id || "None"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
