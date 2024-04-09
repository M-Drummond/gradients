import { notificationVisible, lastCopied } from '@/App.vue'

export function copy(x: string) {
  console.log(x)
  navigator.clipboard.writeText(x)
  notificationVisible.value = true
  lastCopied.value = x
  setTimeout(() => {
    notificationVisible.value = false
  }, 1500)
}
