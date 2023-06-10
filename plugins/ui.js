import Vue from 'vue'
import UiButton from '../components/ui/ui-button/ui-button.vue'
import UiOperation from '../components/ui/ui-button/ui-operation.vue'
import UiModal from '../components/ui/ui-modal/ui-modal.vue'

const components = {
  UiButton,
  UiOperation,
  UiModal,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
