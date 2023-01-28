import type {
  Account,
  Currency,
  RecordCategory,
  RecordType,
} from "@prisma/client";
import { Form, useFetcher, useLocation } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Route } from "~/routes.enum";
import { CreateRecordObjectSchema } from "~/schemas/record.schema";
import { Button } from "~/ui/Button";
import { CurrencyInput } from "~/ui/CurrencyInput.tsx";
import { Link } from "~/ui/Link";
import { Select } from "~/ui/Select";
import { Shimmer } from "~/ui/Shimmer";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { AddRecordProps } from "./types";

export const AddRecord = ({ account: defaultAccount }: AddRecordProps) => {
  const location = useLocation();
  const [recordTypeId, setRecordTypeId] = useState<string>();
  const [account, setAccount] = useState<Account & { Currency: Currency }>();
  const accountsFetcher = useFetcher<{
    data?: (Account & { Currency: Currency })[];
  }>();
  const recordTypesFetcher = useFetcher<{
    data?: (RecordType & { RecordCategory: RecordCategory[] })[];
  }>();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const validator = useFormValidator(CreateRecordObjectSchema);
  const fields = validator.fields;

  useEffect(() => {
    if (!defaultAccount && accountsFetcher.type === "init")
      accountsFetcher.load(`${Route.ACCOUNTS}?index`);
    if (recordTypesFetcher.type === "init")
      recordTypesFetcher.load(`${Route.RECORD_TYPE}?index`);
  }, [defaultAccount, accountsFetcher, recordTypesFetcher]);

  const accounts = useMemo(
    () =>
      (accountsFetcher.data?.data ?? []).map(({ id, name, number }) => ({
        value: id,
        label: `${name} (${number})`,
      })),
    [accountsFetcher.data]
  );

  const recordTypes = useMemo(
    () =>
      (recordTypesFetcher.data?.data ?? []).map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    [recordTypesFetcher.data]
  );

  const recordCategories = useMemo(() => {
    const recordType = (recordTypesFetcher.data?.data ?? []).find(
      (type) => type.id === recordTypeId
    );
    const categories = (recordType?.RecordCategory ?? []).map(
      ({ id, name }) => ({
        value: id,
        label: name,
      })
    );
    return categories;
  }, [recordTypesFetcher.data?.data, recordTypeId]);

  const handleAccountChange = useCallback(
    ({ value }: any) => {
      const accounts = accountsFetcher.data?.data ?? [];
      setAccount(accounts.find((a) => a.id === value) as any);
    },
    [accountsFetcher.data?.data]
  );

  const handleRecordTypeChange = useCallback(({ value }: any) => {
    setRecordTypeId(value);
  }, []);

  return (
    <Form
      method="post"
      action={`${Route.ADD_RECORD}?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-200 bg-white px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Add Record</h4>
      <Spacing />
      {defaultAccount && (
        <div className="flex h-8 items-center justify-between text-sm">
          <input type="hidden" name="accountId" value={defaultAccount.id} />
          <span>{defaultAccount.name}</span>{" "}
          <span className="text-gray-500">({defaultAccount.number})</span>
        </div>
      )}
      {!defaultAccount &&
        (accountsFetcher.state === "loading" ? (
          <Shimmer />
        ) : (
          <Select
            size="sm"
            options={accounts}
            onSelect={handleAccountChange}
            {...fields.accountId}
          />
        ))}
      <Spacing />
      {recordTypesFetcher.state === "loading" ? (
        <>
          <Shimmer />
          <Spacing />
          <Shimmer />
        </>
      ) : (
        <>
          <Select
            size="sm"
            options={recordTypes}
            onSelect={handleRecordTypeChange}
            {...fields.recordTypeId}
          />
          <Spacing />
          <Select
            size="sm"
            options={recordCategories}
            {...fields.recordCategoryId}
          />
        </>
      )}
      <Spacing />
      <div className="grid grid-cols-3 items-center gap-2">
        <Link
          as="a"
          underline
          className="text-xs"
          onClick={() => setShowNoteInput((b) => !b)}
        >
          Add note
        </Link>
        <div className="col-span-2">
          <CurrencyInput
            size="sm"
            code={(defaultAccount ?? account)?.Currency?.code}
            currencyProps={fields.currencyCode}
            {...fields.amount}
          />
        </div>
      </div>
      {showNoteInput && (
        <>
          <Spacing />
          <Textarea
            size="sm"
            placeholder="Put a note in here."
            {...fields.note}
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
