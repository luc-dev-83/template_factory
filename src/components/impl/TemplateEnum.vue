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
                        @click="addElementEnum">
                        <v-icon size="small" left>mdi-plus</v-icon>
                    </v-btn>
                </v-btn-group>
            </div>
        </div>
        <div v-if="props.templateData.length > 0" class="children-template">
            <div v-for="(_, key) in props.templateData" :key="key">
                <div class="enum-template">
                    <div class="enum-label">
                        <v-text-field 
                            v-model="props.templateData[key]"
                            @input="()=>emit('updateDataValue')"
                            density="compact"
                            hide-details
                        >
                        </v-text-field>
                    </div>
                    <div  class="enum-buton">
                        <v-btn 
                            @click="deleteElementEnum(key)">
                            <v-icon size="small" left>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script setup lang="ts">
    import type {TemplateModel} from '@/types/template'
    
    const emit = defineEmits(['addElementEnum', 'updateDataValue', 'deleteElementEnum'])

    const props = defineProps<{ 
        keyList:string,
        templateModel: TemplateModel,
        templateData: any
    }>()

    const addElementEnum = ()=> {
       emit('addElementEnum', props.keyList)  
    }

    const deleteElementEnum = (key : string | number)=> {
        emit('deleteElementEnum', props.keyList, key)  
    }

</script>
