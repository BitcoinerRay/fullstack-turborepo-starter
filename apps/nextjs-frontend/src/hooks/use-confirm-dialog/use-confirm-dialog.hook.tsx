'use client';

import {useContext} from 'react';
import {useTranslations} from 'next-intl';
import {ConfirmContext, type ConfirmOptions} from '@/providers/confirm/confirm.provider';

export type ConfirmDialogOptions = ConfirmOptions & {
  accept?: () => void;
  reject?: () => void;
};

export const useConfirmDialog = (): {confirmDialog: (props?: ConfirmDialogOptions) => Promise<boolean>} => {
  const t = useTranslations('components.confirmDialog');
  const confirm = useContext(ConfirmContext);

  const confirmDialogWithDefaults = async (props?: ConfirmDialogOptions): Promise<boolean> => {
    // Merge with default translations
    const options: ConfirmOptions = {
      header: props?.header ?? t('header'),
      message: props?.message ?? t('message'),
      acceptLabel: props?.acceptLabel ?? t('buttons.accept'),
      rejectLabel: props?.rejectLabel ?? t('buttons.reject'),
      defaultFocus: props?.defaultFocus ?? 'accept',
    };

    const result = await confirm(options);

    // Call legacy accept/reject callbacks if provided
    if (result && props?.accept) {
      props.accept();
    } else if (!result && props?.reject) {
      props.reject();
    }

    return result;
  };

  return {confirmDialog: confirmDialogWithDefaults};
};
