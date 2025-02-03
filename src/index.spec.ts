// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable eqeqeq */
import { describe, expect, it } from 'vitest';
import EnumFactory, { EnumKeysType } from './index.mts';

const Enum1 = EnumFactory.create('enum1', {
  Foo: 'bar',
  Number: 12,
} as const);

const Enum2 = EnumFactory.create('enum2', {
  Foo: 'bar',
} as const);

const ExtendedEnum2 = Enum2.cloneAndExtend('child-enum', {
  Number: 12,
} as const);

describe('Functionality', () => {
  it('should be equal with primitives on non-strict comparison and not equal in other cases', () => {
    expect(Enum1.Foo === Enum2.Foo).toBe(false);
    expect(Enum1.Foo == Enum2.Foo).toBe(false);
    expect(Enum1.Foo === 'bar').toBe(false);
    expect(Enum1.Foo == 'bar').toBe(true);
    expect(Enum1.Foo === Enum1.fromValue('bar')).toBe(true);
    expect(ExtendedEnum2.Number.valueOf() === 12).toBe(true);
  });

  it('should expose enum name', () => {
    expect(Enum1.name).toStrictEqual('enum1');
    expect(Enum2.name).toStrictEqual('enum2');
    expect(ExtendedEnum2.name).toStrictEqual('child-enum');
  });

  it('should return primitive value from valueOf()', () => {
    expect(Enum1.Foo.valueOf()).toStrictEqual('bar');
    expect(Enum1.Number.valueOf()).toStrictEqual(12);
  });

  it('should return string from toString()', () => {
    expect(Enum1.Foo.toString()).toStrictEqual('bar');
    expect(Enum1.Number.toString()).toStrictEqual('12');
  });

  it('should return enum instance or undefined for unknown value after fromValue()', () => {
    expect(Enum1.fromValue('bar')).toStrictEqual(Enum1.Foo);
    // @ts-expect-error as it should be tested
    expect(Enum1.fromValue('unknown')).toBeUndefined();
  });

  it('should return array with all enum values from values()', () => {
    expect(Enum1.values()).toStrictEqual([Enum1.Foo, Enum1.Number]);
  });

  it('should throw error on creating enum with the same name or calling enum constructor', () => {
    const enumName = 'duplicate-error';
    const Enum = EnumFactory.create(enumName, {});

    expect(() => EnumFactory.create('duplicate-error', {})).toThrowError(`An enum with the name "${enumName}" has already been created.`);
    // @ts-expect-error as it declared as non-constructable, but it's actually a class
    expect(() => new Enum()).toThrowError(`Creating class enum instances is not permitted. If you want to get an enum member by value, you should use the "fromValue" method.`);
  });

  it('should throw an error if some value were duplicated', () => {
    expect(() => {
      EnumFactory.create('value-duplicates-error', {
        Foo: 'bar',
        Bar: 'bar',
      });
    }).toThrowError(`Enum values must be uniq. Found duplicated value "bar" in enum "value-duplicates-error" for key "Bar"`);
  });

  it('should be compatible with Object values, keys and entries methods', () => {
    expect(Object.values(Enum1)).toStrictEqual(Enum1.values());
    expect(Object.keys(Enum1)).toStrictEqual(Enum1.keys());
    expect(Object.entries(Enum1)).toStrictEqual(Enum1.entries());

    expect(Object.values(ExtendedEnum2)).toStrictEqual(ExtendedEnum2.values());
    expect(Object.keys(ExtendedEnum2)).toStrictEqual(ExtendedEnum2.keys());
    expect(Object.entries(ExtendedEnum2)).toStrictEqual(ExtendedEnum2.entries());
  });

  it('should inherit parent values', () => {
    expect(ExtendedEnum2.Foo).toBeDefined();
    expect(ExtendedEnum2.Foo.valueOf() === 'bar').toBe(true);

    expect(ExtendedEnum2.fromValue('bar')).toBeDefined();
    expect(ExtendedEnum2.fromValue('bar')).toStrictEqual(ExtendedEnum2.Foo);

    expect(ExtendedEnum2.keys()).toStrictEqual(['Foo', 'Number']);
    expect(ExtendedEnum2.values()).toStrictEqual([Enum2.Foo, ExtendedEnum2.Number]);
    expect(ExtendedEnum2.values()).toStrictEqual([ExtendedEnum2.Foo, ExtendedEnum2.Number]);
    expect(ExtendedEnum2.entries()).toStrictEqual([['Foo', ExtendedEnum2.Foo], ['Number', ExtendedEnum2.Number]]);
  });

  it('should be equal with parent enum ', () => {
    expect(Enum2.Foo === ExtendedEnum2.Foo).toBe(true);
    expect(Enum1.Number === ExtendedEnum2.Number).toBe(false);
  });

  it('should be serializable', () => {
    const source = {
      foo: Enum1.Foo,
      number: Enum1.Number,
    };
    const res = {
      foo: Enum1.Foo.valueOf(),
      number: Enum1.Number.valueOf(),
    };

    expect(JSON.stringify(source)).toStrictEqual(JSON.stringify(res));
    expect(JSON.parse(JSON.stringify(source))).toStrictEqual(res);
  });

  it('should be able to use enum in types as index signature', () => {
    const enumObj: { [key in EnumKeysType<typeof Enum1>]?: string } = {
      [Enum1.Foo]: 'foo',
      [Enum1.Number]: 'number',
    };
    expect(enumObj).toStrictEqual({
      bar: 'foo',
      12: 'number',
    });
  });

  it('should throw an error if "name" key was used for enum defining enum member', () => {
    expect(() => {
      EnumFactory.create('SomeEnum', {
        name: 'Forbidden enum member',
      });
    }).toThrowError('Property "name" conflicts with built-in property of ClassEnum');
  });
});
