let oldArrayProtoMethods = Array.prototype

export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods=[
    'push',
    'unshift',
    'splice',
    'shift',
    'reverse',
    'pop',
    'sort'
]

methods.forEach(method=>{
   
    arrayMethods[method] = function(...args){
        const result = oldArrayProtoMethods[method].apply(this,args)
        const ob = this.__ob__
        let inserted
        switch(method){
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.splice(2)
            default:
                break
        }
        if(inserted) ob.observeArray(inserted)
        ob.dep.notify()

        return result
    }
})