import { ConfigService } from '../../config/config.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {
  LanguageService,
  RightSidebarService,
  InConfiguration,
  Role,
  AuthService,
} from '@core';

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  userImg?: string;
  homePage?: string;
  firstName?: string;
  lastName?: string;
  // isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement: HTMLElement | undefined;
  isFullScreen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'French', flag: 'assets/images/flags/french.png', lang: 'fr' },

  ];

  ngOnInit() {
    this.config = this.configService.configData;

    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;
    this.firstName = this.authService.currentUserValue.firstName;
    this.lastName = this.authService.currentUserValue.lastName;

    if (userRole === Role.Admin) {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === Role.Teacher) {
      this.homePage = 'teacher/dashboard';
    } else if (userRole === Role.Student) {
      this.homePage = 'student/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }
  callFullscreen() {
  const elem = document.documentElement as any;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}


  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  // mobileMenuSidebarOpen(event: Event, className: string) {
  //   const hasClass = (event.target as HTMLInputElement).classList.contains(
  //     className
  //   );
  //   if (hasClass) {
  //     this.renderer.removeClass(this.document.body, className);
  //   } else {
  //     this.renderer.addClass(this.document.body, className);
  //   }
  // }
  // callSidemenuCollapse() {
  //   const hasClass = this.document.body.classList.contains('side-closed');
  //   if (hasClass) {
  //     this.renderer.removeClass(this.document.body, 'side-closed');
  //     this.renderer.removeClass(this.document.body, 'submenu-closed');
  //     localStorage.setItem('collapsed_menu', 'false');
  //   } else {
  //     this.renderer.addClass(this.document.body, 'side-closed');
  //     this.renderer.addClass(this.document.body, 'submenu-closed');
  //     localStorage.setItem('collapsed_menu', 'true');
  //   }
  // }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
