export const emailLibrary = {
  'password-reset': {
    defaultSubject: 'Password Reset',
    props: {} as { url: string },
  },
} as const;

export type EmailId = keyof typeof emailLibrary;

export type EmailFromId<E extends EmailId> = (typeof emailLibrary)[E];

export type EmailPropsFromId<I extends EmailId> =
  (typeof emailLibrary)[I]['props'];
