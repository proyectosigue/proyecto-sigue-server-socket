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
import { GodfathersPage} from "../pages/godfathers/godfathers";
import { GodsonsPage } from "../pages/godsons/godsons";
import { GodfathersPopoverPage } from "../pages/godfathers-popover/godfathers-popover";
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
    GodfathersPopoverPage,
    GodsonsPage
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
    GodfathersPopoverPage,
    GodsonsPage
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
