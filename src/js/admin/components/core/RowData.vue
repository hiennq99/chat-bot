<template>
  <div>
    <b-table
      show-empty
      hover
      responsive="md"
      :items="items"
      :fields="fields"
      :busy="loading"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: `${field.width}px` }"
        />
      </template>
      <template v-for="field in fields" v-slot:[`cell(${field.key})`]="data">
        <slot :name="`cell(${field.key})`" v-bind="data">
          {{ data.value }}
        </slot>
      </template>
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    fields: Array,
    loading: Boolean,
  },
};
</script>
