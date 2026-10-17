<template>
    <div>
        <v-container class="container">
            <TemplateFactory
                :templateModel="templateModel.template"
                :templateData="templateData"
                :templateConfiguration="templateConfiguration"
                @updateDataValue="updateDataValue"
            />
        </v-container>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

import TemplateFactory from '@/components/impl/TemplateFactory.vue'
import resolver from '../services/TemplateResolver'

/**************************/
/**       INSERT         **/
/**        MODEL         **/
/**         OR           **/
/**      METAMODEL       **/
/**************************/
import example from '../examples/MetaModel'
const templateModel = ref(example.META_MODEL)

//import example from '../examples/Models'
//const templateModel = ref(example.MODEL1)
/**************************/
/**                      **/
/**         END          **/
/**                      **/
/**************************/

const templateData = ref(resolver.buidData(templateModel.value.template))
const templateConfiguration = ref(resolver.builConfiguration(templateModel.value.template))

const updateDataValue = ()=>{
    // console.log(templateData.value)
}
/*
validateModel(model)
validateData(model, data)
cleanupData(model, data)
buildOutput(model, data)
*/

/*
    Model
    type : string, number boolean, select, dictionary, list, enum

    Valide Model 
        key required all type
        type required all type

        validation per type
    string              champs ignoé : children, ... ca rejoint les catégories        
    number
    booelan
    select              range(Array) si default dans range
    dictionary          children(array) OU referenceId(string)
    list                children(array) OU referenceId(string)
    enum     
     
    Valide Data
    Si required: 1 valeur significative
        attention number=0 est une vameur, boolean=false est une valeur
    
    Nettoyage: 1 non requis et pas de valeur significative, 
    ne pas mettre dans le dictionnaire de sortie

*/

</script>

<style scoped>

</style>
