import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    let goToRoute: string | undefined = route.routeConfig?.path;

    if (authService.isUserLogged) {
        if (goToRoute === 'login' || goToRoute === 'register') {
            router.navigate(['/menu']);
        }

        return true;
    } else {
        router.navigate(['/login']);

        return false;
    }
}