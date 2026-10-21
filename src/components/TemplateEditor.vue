<template>
    <div>
        <div v-if="modelErrors.length > 0">
            <ListProblems :modelErrors="modelErrors" >

            </ListProblems>
        </div>

        <div v-else>
            <v-container class="container">
                <TemplateFactory
                    :templateModel="props.templateModel"
                    :templateData="templateData"
                    :templateConfiguration="templateConfiguration"
                    @updateDataValue="updateDataValue"
                />
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue'
import type {TemplateModel, ValidationIssue} from '@/types/template'
import TemplateFactory from '@/components/impl/TemplateFactory.vue'
import ListProblems from './ListProblems.vue'
import resolver from '../services/TemplateResolver'
import validate from '../services/TemplateValidate'

const props = defineProps<{
        templateModel : TemplateModel[]
    }>()

const templateData = ref(<Record<string, any>>{})
const templateConfiguration = ref(<Record<string, TemplateModel[]>>{})
const modelErrors = ref(<ValidationIssue[]>[])

const loop = ref(0)

const initRef = (model: TemplateModel[]) => {
    if(loop.value === 0){
        modelErrors.value = validate.validateModels(model)
        if(modelErrors.value.length === 0)
            loop.value += 1
        else
            return
    }
    templateConfiguration.value = resolver.builConfiguration(model)
    resolver.buidChildrenDictionary(model, templateConfiguration.value)
    
    templateData.value=resolver.buidData(model)
}

const updateDataValue = ()=>{
    // console.log(templateData.value)
}

watch(props.templateModel, 
    ()=> initRef(props.templateModel), 
    { immediate: true ,deep: true })

</script>

