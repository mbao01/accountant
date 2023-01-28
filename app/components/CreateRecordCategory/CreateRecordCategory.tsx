import { Form, useLocation } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import { useTypedFetcher } from "remix-typedjson";
import { useForm } from "~/hooks/useForm/useForm";
import { Route } from "~/routes.enum";
import type { loader as recordTypeLoader } from "~/routes/records/type";
import { CreateRecordCategoryObjectSchema } from "~/schemas/record.schema";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Shimmer } from "~/ui/Shimmer";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { CreateRecordCategoryProps } from "./types";

export const CreateRecordCategory: React.FC<CreateRecordCategoryProps> = () => {
  const location = useLocation();
  const recordTypesFetcher = useTypedFetcher<typeof recordTypeLoader>();
  const form = useForm(
    CreateRecordCategoryObjectSchema,
    `${Route.RECORD_CATEGORY}/add?redirect=${location.pathname}`
  );
  const fields = form.fields;

  useEffect(() => {
    if (recordTypesFetcher.type === "init")
      recordTypesFetcher.load(`${Route.RECORD_TYPE}?index`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recordTypes = useMemo(
    () =>
      (recordTypesFetcher.data?.data ?? []).map(({ id, name }) => ({
        id,
        label: name,
        value: id,
      })),
    [recordTypesFetcher.data]
  );

  return (
    <Form
      method="post"
      ref={form.formRef}
      action={form.action}
      className="w-64 rounded-lg border border-gray-200 bg-white px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">
        Create Record Category
      </h4>
      <Spacing />
      <Input size="sm" placeholder="Name" {...fields.name} />
      <Spacing />
      <Textarea size="sm" placeholder="Description" {...fields.description} />
      <Spacing />
      {recordTypesFetcher.state === "loading" ? (
        <Shimmer spacing="6" />
      ) : (
        <Select
          size="sm"
          label="Record type"
          options={recordTypes}
          {...fields.recordTypeId}
        />
      )}
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button
          type="submit"
          size="sm"
          loading={form.isSubmitting}
          disabled={form.isSubmitting || form.isInvalid}
        >
          Create Category
        </Button>
      </div>
    </Form>
  );
};
