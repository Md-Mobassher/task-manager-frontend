// src/app/(dashboard)/dashboard/components/TaskList.tsx

"use client";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "@/redux/features/admin/taskApi";
import { useDebounced } from "@/redux/hooks";
import {
  createTaskFormSchema,
  TaskFormData,
  updateTaskFormSchema,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

const StatusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
];

export default function TaskList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<any>({});
  // Use correct schema depending on modal mode
  const form = useForm<TaskFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateTaskFormSchema : createTaskFormSchema
    ),
    defaultValues: {
      title: "",
      description: "",
      status: "PENDING",
      priority: "MEDIUM",
      dueDate: new Date(),
    },
  });

  // Use the custom hook for Task operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateTaskMutation,
      updateMutation: useUpdateTaskMutation,
      deleteMutation: useDeleteTaskMutation,
    },
    "Task"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "createdAt",
      sortOrder: "desc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...filters,
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading: isTableLoading } = useGetAllTasksQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler
  const onSubmit = async (values: TaskFormData) => {
    const taskData = {
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      dueDate: new Date(values.dueDate),
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(taskData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, taskData);
    }

    if (success) {
      handleReset();
    }
  };

  // Handle form submission for modal
  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  // search
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // filter
  const handleFilter = (selectedFilter: string) => {
    if (selectedFilter === "all") {
      setFilters({});
    } else {
      setFilters({ status: selectedFilter });
    }
    setPagination((prev) => ({
      ...prev,
      limit: 10,
      page: 1,
    }));
  };

  // reset
  const handleReset = () => {
    form.reset({
      title: "",
      description: "",
      status: "PENDING",
      priority: "MEDIUM",
      dueDate: new Date(),
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
  };

  // Populate form fields when editing a task
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        description: selectedData.description || "",
        status: selectedData.status || "PENDING",
        priority: selectedData.priority || "MEDIUM",
        dueDate: new Date(selectedData.dueDate) || new Date(),
      });
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        description: "",
        status: "PENDING",
        priority: "MEDIUM",
        dueDate: new Date(),
      });
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.original.title;
        return <div className="truncate w-full">{title || "-"}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row?.original?.description;
        return (
          <div className="truncate w-full max-w-xs">{description || "-"}</div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row?.original?.status;
        const statusColor =
          status === "COMPLETED"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800";
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status || "PENDING"}
          </span>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row?.original?.priority;
        const priorityColor =
          priority === "HIGH"
            ? "bg-red-100 text-red-800"
            : priority === "MEDIUM"
              ? "bg-orange-100 text-orange-800"
              : "bg-blue-100 text-blue-800";
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}
          >
            {priority || "MEDIUM"}
          </span>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        const dueDate = row?.original?.dueDate;
        return (
          <div className="truncate w-full">
            {dueDate ? new Date(dueDate).toLocaleDateString() : "-"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onEdit={() => {
            setSelectedId(row.original.id);
            setSelectedData(row.original);
            setIsModalOpen("edit");
          }}
          onDelete={() => deleteEntity?.(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC] rounded-lg md:shadow-lg">
        <DasboardTitle
          title="Tasks"
          buttonText="Add Task"
          onClick={() => setIsModalOpen("add")}
        />
        <ReusableTable
          data={data?.data || []}
          meta={data?.meta}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          searchTerm={searchTerm}
          searchPlaceholder="Search tasks..."
          searchable
          filterable
          filterOptions={StatusOptions}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit task */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            size="lg"
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Task" : "Edit Task"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                placeholder="Enter task title"
                required
              />

              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter task description"
              />

              <FormSelect
                name="status"
                label="Status"
                placeholder="Select status"
                options={[
                  { value: "PENDING", label: "Pending" },
                  { value: "COMPLETED", label: "Completed" },
                ]}
              />

              <FormSelect
                name="priority"
                label="Priority"
                placeholder="Select priority"
                options={[
                  { value: "LOW", label: "Low" },
                  { value: "MEDIUM", label: "Medium" },
                  { value: "HIGH", label: "High" },
                ]}
              />

              <FormDatePicker
                name="dueDate"
                label="Due Date"
                placeholder="Select due date"
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
