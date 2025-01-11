// eslint-disable-next-line max-classes-per-file
export default class EnumFactory {
  private static usedNames: string[] = [];

  static create<
    TDefinition extends EnumDefinition,
    TEnumName extends string,
    TKeys extends keyof TDefinition = keyof TDefinition
  >(name: TEnumName, definition: TDefinition): ClassEnum<TDefinition, TKeys, TEnumName> {
    if (this.usedNames.includes(name)) throw new Error(`An enum with the name "${name}" has already been created.`);

    const enumSymbol = Symbol(name);
    let inited = false;
    const values = new Map();

    class Enum <TValue, TName extends string> {
      readonly #value: TValue;

      constructor(value: TValue) {
        if (inited) throw new Error(`Creating class enum instances is not permitted. If you want to get an enum member by value, you should use the "fromValue" method.`);
        this.#value = value;
      }

      valueOf(): TValue { return this.#value; }

      toString() { return String(this.#value); }

      toJSON() { return this.valueOf(); }

      static fromValue<TValueType extends TDefinition[TKeys]>(value: TValueType): Enum<TValueType, TEnumName> {
        return values.get(value) as never;
      }

      static values(): Array<Enum<TDefinition[TKeys], TEnumName>> {
        return [...values.values()] as never;
      }

      static keys(): TKeys[] {
        return Object.keys(definition) as TKeys[];
      }

      static entries(): Array<[TKeys, Enum<TDefinition[TKeys], TEnumName>]> {
        return Object.entries(definition).map(([key, value]) => [key, values.get(value)]) as never[];
      }

      static cloneAndExtend<
        TExtraDefinition extends EnumDefinition,
        TNewEnumName extends string,
        TExtraKeys extends keyof TExtraDefinition = keyof TExtraDefinition
      >(childName: string, childDefinition: EnumDefinition) {
        return EnumFactory.create(
          childName,
          { ...Object.fromEntries(this.entries()), ...childDefinition } as EnumDefinition,
        ) as ClassEnum<TExtraDefinition & TDefinition, TExtraKeys & TKeys, TNewEnumName | TEnumName>;
      }

      readonly [enumSymbol]: TName = name as never;
    }

    Object.entries(definition).forEach(([key, value]) => {
      if (values.has(value)) throw new Error(`Enum values must be uniq. Found duplicated value "${value}" in enum "${name}" for key "${key}"`);

      const enumMember = ['string', 'number'].includes(typeof value)
        ? new Enum(value)
        : value; // for case with inheritance to apply values from parent

      values.set(value.valueOf(), enumMember);
      Enum[key as never] = enumMember as never;
    });

    inited = true;
    this.usedNames.push(name);

    return Enum as never;
  }

  // todo: helpers to determine if given value an enum or not and to extract enum and restore from value
}

type ClassEnum<
  TDefinition extends EnumDefinition,
  TKeys extends keyof TDefinition,
  TEnumName extends string
> = EnumMembers<TDefinition, TKeys, TEnumName> & ClassEnumMethods<TDefinition, TKeys, TEnumName>

type ClassEnumMethods<
  TDefinition extends EnumDefinition,
  TKeys extends keyof TDefinition,
  TEnumName extends string
> = {
  fromValue<TValueType extends TDefinition[TKeys]>(value: TValueType): ClassEnumMember<TValueType, TEnumName>;
  values(): Array<ClassEnumMember<TDefinition[TKeys], TEnumName>>;
  keys(): TKeys[];
  entries(): Array<[TKeys, ClassEnumMember<TDefinition[TKeys], TEnumName>]>;
  cloneAndExtend<
    TExtraDefinition extends EnumDefinition,
    TNewEnumName extends string,
    TExtraKeys extends keyof TExtraDefinition
  >(
    name: TNewEnumName,
    definition: TExtraDefinition
  ): ClassEnum<TExtraDefinition & TDefinition, TExtraKeys | TKeys, TNewEnumName | TEnumName>;
}

type EnumMembers<TDefinition extends EnumDefinition, TKeys extends keyof TDefinition, TEnumName extends string> = {
  [key in TKeys]: ClassEnumMember<TDefinition[key], TEnumName>;
}

interface ClassEnumMember<TValueType, TEnumName> {
  valueOf(): TValueType;
  toJSON(): TValueType;
  toString(): string;

  [__enumSymbol: symbol]: TEnumName;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EnumType<TClassEnum> = TClassEnum extends ClassEnum<any, any, any>
  ? ReturnType<TClassEnum['values']>[number]
  : never;

type EnumDefinition = {
  [key: string]: string | number;
};
