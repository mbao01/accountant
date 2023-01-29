import { Form, useLocation } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import { useForm } from "~/hooks/useForm/useForm";
import { Route } from "~/routes.enum";
import type { loader as accountLoader } from "~/routes/accounts/index";
import { CreateTransferObjectSchema } from "~/schemas/record.schema";
import { Button } from "~/ui/Button";
import { CurrencyInput } from "~/ui/CurrencyInput.tsx";
import { Link } from "~/ui/Link";
import { Select } from "~/ui/Select";
import { Shimmer } from "~/ui/Shimmer";
import { Spacing } from "~/ui/Spacing";
import { Textarea } from "~/ui/Textarea";
import type { AccountTransferProps } from "./types";

export const AccountTransfer = ({ fromAccount }: AccountTransferProps) => {
  const location = useLocation();
  const accountsFetcher = useTypedFetcher<typeof accountLoader>();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const form = useForm(
    CreateTransferObjectSchema.omit({
      senderId: true,
      currencyCode: true,
      exchangeRate: true,
    }),
    `${Route.ACCOUNT_TRANSFER}?redirect=${location.pathname}`
  );
  const fields = form.fields;

  useEffect(() => {
    if (accountsFetcher.type === "init")
      accountsFetcher.load(`${Route.ACCOUNTS}?index`);
  }, [accountsFetcher]);

  const accounts = useMemo(
    () =>
      (accountsFetcher.data?.data ?? []).filter(
        (account) => account.id !== fromAccount.id
      ),
    [accountsFetcher.data?.data, fromAccount]
  );

  const accountOptions = useMemo(
    () =>
      accounts.map(({ id, name, number }) => ({
        value: id,
        label: `${name} (${number})`,
      })),
    [accounts]
  );

  return (
    <Form
      method="post"
      ref={form.formRef}
      action={form.action}
      className="w-64 rounded-lg border border-gray-200 bg-white px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Transfer</h4>
      <Spacing />
      <div className="flex h-8 items-center justify-between text-sm">
        <input type="hidden" value={fromAccount.id} name="senderId" />
        <span>{fromAccount.name}</span>{" "}
        <span className="text-gray-500">({fromAccount.number})</span>
      </div>
      <Spacing />
      {accountsFetcher.state === "loading" || accountOptions?.length < 1 ? (
        <Shimmer />
      ) : (
        <Select
          size="sm"
          label="Recipient"
          options={accountOptions}
          {...fields.recipientId}
        />
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
            code={fromAccount?.Currency.code}
            currencyProps={{ name: "currencyCode", errors: [] }}
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
        <Button
          type="submit"
          size="sm"
          loading={form.isSubmitting}
          disabled={form.isSubmitting || form.isInvalid}
        >
          Transfer
        </Button>
      </div>
    </Form>
  );
};
