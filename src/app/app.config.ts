import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding, withDebugTracing, withPreloading, withViewTransitions } from '@angular/router';

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
        withDebugTracing(),
        withViewTransitions({
          // onViewTransitionCreated: ({ transition }) => {
          //   const router = inject(Router)
          //   const targetUrl = router.currentNavigation()?.finalUrl

          //   transition.skipTransition()
          // }
        })
    ),
    provideHttpClient(),
    provideAppInitializer(() => {
      const loaderService = inject(LoaderService)
      loaderService.initialize()
    })
  ]
};
