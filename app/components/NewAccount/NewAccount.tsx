import { Form, useLocation } from "@remix-run/react";
import { TAG_PATTERN_OPTIONS } from "~/helpers/tag";
import { useFormValidator } from "~/hooks/useFormValidator/useFormValidator";
import { CreateAccountObjectSchema } from "~/schemas/account";
import { Button } from "~/ui/Button";
import { CurrencyInput } from "~/ui/CurrencyInput.tsx";
import { Input } from "~/ui/Input";
import { Select } from "~/ui/Select";
import { Spacing } from "~/ui/Spacing";
import { Tag } from "~/ui/Tag";

export const NewAccount = () => {
  const location = useLocation();
  const validator = useFormValidator(CreateAccountObjectSchema);
  const fields = validator.fields;

  return (
    <Form
      method="post"
      action={`/accounts/new?redirect=${location.pathname}`}
      className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-6 py-4"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">New Account</h4>
      <Spacing />
      <div className="grid grid-cols-2 gap-4">
        <Input size="sm" label="Account name" {...fields.name} />
        <Input
          size="sm"
          label="Account number"
          inputMode="numeric"
          {...fields.number}
        />
      </div>
      <Spacing />
      <div className="grid grid-cols-2 gap-4">
        <Input
          size="sm"
          label="Sort code"
          inputMode="numeric"
          {...fields.sortCode}
        />
        <CurrencyInput
          size="sm"
          label="Starting balance"
          {...fields.startingBalance}
          currencyProps={fields.currencyId}
        />
      </div>
      <Spacing />
      <div className="grid grid-cols-2 gap-4">
        <Select
          size="sm"
          label="Tag"
          options={TAG_PATTERN_OPTIONS.map((option) => ({
            ...option,
            label: <Tag name={option.value} size="sm" full />,
          }))}
          defaultValue={TAG_PATTERN_OPTIONS[0].value}
          {...fields.tag}
        />
      </div>
      <Spacing as="hr" vertical="5" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Bank name" size="sm" {...fields.bankName} />
        <Input label="Bank address" size="sm" {...fields.bankAddress} />
      </div>
      <Spacing />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Bank country" size="sm" {...fields.bankCountry} />
      </div>
      <Spacing vertical="4" />
      <div className="flex justify-center">
        <Button type="submit" size="sm" disabled={validator.isInvalid}>
          Create Account
        </Button>
      </div>
    </Form>
  );
};
