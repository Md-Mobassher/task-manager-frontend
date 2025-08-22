"use client";
import { FormInput, FormPasswordInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values).unwrap();
      if (result.success) {
        toast.success(result.message || "Successfully registered!");
        router.push(`/login?email=${encodeURIComponent(values.email)}`);
      }
    } catch (error: any) {
      console.error("Register Error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to register!"
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4 text-left"
        onSubmit={form.handleSubmit(onFinish)}
      >
        <FormInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your full name"
          required
          autoComplete="name"
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          required
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          autoComplete="email"
        />

        <FormPasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
          autoComplete="new-password"
          showToggle={true}
        />

        <Button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50 mt-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
