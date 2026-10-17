
<template>
    <div>
        <div v-for="model in templateModel">
            <div v-if="model.type === 'dictionary' as TemplateType">
                <TemplateDictionary 
                    :templateModel="model"
                    :templateData="props.templateData"
                    :templateConfiguration="props.templateConfiguration"
                    @updateDataValue="()=>emit('updateDataValue')"
                    >
                </TemplateDictionary>
            </div>
            <div v-else-if="model.type === 'list' as TemplateType">
                <TemplateList
                    :key="refreshList"
                    :keyList="model.key"
                    :templateModel="model"
                    :templateData="props.templateData[model.key]"
                    :templateConfiguration="props.templateConfiguration"
                    @addElementList="addElementList"
                    @updateDataValue="()=>emit('updateDataValue')"
                    @deleteElementList="deleteElementList"
                    >
                </TemplateList>
            </div>
            <div v-else-if="model.type === 'enum' as TemplateType">
                <TemplateEnum
                    :key="refreshList"
                    :keyList="model.key"
                    :templateModel="model"
                    :templateData="props.templateData[model.key]"
                    @addElementEnum="addElementEnum"
                    @updateDataValue="()=>emit('updateDataValue')"
                    @deleteElementEnum="deleteElementEnum"
                    >
                </TemplateEnum>
            </div>
            <div v-else>
                <TemplatePrimitive
                    :keyPrimitive="model.key"
                    :typePrimitive="model.type"
                    :templateModel="model"
                    :templateData="props.templateData"
                    @updateDataValue="()=>emit('updateDataValue')"
                    >
                </TemplatePrimitive>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import type {TemplateModel, TemplateType} from '@/types/template'
    import { ref } from 'vue'

    import TemplateDictionary from './TemplateDictionary.vue'
    import TemplateList from './TemplateList.vue'
    import TemplateEnum from './TemplateEnum.vue'
    import TemplatePrimitive from './TemplatePrimitive.vue'

    const props = defineProps<{
        templateModel : TemplateModel[], 
        templateData: any,
        templateConfiguration: Record<string, TemplateModel[]>,
    }>()

    const refreshList = ref(0)

    const emit = defineEmits(['updateDataValue'])

    const addElementList = (keyList: string, newElement: any) =>{
        props.templateData[keyList] ??= []
        props.templateData[keyList].push(newElement)
        refreshList.value++
    }

    const deleteElementList = (keyList: string, el: any) => {
        if(!Array.isArray(props.templateData[keyList])){

        }else{
                const index = props.templateData[keyList].indexOf(el)
                if(index >= 0){
                    props.templateData[keyList].splice(index, 1)
                    refreshList.value++
                }
        }
    }

    const addElementEnum = (keyList: string) =>{
        props.templateData[keyList] ??= []
        props.templateData[keyList].push("")
        refreshList.value++
    }

    const deleteElementEnum = (keyList: string, index: number) => {
        if(!Array.isArray(props.templateData[keyList])){

        }else{
                props.templateData[keyList].splice(index,1)
                refreshList.value++
        }
    }
</script>


