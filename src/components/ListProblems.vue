<template>
  <v-table >
    <thead>
      <tr>
        <th>
          Level
        </th>
        <th >
          Code
        </th>
        <th >
          Key
        </th>
        <th >
          Path
        </th>
        <th >
          Message
        </th>
        <th >
          Model
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.modelErrors"
        :key="item.path"
      >
        <td>{{ item.level }}</td>
        <td>{{ item.code }}</td>
        <td>{{ item.key }}</td>
        <td>{{ item.path }}</td>
        <td>{{ item.message }}</td>
        <td>{{ item.model }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">

import type {ValidationIssue} from '@/types/template'

const props = defineProps<{
        modelErrors : ValidationIssue[]
    }>()


</script>
