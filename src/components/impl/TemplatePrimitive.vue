<template>
    <div class="tree-node">
        <div class="title-template">
            <div class="title-label">
                {{ props.keyPrimitive }}
            </div>
            <div class="title-buton">
                <div v-if="props.typePrimitive === 'string'">
                    <v-text-field 
                        v-model="props.templateData[props.keyPrimitive]"
                        @input="()=>emit('updateDataValue')"
                        density="compact"
                        hide-details
                    >
                    </v-text-field>
                </div>
                <div v-else-if="props.typePrimitive === 'number'">
                    <v-text-field 
                        v-model="props.templateData[props.keyPrimitive]"
                        @input="()=>emit('updateDataValue')"
                        density="compact"
                        hide-details
                        type="number"
                    >
                    </v-text-field>
                </div>
                <div v-else-if="props.typePrimitive === 'boolean'">
                    <v-checkbox
                        v-model="props.templateData[props.keyPrimitive]"
                        @input="()=>emit('updateDataValue')"
                        density="compact"
                        hide-details
                    >
                    </v-checkbox>
                </div>
                <div v-else-if="props.typePrimitive === 'select'">
                    <v-select
                        :items="props.templateModel.range"
                        v-model="props.templateData[props.keyPrimitive]"
                        @input="()=>emit('updateDataValue')"
                        density="compact"
                        hide-details
                    >
                    </v-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import type {TemplateModel} from '@/types/template'

const props = defineProps<{
        templateData: any,
        keyPrimitive: string,
        typePrimitive: string,
        templateModel: TemplateModel
    }>()

const emit = defineEmits(['updateDataValue'])
</script>
