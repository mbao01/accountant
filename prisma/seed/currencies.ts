import { CurrencyCode, type PrismaClient } from "@prisma/client";

export const CURRENCIES = [
  CurrencyCode.NGN,
  CurrencyCode.USD,
  CurrencyCode.GBP,
  CurrencyCode.EUR,
  CurrencyCode.RUB,
  CurrencyCode.CNY,
];

export default async function seedCurrency(prisma: PrismaClient) {
  await Promise.all(
    CURRENCIES.map((code) =>
      prisma.currency.create({
        data: { code: code, sign: code },
      })
    )
  ).catch(() => {
    // no worries if it doesn't insert
  });

    const data = await prisma.currency.findMany();

    const isSuccessful = CURRENCIES.every((code) =>
      data.find((d) => d.code === code && d.sign === code)
    );

  console.log(
    isSuccessful
      ? `- Currencies has been seeded. 🌱`
      : `- 🚨 failed to seed currencies.`
  );
}
