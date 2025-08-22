"use client";
import { DashboardCard } from "@/components/shared/card";
import { useGetAllTasksQuery } from "@/redux/features/admin/taskApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const DashboardContent = () => {
  const user = useAppSelector(selectCurrentUser);
  const userName = useAppSelector((state) => state.auth.userName);

  const { data: taskData } = useGetAllTasksQuery(undefined);

  return (
    <div className="space-y-8">
      <div className="bg-primary rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome to {userName || ""}.
        </h1>
        <p className="">Manage your tasks from one central location.</p>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-sm mx-auto">
        <DashboardCard
          title={"Total Tasks"}
          value={taskData?.meta?.total}
          description={`Total Tasks`}
          iconColor="bg-blue-500"
          iconBgColor="bg-blue-500"
          href="/dashboard/task-list"
          variant="stat"
        />
      </div>
    </div>
  );
};

export default DashboardContent;
