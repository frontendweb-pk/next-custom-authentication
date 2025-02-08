"use server";

import { z } from "zod";
import { User } from "../models/user";
import { Password } from "../password";
import { ValidationError } from "sequelize";
import { createSession, deleteSession } from "../session/session";
import { Role } from "../models";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(8, "Password must be at least 8 characters"),
});
export async function login(formState: FormState, formData: FormData) {
  try {
    const body = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    // request validation
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return {
        status: "error",
        errors: parsed.error.flatten().fieldErrors,
      };
    }
    // check user is exists
    const user = await User.findOne({
      where: { email: parsed.data.email },
      include: [{ model: Role, foreignKey: "role_id", as: "role" }],
    });
    console.log("user", user?.toJSON().role.role_name);

    if (!user) {
      return { status: "error", message: "User not found" };
    }

    // check password
    const isMatch = await Password.compare(body.password, user.password);
    if (!isMatch) {
      return { status: "error", message: "Password is incorrect" };
    }

    console.log("User role name", user?.toJSON().role.role_name);

    // generate session
    await createSession({
      expireTime: 60 * 60,
      user_id: user.user_id,
      role: user?.toJSON().role.role_name,
    });
  } catch (error) {
    console.error("Error", error);
    let message = "Something went wrong";
    if (error instanceof ValidationError) {
      message = error.message;
    }
    return {
      status: "error",
      message: message,
    };
  }
  redirect("/dashboard");
}

/**
 * Register user
 */
const signupSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  role_id: z.number().default(2),
});
export async function signup(formState: FormState, formData: FormData) {
  try {
    const body = Object.fromEntries(formData) as {
      name: string;
      email: string;
      password: string;
      mobile: string;
    };

    // validation
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return {
        status: "error",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // check user is already exists
    const user = await User.findOne({ where: { email: body.email } });
    if (user) {
      return {
        status: "error",
        message: "User already exists",
      };
    }

    // create user
    parsed.data.password = await Password.hash(body.password);
    await User.create(parsed.data);
    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof ValidationError) {
      message = error.message;
    }
    return {
      status: "error",
      message: message,
    };
  }
}

/**
 * Logout user
 */
export async function logout() {
  await deleteSession();
  redirect("/");
}
