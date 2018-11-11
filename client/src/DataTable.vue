<template>
  <table class="data-table">
    <thead>
      <tr>
        <th
            v-for="column of columns"
            :key="column.field"
            :style="{width: column.width}">
          {{ column.caption }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!rows.length">
        <td
            class="data-table__empty-message"
            :colspan="columns.length">
          {{ emptyMessage }}
        </td>
      </tr>
      <tr
          v-else
          v-for="row of rows"
          :key="row[primaryKey]">
        <td
            v-for="column of columns"
            :key="column.field"
            :style="{width: column.width}">
          {{ row[column.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    primaryKey: {
      type: String,
      required: true
    },
    emptyMessage: {
      type: String,
      default: 'Нет данных'
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.data-table {
  width: 100%;
  border-spacing: 0 5px;
}

.data-table th {
  padding: 5px;
  border-bottom: 1px solid #000;
}

.data-table td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

td.data-table__empty-message {
  padding: 15px;
  text-align: center;
  color: #bbb;
  border-bottom: none;
}
</style>
