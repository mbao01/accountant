import { Form, useLocation } from "@remix-run/react";
import { Button } from "~/ui/Button";
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
      <h4 className="my-0 text-lg font-bold">Add Record</h4>
      <Spacing size="2" />
      <Input name="account" size="sm" placeholder="Account" />
      <Spacing />
      <Input name="account" size="sm" placeholder="Category type" />
      <Spacing />
      <Input name="account" size="sm" placeholder="Hello world" />
      <Spacing />
      <Input name="account" size="sm" placeholder="Hello world" />
      <Spacing size="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm">
          Add Record
        </Button>
      </div>
    </Form>
  );
};
