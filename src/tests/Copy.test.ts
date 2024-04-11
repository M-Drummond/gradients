import { expect, test, vi } from 'vitest'

import { copy } from '@/utils/Copy'

import { notificationVisible, lastCopied } from '@/App.vue'

test('Copy paste function is executable ', () => {
  expect(lastCopied.value).not.null
  expect(notificationVisible.value).not.null
})
