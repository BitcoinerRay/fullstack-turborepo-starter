'use client';

import {type JSX, useTransition} from 'react';
import {type Locale, useLocale, useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import {Languages} from 'lucide-react';
import {usePathname, useRouter} from '@/i18n/navigation.ts';
import {routing} from '@/i18n/routing.ts';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';

export function LocaleSelect(): JSX.Element {
  const t = useTranslations('components.footer.localeSelect');

  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  const router = useRouter();

  const params = useParams();

  const onLocaleChange = (value: string): void => {
    const nextLocale = value as Locale; // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion -- Select value is string; router.replace expects Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale},
      );
    });
  };

  return (
    <Select disabled={isPending} value={locale} onValueChange={onLocaleChange}>
      <SelectTrigger className="w-[180px]">
        <Languages className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((localeOption) => (
          <SelectItem key={localeOption} value={localeOption}>
            {t(`languages.${localeOption}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
