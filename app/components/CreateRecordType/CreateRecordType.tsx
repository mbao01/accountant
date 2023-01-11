import { Form, useLocation } from "@remix-run/react";
import { RecordTypeObjectSchema } from "~/generated/schemas";
import { TAG_COLOR_OPTIONS } from "~/helpers/tag";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Tag } from "~/ui/Tag";
import { Textarea } from "~/ui/Textarea";
import type { CreateRecordTypeProps } from "./types";

export const CreateRecordType: React.FC<CreateRecordTypeProps> = () => {
  const location = useLocation();
  const validator = useFormValidator(
    RecordTypeObjectSchema.omit({ id: true, createdAt: true, updatedAt: true })
  );
  const fields = validator.fields;

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
        options={TAG_COLOR_OPTIONS.map((option) => ({
          ...option,
          label: <Tag name={option.value} full />,
        }))}
        defaultValue={TAG_COLOR_OPTIONS[0].value}
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
