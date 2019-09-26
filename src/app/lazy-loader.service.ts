import {
  Compiler,
  Injectable,
  Injector,
  NgModuleFactory,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  constructor(private compiler: Compiler, private injector: Injector) {}

  loadModule(path: any) {
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then(elementModuleOrFactory => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then(moduleFactory => {
        try {
          const elementModuleRef = moduleFactory.create(this.injector);
          const moduleInstance = elementModuleRef.instance;

          // do something with the module...
        } catch (err) {
          throw err;
        }
      });
  }
}
