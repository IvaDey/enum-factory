import {
  assertType,
  describe,
  expectTypeOf,
  it,
} from 'vitest';
import EnumFactory, { EnumType } from './index';

const StringEnum = EnumFactory.create('string-enum', { Foo: 'bar' });
type StringEnum = EnumType<typeof StringEnum>;
const NumberEnum = EnumFactory.create('number-enum', { Foo: 12 });
type NumberEnum = EnumType<typeof NumberEnum>;
const MixedEnum = EnumFactory.create('mixed-enum', { Foo: 'bar', Bar: 12 });
type MixedEnum = EnumType<typeof MixedEnum>;
const ChildEnum = StringEnum.cloneAndExtend('child-enum', { Child: 'child' });
type ChildEnum = EnumType<typeof ChildEnum>;

describe('Type definitions', () => {
  it('should have correct type definitions for EnumFactory', () => {
    expectTypeOf(EnumFactory).toHaveProperty('create');
    expectTypeOf(EnumFactory.create).toBeCallableWith('', {});

    expectTypeOf(StringEnum).toHaveProperty('cloneAndExtend');
    expectTypeOf(StringEnum.cloneAndExtend).toBeCallableWith('', {});
  });

  it('should have different correct types', () => {
    type MustBeNever = EnumType<typeof StringEnum.Foo>;

    expectTypeOf<StringEnum>().not.toMatchTypeOf<never>();
    expectTypeOf<NumberEnum>().not.toMatchTypeOf<never>();
    expectTypeOf<MixedEnum>().not.toMatchTypeOf<never>();
    expectTypeOf<ChildEnum>().not.toMatchTypeOf<never>();
    expectTypeOf<MustBeNever>().toMatchTypeOf<never>();

    assertType<StringEnum>(StringEnum.Foo);
    assertType<ChildEnum>(StringEnum.Foo);
    assertType<ChildEnum>(ChildEnum.Foo);
    assertType<ChildEnum>(ChildEnum.Child);
    assertType<MixedEnum>(MixedEnum.Foo);

    expectTypeOf(StringEnum.Foo).toMatchTypeOf<typeof StringEnum.Foo>();
    expectTypeOf(ChildEnum.Foo).not.toMatchTypeOf<typeof StringEnum.Foo>();
    expectTypeOf(StringEnum.Foo).toMatchTypeOf<typeof ChildEnum.Foo>();
    expectTypeOf(ChildEnum.Child).toMatchTypeOf<typeof ChildEnum.Child>();
    expectTypeOf(StringEnum.Foo).not.toMatchTypeOf(MixedEnum.Foo);
  });

  it('should have correct type definitions for created enums', () => {
    expectTypeOf(StringEnum).toHaveProperty('fromValue').toBeFunction();
    expectTypeOf(StringEnum).toHaveProperty('values').toBeFunction();
    expectTypeOf(StringEnum).toHaveProperty('keys').toBeFunction();
    expectTypeOf(StringEnum).toHaveProperty('entries').toBeFunction();

    expectTypeOf(StringEnum.fromValue).toBeCallableWith('');
    expectTypeOf(NumberEnum.fromValue).toBeCallableWith(12);
    expectTypeOf(MixedEnum.fromValue).toBeCallableWith('');
    expectTypeOf(MixedEnum.fromValue).toBeCallableWith(12);

    expectTypeOf(StringEnum.Foo).toBeObject();
    expectTypeOf(NumberEnum.Foo).toBeObject();
    expectTypeOf(MixedEnum.Foo).toBeObject();
    expectTypeOf(MixedEnum.Bar).toBeObject();
    expectTypeOf(ChildEnum.Foo).toBeObject();
    expectTypeOf(ChildEnum.Child).toBeObject();

    assertType<string[]>(StringEnum.values().map((v) => v.valueOf()));
    assertType<number[]>(NumberEnum.values().map((v) => v.valueOf()));
    assertType<(string | number)[]>(MixedEnum.values().map((v) => v.valueOf()));

    assertType<string>(StringEnum.Foo.valueOf());
    assertType<number>(NumberEnum.Foo.valueOf());
    assertType<string>(MixedEnum.Foo.valueOf());
    assertType<number>(MixedEnum.Bar.valueOf());
    assertType<string>(ChildEnum.Foo.valueOf());
    assertType<string>(ChildEnum.Child.valueOf());
  });

  it('should have correct types after calling fromValue()', () => {
    const fromValue = StringEnum.fromValue('bar');

    expectTypeOf(fromValue).toBeObject();
    expectTypeOf(fromValue).toHaveProperty('valueOf');
    expectTypeOf(fromValue).toHaveProperty('toString');
    expectTypeOf(fromValue).toHaveProperty('toJSON');
  });

  it('should return correct type for values, keys and entries methods', () => {
    assertType<StringEnum[]>(StringEnum.values());
    assertType<NumberEnum[]>(NumberEnum.values());
    assertType<MixedEnum[]>(MixedEnum.values());
    assertType<ChildEnum[]>(ChildEnum.values());

    assertType<Array<'Foo'>>(StringEnum.keys());
    assertType<Array<'Foo'>>(NumberEnum.keys());
    assertType<Array<'Foo' | 'Bar'>>(MixedEnum.keys());
    assertType<Array<'Foo' | 'Child'>>(ChildEnum.keys());

    assertType<Array<['Foo', StringEnum]>>(StringEnum.entries());
    assertType<Array<['Foo', NumberEnum]>>(NumberEnum.entries());
    assertType<Array<['Foo' | 'Bar', MixedEnum]>>(MixedEnum.entries());
    assertType<Array<['Foo' | 'Child', ChildEnum]>>(ChildEnum.entries());

    expectTypeOf(StringEnum.keys()).not.toMatchTypeOf<Array<'foo'>>();
  });
});
