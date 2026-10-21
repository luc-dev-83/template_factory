import type {  TemplateModel, Validator, ValidationIssue } from '@/types/template'
import { ValidationCode } from '../enums/ValidationIssue.ts'

const types: Record<string, Validator> = {
    'key': (value:any)=>typeof value === 'string' && value.length > 0,
    'type': (value:any)=>typeof value === 'string' && value.length > 0,
    'required': (value:any)=>typeof value === 'boolean',
    'default': (_:any)=>true,
    'range': (value:any)=>Array.isArray(value) && value.length > 0 && value.every(v => typeof v === 'string'),
    'children': (value:any)=>Array.isArray(value) && value.length > 0,
    'referenceId': (value:any)=>typeof value === 'string' && value.length > 0,
    'childrenReferenceId': (value:any)=>typeof value === 'string' && value.length > 0
}

const valideType = {
    'string' : [{'required': ['key', 'type'], 'allowed': ['key', 'type', 'required', 'default']}],
    'number' : [{'required': ['key', 'type'], 'allowed': ['key', 'type', 'required', 'default']}],
    'boolean' : [{'required': ['key', 'type'], 'allowed': ['key', 'type', 'required', 'default']}],
    'select' : [{'required': ['key', 'type'], 'allowed': ['key', 'type', 'required', 'default', 'range']}],
    'dictionary' : [{'required': ['key', 'type', 'children'], 'allowed': ['key', 'type', 'referenceId', 'children', 'required']},
                    {'required': ['key', 'type', 'referenceId'], 'allowed': ['key', 'type', 'referenceId', 'required']},
                    {'required': ['key', 'type', 'childrenReferenceId'], 'allowed': ['key', 'type', 'childrenReferenceId', 'required']}],
    'list' : [{'required': ['key', 'type', 'children'], 'allowed': ['key', 'type', 'referenceId', 'children', 'required']},
                    {'required': ['key', 'type', 'children', 'referenceId'], 'allowed': ['key', 'type', 'children', 'referenceId', 'required']},
                    {'required': ['key', 'type', 'childrenReferenceId'], 'allowed': ['key', 'type', 'childrenReferenceId', 'required']}],
    'enum' : [{'required': ['key', 'type'], 'allowed': ['key', 'type', 'required', 'default', 'range']}]
}

const validateModel = (
    model: TemplateModel, 
    path: string
): ValidationIssue[] => {
    const issues: ValidationIssue[] = []

    const fullPath = path 
        ? `${path}.${model.key}` 
        : model.key
    if(!model.type){
        issues.push({
            level: 'ERROR',
            code: ValidationCode.TYPE_MISSING,
            message: 'type missing',
            path: fullPath,
            model
        })
        return issues
    } 

    const rules = valideType[model.type]
    const keySet = new Set(Object.keys(model))

    const matchedRule = rules.find(rule => 
        rule.required.every(key => keySet.has(key))
    )

    if (!matchedRule){
        issues.push({
            level: 'ERROR',
            code: ValidationCode.MISSING_REQUIRED_KEY,
            message: 'missing required key',
            path: fullPath,
            metaModel: rules,
            model
        })
    }else {
    
        const unknownKeys = [...keySet].filter(
            key => !matchedRule?.allowed.includes(key)
        )

        for (const key of unknownKeys) {
                issues.push({
                    level: 'WARNING',
                    code: ValidationCode.UNKNOWN_PROPERTY,
                    message: `unknown property ${key}`,
                    path: fullPath,
                    key,
                    model
                })
            }
            for (const [key, value] of Object.entries(model)) {
                const expectedType = types[key]
                if (!expectedType) {
                    continue
                }
                if (!expectedType(value)) {
                    issues.push({
                        level: 'ERROR',
                        code: ValidationCode.INVALID_PROPERTY_TYPE,
                        message: `invalid type for property ${key}`,
                        path: fullPath,
                        key,
                        model
                    })
                }
            }
    }
    return issues
}

const validateModels = (model: TemplateModel[], path: string = '') => {
    const issues: ValidationIssue[] = []
    model.forEach(m=>{
        issues.push(...validateModel(m, path))
        if(m.children){
            const pathLocal = path 
                ? `${path}.${m.key}`
                : m.key
            issues.push(...validateModels(m.children, pathLocal))
        }
    })
    return issues
}

export default {validateModels }