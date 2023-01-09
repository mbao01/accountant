import { TagPattern } from "@prisma/client";
import { Form, useLocation } from "@remix-run/react";
import { AccountObjectSchema } from "~/generated/schemas";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { Button } from "~/ui/Button";
import { CurrencyInput } from "~/ui/CurrencyInput.tsx";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";

export const NewAccount = () => {
  const location = useLocation();
  const validator = useFormValidator(
    AccountObjectSchema.omit({ id: true, createdAt: true, updatedAt: true })
  );
  const fields = validator.fields;

  const categories = [
    {
      id: TagPattern.DOTTED,
      label: TagPattern.DOTTED,
    },
    {
      id: TagPattern.CIRCLES,
      label: TagPattern.CIRCLES,
    },
  ];

  return (
    <Form
      method="post"
      action={`/accounts/new?redirect=${location.pathname}`}
      className="w-64 rounded-lg border border-gray-100 px-6 py-4"
      onInput={validator.validate}
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">New Account</h4>
      <Spacing />
      <Input size="sm" label="Account name" {...fields.name} />
      <Spacing />
      <Input size="sm" label="Account number" {...fields.number} />
      <Spacing />
      <Input size="sm" label="Sort code" {...fields.sortCode} />
      <Spacing />
      <CurrencyInput
        size="sm"
        label="Starting balance"
        {...fields.startingBalance}
        currencyProps={fields.currencyId}
      />
      <Spacing />
      <Select label="Tag" options={categories} size="sm" {...fields.tag} />
      <Spacing />
      <Input label="Bank name" size="sm" {...fields.bankName} />
      <Spacing />
      <Input label="Bank address" size="sm" {...fields.bankAddress} />
      <Spacing />
      <Input label="Bank country" size="sm" {...fields.bankCountry} />
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm" disabled={validator.isInvalid}>
          Create Account
        </Button>
      </div>
    </Form>
  );
};
