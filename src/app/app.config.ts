import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AdminPreloadingStrategy } from './core/preload-strategies/custom';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
        withComponentInputBinding(),
        withPreloading(AdminPreloadingStrategy),
        withDebugTracing()
    ),
    provideHttpClient()
  ]
};
