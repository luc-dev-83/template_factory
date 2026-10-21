import type { TemplateModel } from '../types/template'

const MODEL1 = {
    'template':[
        {'key':'classe', 'type':'string', 'required': true},
        {'key':'eleve', 'type':'list', 'required': true, 'children': [
            {'key':'nom', 'type':'string', 'required': true},
            {'key':'age', 'default': 25, 'required': true},
            {'key':'masculin', 'type':'boolean', 'required': true},
            {'key':'adresse', 'type':'dictionary', 'required': false, 'children':[
                {'key':'rue', 'type':'string', 'required': true},
                {'key':'ville', 'type':'string', 'required': true}
            ]},
            {'key':'mail', 'type':'enum', 'default':['luc-dev@site.fr'], 'required': true}
        ]}
    ]
} as {template: TemplateModel[]}

const MODEL2 = {
    'template':[
        {'key':'classe', 'type':'string', 'required': true},
        {'key':'student', 'type':'list', 'required': true, 'referenceId': 'REF_001', 'children': [
            {'key':'name', 'type':'string', 'required': true},
            {'key':'age', 'type':'number', 'default': 25, 'required': true},
            {'key':'man', 'type':'boolean', 'required': true},
            {'key':'address', 'type':'dictionary', 'required': false},
            {'key':'email', 'type':'enum', 'default':['luc-dev@site.fr'], 'required': true}
        ]},
        {'key':'teacher', 'type':'list', 'required': true, 'childrenReferenceId': 'REF_001'},
        {'key':'parent', 'type':'list', 'required': true, 'children': [
            {'key':'name', 'type':'string', 'required': true, 'next': 48},
            {'key':'age', 'type':'number', 'default': '25', 'required': true},
            {'key':'man', 'type':'boolean', 'required': true},
            {'key':'address', 'type':'dictionary', 'required': false, 'childrenReferenceId': 'REF_002'},
            {'key':'email', 'type':'enum', 'default':['luc-dev@site.fr'], 'required': true}
        ]}
    ]
} as {template: TemplateModel[]}

export default { MODEL1, MODEL2 }