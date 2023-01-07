import { Form, useLocation } from "@remix-run/react";
import { Button } from "~/ui/Button";
import { Dropdown } from "~/ui/Dropdown";
import { Input } from "~/ui/Input";
import { Spacing } from "~/ui/Spacing";

export const AddRecord = () => {
  const location = useLocation();

  return (
    <Form
      method="post"
      action={`/records/add?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-100 px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Add Record</h4>
      <Spacing vertical="2" />
      <Input name="account" size="sm" placeholder="Account" />
      <Spacing />
      <Dropdown
        size="sm"
        items={[
          { label: "Account settings" },
          { label: "Support" },
          { label: "License" },
          { label: "Sign out" },
        ]}
      />
      <Spacing />
      <Dropdown size="md" outline items={[{ label: "Any" }]} />
      <Spacing />
      <Dropdown size="lg" items={[{ label: "Any" }]} />
      <Input name="account" size="sm" placeholder="Category type" />
      <Spacing />
      <Input name="account" size="sm" placeholder="Hello world" />
      <Spacing />
      <Input name="account" size="sm" placeholder="Hello world" />
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm">
          Add Record
        </Button>
      </div>
    </Form>
  );
};
