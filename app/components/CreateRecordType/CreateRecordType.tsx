import { TagColor } from "@prisma/client";
import { Form, useLocation } from "@remix-run/react";
import { RecordTypeObjectSchema } from "~/generated/schemas";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { CreateRecordTypeProps } from "./types";

export const CreateRecordType: React.FC<CreateRecordTypeProps> = () => {
  const location = useLocation();
  const validator = useFormValidator(
    RecordTypeObjectSchema.omit({ id: true, createdAt: true, updatedAt: true })
  );
  const fields = validator.fields;

  const categories = [
    {
      id: TagColor.BLUE,
      label: TagColor.BLUE,
      value: TagColor.BLUE,
    },
    {
      id: TagColor.GREEN,
      label: TagColor.GREEN,
      value: TagColor.GREEN,
    },
  ];

  return (
    <Form
      method="post"
      action={`/records/add?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-100 bg-white px-6 py-4"
      onInput={validator.validate}
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">
        Create Record Type
      </h4>
      <Spacing />
      <Input size="sm" placeholder="Name" {...fields.name} />
      <Spacing />
      <Textarea size="sm" placeholder="Description" {...fields.description} />
      <Spacing />
      <Select
        label="Tag"
        options={categories}
        defaultValue={TagColor.GREEN}
        size="sm"
        {...fields.tag}
      />
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm" disabled={validator.isInvalid}>
          Create Type
        </Button>
      </div>
    </Form>
  );
};
