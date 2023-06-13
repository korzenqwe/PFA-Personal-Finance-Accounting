<template>
  <div style="border-radius: 29px" :style="`${isLoading ? 'cursor: not-allowed;' : '' } ${isFixed ? 'width: fit-content' : 'width: 100%'}`">
    <button
      type="button"
      class="btn"
      :class="[ className, { disabled: !canSubmit || isLoading, loading: isLoading, active: isActive }]"
      :disabled="!canSubmit || isLoading"
      @click.prevent="$emit('click')"
    >
      <slot v-if="!isLoading" />
      <div
        v-else
        class="preloader"
      >
        <div class="loader" />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    canSubmit: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
button:disabled.loading {
  pointer-events: none;
  background-color: var(--color-text);
}

.preloader {
  position: relative;
  /* top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333;
  z-index: 99999; */
}

.loader {
  border: 2px solid #fff;
  border-top: 2px solid #D8755D;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -10px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
