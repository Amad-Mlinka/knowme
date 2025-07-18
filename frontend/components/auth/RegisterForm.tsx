"use client";
import React from "react";
import styles from "./AuthForm.module.scss";
import Input from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {Label} from "@/components/ui/Label";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.field}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" required />
      </div>
      <div className={styles.field}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
      </div>
      <div className={styles.field}>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className={styles.submit}>Register</Button>
      <p className={styles.switch}>
        Have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm; 