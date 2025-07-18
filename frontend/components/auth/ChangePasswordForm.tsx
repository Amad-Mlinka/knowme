"use client";
import React from "react";
import styles from "./AuthForm.module.scss";
import Input from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {Label} from "@/components/ui/Label";

const ChangePasswordForm: React.FC = () => {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.field}>
        <Label htmlFor="current">Current Password</Label>
        <Input id="current" type="password" required />
      </div>
      <div className={styles.field}>
        <Label htmlFor="new">New Password</Label>
        <Input id="new" type="password" required />
      </div>
      <div className={styles.field}>
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" type="password" required />
      </div>
      <Button type="submit" className={styles.submit}>Change Password</Button>
    </form>
  );
};

export default ChangePasswordForm; 