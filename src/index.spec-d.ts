import {
  assertType,
  describe,
  expectTypeOf,
  it,
} from 'vitest';
import EnumFactory, { EnumKeysType, EnumType } from './index';

const StringEnum = EnumFactory.create('string-enum', { Foo: 'bar' } as const);
type StringEnum = EnumType<typeof StringEnum>;

const NumberEnum = EnumFactory.create('number-enum', { Foo: 12 } as const);
type NumberEnum = EnumType<typeof NumberEnum>;

const MixedEnum = EnumFactory.create('mixed-enum', { Foo: 'bar', Bar: 12 } as const);
type MixedEnum = EnumType<typeof MixedEnum>;

const ChildEnum = StringEnum.cloneAndExtend('child-enum', { Child: 'child' } as const);
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

    // @ts-expect-error as it a test case
    expectTypeOf(StringEnum.fromValue).toBeCallableWith('');
    expectTypeOf(StringEnum.fromValue).toBeCallableWith('bar');
    expectTypeOf(NumberEnum.fromValue).toBeCallableWith(12);
    expectTypeOf(MixedEnum.fromValue).toBeCallableWith('bar');
    expectTypeOf(MixedEnum.fromValue).toBeCallableWith(12);
    // @ts-expect-error as it a test case
    expectTypeOf(MixedEnum.fromValue).toBeCallableWith(1);

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

  it('should be able to use enum in types as index signature', () => {
    type SKeysSignature = EnumKeysType<typeof StringEnum>;
    type NKeysSignature = EnumKeysType<typeof NumberEnum>;
    type CKeysSignature = EnumKeysType<typeof ChildEnum>;

    expectTypeOf<SKeysSignature>().toMatchTypeOf<'bar'>();
    expectTypeOf<NKeysSignature>().toMatchTypeOf<12>();
    expectTypeOf<CKeysSignature>().toMatchTypeOf<'bar' | 'child'>();
    expectTypeOf<CKeysSignature>().not.toMatchTypeOf<'foo'>();
    expectTypeOf<NKeysSignature>().not.toMatchTypeOf<1>();

    // expectTypeOf({ bar: '', child: '' }).toMatchTypeOf<{ [key in CKeysSignature]: string; }>();
    // expectTypeOf({ 12: '' }).toMatchTypeOf<{ [key in NKeysSignature]: string; }>();
    // expectTypeOf({ bar: '' }).toMatchTypeOf<{ [key in CKeysSignature]?: string; }>();
    // expectTypeOf({ bar: '' }).not.toMatchTypeOf<{ [key in CKeysSignature]: string; }>();
    // expectTypeOf<{ [key in CKeysSignature]?: string; }>().not.toMatchTypeOf({ bar: '', child: '', Bar: '' });
  });
});
