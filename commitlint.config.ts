import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [RuleConfigSeverity.Disabled],
    'type-enum': [RuleConfigSeverity.Error, 'always', [
      'feat',
      'fix',
      'perf',
      'ui',
      'docs',
      'refactor',
      'style',
      'test',
      'ops',
      'chore',
      'deprecate',
      'revert',
    ]],
    'body-max-line-length': [RuleConfigSeverity.Disabled],
    'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
  },
  ignores: [
    (message: string) => message.includes('[skip ci]') || message.replace(/\n/g, '') === 'Init',
  ],
} satisfies UserConfig;
