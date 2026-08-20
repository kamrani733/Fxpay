<script setup lang="ts">
import { cn } from '~/lib/utils';
import type { ClassValue } from 'clsx';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: ClassValue;
  }>(),
  {
    class: '',
  },
);
</script>

<template>
  <select
    v-bind="$attrs"
    :class="
      cn(
        'min-h-10 w-full min-w-0 border-2 border-[#172033] bg-[#fbfdff] px-2.5 text-[#172033] outline-none',
        props.class,
      )
    "
  >
    <slot />
  </select>
</template>
