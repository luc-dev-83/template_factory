<template>
    <div class="tree-node">
        <div class="title-template">
            <div class="title-label">
                {{ props.templateModel.key }}
            </div>
            <div  class="title-buton">
                <v-btn-group>
                    <v-btn 
                        density="compact"
                        @click="addElementList">
                        <v-icon size="small" left>mdi-plus</v-icon>
                    </v-btn>
                </v-btn-group>
            </div>
        </div>
    
        <div v-if="props.templateModel.children" class="children-template">
            <div v-for="(data, index) in props.templateData" :key="index">
                <div class="bloc-template">
                    <v-btn-group>
                        <v-btn 
                            density="compact"
                            @click="toggleChild(Number(index))">
                            <v-icon size="small">
                                {{ collapsedChildren[Number(index)] ? 'mdi-chevron-right' : 'mdi-chevron-down' }}
                            </v-icon>
                        </v-btn>
                        <v-btn 
                            density="compact"
                            @click="deleteElementList(data)">
                            <v-icon size="small" left>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </v-btn-group>
                    <TemplateFactory
                        v-show="!collapsedChildren[Number(index)]"
                        :templateModel="props.templateModel.children"
                        :templateData="data"
                        :templateConfiguration="props.templateConfiguration"
                        @updateDataValue="()=>emit('updateDataValue')"
                    />
                </div>  
            </div>
        </div>  
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type {TemplateModel} from '@/types/template'
    import resolver from '@/services/TemplateResolver'
    import TemplateFactory from '@/components/impl/TemplateFactory.vue'
    
    const emit = defineEmits(['addElementList', 'updateDataValue', 'deleteElementList'])

    const props = defineProps<{
        templateModel : TemplateModel, 
        templateData: any,
        templateConfiguration: Record<string, TemplateModel[]>,
        keyList:string
    }>()

    const getChildren = (
    model: TemplateModel,
    configuration: Record<string, TemplateModel[]>) => 
        ( model.childrenReferenceId
            ? configuration[model.childrenReferenceId] || model.children
            : model.children )
        || []

    const addElementList = ()=> {
        if(props.templateModel.childrenReferenceId){
            const children = props.templateConfiguration[props.templateModel.childrenReferenceId]
            if(Array.isArray(children)){
                props.templateModel.children = children
                emit('addElementList', props.keyList, resolver.buidData(children))
                return
            }
        } 
        if(props.templateModel.children){
            emit('addElementList', props.keyList, resolver.buidData(props.templateModel.children))  
        }
    }

    const deleteElementList = (data: any)=> {
        emit('deleteElementList', props.keyList, data)
    }

    const collapsedChildren = ref<Record<number, boolean>>({})

    const toggleChild = (index: number) => collapsedChildren.value[index] = !collapsedChildren.value[index]

</script>
