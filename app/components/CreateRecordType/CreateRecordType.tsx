import { Form, useLocation } from "@remix-run/react";
import { TAG_COLOR_OPTIONS } from "~/helpers/tag";
import { useForm } from "~/hooks/useForm/useForm";
import { Route } from "~/routes.enum";
import { CreateRecordTypeObjectSchema } from "~/schemas/record.schema";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Tag } from "~/ui/Tag";
import { Textarea } from "~/ui/Textarea";
import type { CreateRecordTypeProps } from "./types";

export const CreateRecordType: React.FC<CreateRecordTypeProps> = () => {
  const location = useLocation();
  const form = useForm(
    CreateRecordTypeObjectSchema,
    `${Route.RECORD_TYPE}/add?redirect=${location.pathname}`
  );
  const fields = form.fields;

  return (
    <Form
      method="post"
      ref={form.formRef}
      action={form.action}
      className="w-64 rounded-lg border border-gray-200 bg-white px-6 py-4"
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
        size="sm"
        label="Tag"
        options={TAG_COLOR_OPTIONS.map((option) => ({
          ...option,
          label: <Tag name={option.value} size="sm" full />,
        }))}
        defaultValue={TAG_COLOR_OPTIONS[0].value}
        {...fields.tag}
      />
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button
          size="sm"
          type="submit"
          loading={form.isSubmitting}
          disabled={form.isSubmitting || form.isInvalid}
        >
          Create Type
        </Button>
      </div>
    </Form>
  );
};
