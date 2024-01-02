declare global {
  type OptionalObject<T> = T | undefined;
  type OptionalNumber = OptionalObject<number>;
  type OptionalString = OptionalObject<string>;
  type OptionalBoolean = OptionalObject<boolean>;

  type NullableObject<T> = T | null;
  type NullableNumber = NullableObject<number>;
  type NullableString = NullableObject<string>;
  type NullableBoolean = NullableObject<boolean>;

  type Arrayable<T> = T | T[];
}

export {};