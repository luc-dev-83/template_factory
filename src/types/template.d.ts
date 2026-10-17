export type TemplateType =
| 'dictionary'
| 'list'
| 'enum'
| 'string'
| 'number'
| 'boolean'
| 'select'

export interface TemplateModel {
key: string
type: TemplateType
required?: boolean
default?: string
category?: string[]
range?: string[]
children?: TemplateModel[]
referenceId?: string
childrenReferenceId?: string
}

export interface FlatModel {
    index: number,
    level: number,
    path: string,
    type: string,
    



}