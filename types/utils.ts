

export type ModifyType<Original, New> = Omit<Original, keyof New> & New
