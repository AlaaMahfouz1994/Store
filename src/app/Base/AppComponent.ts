import { Component, Renderer2 } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'app-root',
    template: `
  
    <div dir="{{'dir'| translate}}" class="body white">
				<router-outlet></router-outlet>
			</div>
	`
})
export class AppComponent {
    constructor(
        Router: Router,
        private Renderer2: Renderer2,
        private PlatformLocation: PlatformLocation,
    ) { }

    ngOnInit() { }
}