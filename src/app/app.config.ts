import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AdminPreloadingStrategy } from './core/preload-strategies/custom';
import { LoaderService } from './core/loader/loader.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
        withComponentInputBinding(),
        withPreloading(AdminPreloadingStrategy),
        withDebugTracing()
    ),
    provideHttpClient(),
    provideAppInitializer(() => {
      const loaderService = inject(LoaderService)
      loaderService.initialize()
    })
  ]
};
