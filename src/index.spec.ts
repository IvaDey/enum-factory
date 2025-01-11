// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable eqeqeq */
import { describe, expect, it } from 'vitest';
import EnumFactory from './index';

const Enum1 = EnumFactory.create('enum1', {
  Foo: 'bar',
  Number: 12,
});

const Enum2 = EnumFactory.create('enum2', {
  Foo: 'bar',
});

const Enum3 = Enum2.cloneAndExtend('child-enum', {
  Number: 12,
});

describe('Functionality', () => {
  it('should be equal with primitives on non-strict comparison and not equal in other cases', () => {
    expect(Enum1.Foo === Enum2.Foo).toBe(false);
    expect(Enum1.Foo == Enum2.Foo).toBe(false);
    expect(Enum1.Foo === 'bar').toBe(false);
    expect(Enum1.Foo == 'bar').toBe(true);
    expect(Enum1.Foo === Enum1.fromValue('bar')).toBe(true);
    expect(Enum3.Number.valueOf() === 12).toBe(true);
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
  });

  it('should inherit parent values', () => {
    expect(Enum3.Foo).toBeDefined();
    expect(Enum3.Foo.valueOf() === 'bar').toBe(true);

    expect(Enum3.fromValue('bar')).toBeDefined();
    expect(Enum3.fromValue('bar')).toStrictEqual(Enum3.Foo);
  });

  it('should be equal with parent enum ', () => {
    expect(Enum2.Foo === Enum3.Foo).toBe(true);
    expect(Enum1.Number === Enum3.Number).toBe(false);
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
});
