import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import { AboutPage } from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { HomeAdminPage } from '../pages/home-admin/home-admin'
import { HomeUserPage } from '../pages/home-user/home-user'
import { TabsPage } from '../pages/tabs/tabs';
import { GodfathersPage} from "../pages/godfathers/list/godfathers-list";
import { GodfathersPopoverPage } from "../pages/godfathers-popover/godfathers-popover";
import { GodfathersDetailPage } from "../pages/godfathers/detail/godfathers-detail";
import { GodfathersDetailPopoverPage } from "../pages/godfathers/detail/popover/godfathers-detail-popover";
import { GodsonsPage } from "../pages/godsons/list/godsons-list";
import { GodsonsPopoverPage } from "../pages/godsons/list/popover/godsons-popover";
import { GodsonsDetailPage } from "../pages/godsons/detail/godsons-detail";
import { UserProvider } from '../providers/user/user';
import { GodsonProvider } from '../providers/godson/godson';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HomeAdminPage,
    HomeUserPage,
    GodfathersPage,
    GodfathersDetailPage,
    GodfathersDetailPopoverPage,
    GodfathersPopoverPage,
    GodsonsPage,
    GodsonsPopoverPage,
    GodsonsDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HomeAdminPage,
    HomeUserPage,
    GodfathersPage,
    GodfathersDetailPage,
    GodfathersDetailPopoverPage,
    GodfathersPopoverPage,
    GodsonsPage,
    GodsonsPopoverPage,
    GodsonsDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GodsonProvider
  ]
})
export class AppModule {}
