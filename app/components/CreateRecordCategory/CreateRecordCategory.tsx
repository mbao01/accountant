import { Form, useFetcher, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { RecordCategoryObjectSchema } from "~/generated/schemas";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { CreateRecordCategoryProps } from "./types";

export const CreateRecordCategory: React.FC<CreateRecordCategoryProps> = () => {
  const location = useLocation();
  const fetcher = useFetcher();
  const validator = useFormValidator(
    RecordCategoryObjectSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
  );
  const fields = validator.fields;

  useEffect(() => {
    fetcher.load("/records/type?index");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recordTypes = (fetcher.data?.data ?? []).map(({ id, name }: any) => ({
    id,
    label: name,
    value: id,
  }));

  return (
    <Form
      method="post"
      action={`/records/add?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-100 bg-white px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">
        Create Record Category
      </h4>
      <Spacing />
      <Input size="sm" placeholder="Name" {...fields.name} />
      <Spacing />
      <Textarea size="sm" placeholder="Description" {...fields.description} />
      <Spacing />
      <Select
        size="sm"
        label="Record type"
        options={recordTypes}
        {...fields.recordTypeId}
      />
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm" disabled={validator.isInvalid}>
          Create Category
        </Button>
      </div>
    </Form>
  );
};
