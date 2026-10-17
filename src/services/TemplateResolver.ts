import  type { TemplateModel, TemplateType } from '@/types/template'

const guetterDefaultValue  = {
    'boolean': (template: TemplateModel) => template.default ?? false,
    'dictionary': (template: TemplateModel) => template.children
        ? buidData(template.children)
        : <TemplateModel[]>{},
    'enum': (template: TemplateModel) => template.default
        ? [...template.default] 
        : [],
    'list':  ( _: TemplateModel) => [],  
    'number': (template: TemplateModel) => template.default ?? 0,
    'select': (template: TemplateModel) => template.default 
        ? template.default 
        : (
            template.range
            ?  template.range[0]
            : null
        ),
    'string': (template: TemplateModel) => template.default ?? ""
} 

const buidData = (data: TemplateModel[] ) => {
    const build : Record<string, any> = {}
    for(const template of data){
        build[template.key] = guetterDefaultValue[template.type as TemplateType](template)
    }
    return build
}

const builConfiguration = (model: TemplateModel[])=> {
    let configuration : Record<string, TemplateModel[]> = {}
    model.forEach(m=>{
        
        if(m.referenceId && m.children){
            if(configuration[m.referenceId])
                return configuration
            configuration[m.referenceId] = m.children
        }
        if(m.children){
            const configurationChildren = builConfiguration(m.children)
            configuration = {...configuration, ...configurationChildren}
            
        }
    })
    return configuration
}

export default { buidData, builConfiguration }