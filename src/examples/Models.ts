import type { TemplateModel } from '../types/template'

const MODEL1 = {
    'template':[
        {'key':'classe', 'type':'string', 'required': true},
        {'key':'eleve', 'type':'list', 'required': true, 'children': [
            {'key':'nom', 'type':'string', 'required': true},
            {'key':'age', 'type':'number', 'default': 25, 'required': true},
            {'key':'masculin', 'type':'boolean', 'required': true},
            {'key':'adresse', 'type':'dictionary', 'required': false, 'children':[
                {'key':'rue', 'type':'string', 'required': true},
                {'key':'ville', 'type':'string', 'required': true}
            ]},
            {'key':'mail', 'type':'enum', 'default':['luc-dev@site.fr'], 'required': true}
        ]}
    ]
} as {template: TemplateModel[]}

export default { MODEL1 }