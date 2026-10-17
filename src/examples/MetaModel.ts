import type {TemplateModel } from "@/types/template"

const META_MODEL = {
    'template':[
        {'key':'name', 'type':'string', 'required': true},        
        {'key':'model', 'type':'list', 'required': true, 'referenceId': 'REF_001', 'children': [
            {'key':'key', 'type':'string', 'required': true},
            {
                'key':'type', 
                'type':'select', 
                'range': ['dictionary'
                    ,'list','enum','string','number', 'boolean','select'],
                'required': true,
                'default': 'string'
            },
            {'key':'required', 'type':'boolean', 'required': false},
            {'key':'category', 'type':'enum', 'required': false},
            {'key':'range', 'type':'enum', 'required': false},
            {'key':'children', 'type':'list', 'childrenReferenceId' : 'REF_001', 'required': false},
            {'key':'referenceId', 'type':'string', 'required': false},
            {'key':'childrenReferenceId', 'type':'string', 'required': false}
        ]}
    ]
} as {template: TemplateModel[]}

export default { META_MODEL }