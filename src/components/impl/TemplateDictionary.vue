<template>
    <div class="tree-node">
       <div class="title-template">
            <div class="title-label">
                {{ props.templateModel.key }}
            </div>
        </div>

        <div v-if="props.templateModel.children" class="children-template">
            <div class="bloc-template">
                <TemplateFactory
                    :templateModel="props.templateModel.children"
                    :templateData="props.templateData[props.templateModel.key]"
                    :templateConfiguration="props.templateConfiguration"
                    @updateDataValue="()=>emit('updateDataValue')"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type {TemplateModel} from '@/types/template'
    import TemplateFactory from '@/components/impl/TemplateFactory.vue'
    
    const props = defineProps<{
        templateModel: TemplateModel, 
        templateData: any,
        templateConfiguration: Record<string, TemplateModel[]>,
    }>()

    const emit = defineEmits(['updateDataValue'])
</script>
