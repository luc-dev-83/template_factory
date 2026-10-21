<template>
    <TemplateEditor :templateModel="templateModel"/>
</template>

<script setup lang="ts">
import TemplateEditor from './components/TemplateEditor.vue'
import { ref } from 'vue'

/**************************/
/**       INSERT         **/
/**        MODEL         **/
/**         OR           **/
/**      METAMODEL       **/
/**************************/
//import example from './examples/MetaModel'
import example from './examples/Models'
//import example from './examples/ModelProblems.ts'
const templateModel = ref(example.MODEL1.template)
/**************************/
/**                      **/
/**         END          **/
/**                      **/
/**************************/
</script>
