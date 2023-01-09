import { Form, useLocation } from "@remix-run/react";
import { useState } from "react";
import { RecordObjectSchema } from "~/generated/schemas";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Autocomplete } from "~/ui/Autocomplete";
import { Button } from "~/ui/Button";
import { CurrencyInput } from "~/ui/CurrencyInput.tsx";
import { CurrencyCode } from "~/ui/CurrencyInput.tsx/types";
import { Link } from "~/ui/Link";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { AddRecordProps } from "./types";

export const AddRecord = ({ account }: AddRecordProps) => {
  const location = useLocation();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const validator = useFormValidator(
    RecordObjectSchema.omit({ id: true, createdAt: true, updatedAt: true })
  );
  const fields = validator.fields;

  const accounts = [
    {
      id: "monzo",
      label: "Monzo UK",
    },
    {
      id: "barclays",
      label: "Barclays",
    },
    {
      id: "gtb-naira",
      label: "GTB Naira",
    },
    {
      id: "gtb-dollar",
      label: "GTB Dollar",
    },
    {
      id: "gtb-dollar-card",
      label: "GTB Dollar Card",
    },
    {
      id: "access-naira",
      label: "Access Naira",
    },
    {
      id: "access-dollar",
      label: "Access Dollar",
    },
  ];

  const categories = [
    {
      id: "income",
      label: "Income",
    },
    {
      id: "expense",
      label: "Expense",
    },
    {
      id: "miscellaneous",
      label: "Miscellaneous",
    },
  ];

  return (
    <Form
      method="post"
      action={`/records/add?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-100 px-6 py-4"
      onInput={validator.validate}
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Add Record</h4>
      <Spacing />
      {!account && (
        <Select
          size="sm"
          options={accounts}
          name={fields.accountId.name}
          isInvalid={fields.accountId.isInvalid}
        />
      )}
      <Spacing />
      <Autocomplete
        size="sm"
        options={categories}
        name={fields.recordTypeId.name}
        isInvalid={fields.recordTypeId.isInvalid}
      />
      <Spacing />
      <Select
        size="sm"
        options={categories}
        name={fields.recordCategoryId.name}
        isInvalid={fields.recordCategoryId.isInvalid}
      />
      <Spacing />
      <div className="grid grid-cols-3 items-center gap-2">
        <Link
          underline
          className="text-xs"
          onClick={() => setShowNoteInput((b) => !b)}
        >
          Add note
        </Link>
        <div className="col-span-2">
          <CurrencyInput
            size="sm"
            name={fields.amount.name}
            currencyCode={CurrencyCode.NGN}
            isInvalid={fields.amount.isInvalid}
          />
        </div>
      </div>
      {showNoteInput && (
        <>
          <Spacing />
          <Textarea
            name="note"
            size="sm"
            placeholder="Put a note in here."
            isInvalid={fields.note.isInvalid}
          />
        </>
      )}
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm" disabled={validator.isInvalid}>
          Add Record
        </Button>
      </div>
    </Form>
  );
};
