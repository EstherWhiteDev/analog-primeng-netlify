import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
	afterRender,
	AfterRenderPhase,
	Inject,
	inject,
	Injectable,
	PLATFORM_ID,
} from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	doc = inject(DOCUMENT);
	activeTheme = "dark";

	constructor(@Inject(PLATFORM_ID) private platformId: any) {
		afterRender(
			() => {
				let themeLink = this.doc.createElement("link");
				themeLink.id = "app-theme";
				themeLink.rel = "stylesheet";
				themeLink.href = "/src/dark.scss";
        this.doc.head.appendChild(themeLink);
			},
			{ phase: AfterRenderPhase.Write }
		);
	}

	getTheme() {
		return this.activeTheme;
	}

	setTheme(): void {
		let themeLink = this.doc.getElementById("app-theme") as HTMLLinkElement;
		if (themeLink) {
			if (this.prefersLightMode()) {
				themeLink.href = "/src/light.scss";
			} else {
				themeLink.href = "/src/dark.scss";
			}
		}
	}

	prefersLightMode(): boolean {
		if (isPlatformBrowser(this.platformId)) {
			return (
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: light)").matches
			);
		}
		return false;
	}
}