<script setup lang="ts">
import { cn } from '~/lib/utils';
import type { ClassValue } from 'clsx';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'outline';
    class?: ClassValue;
  }>(),
  {
    variant: 'default',
    class: '',
  },
);

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#172033] px-3 font-extrabold text-[#172033] disabled:opacity-65';
</script>

<template>
  <button
    v-bind="$attrs"
    :class="
      cn(
        base,
        props.variant === 'default' ? 'bg-[#f6c453]' : 'bg-[#fbfdff]',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>
