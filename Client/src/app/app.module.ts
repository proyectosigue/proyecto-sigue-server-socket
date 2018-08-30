import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import { AboutPage } from '../pages/home-admin/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { HomeAdminPage } from '../pages/home-admin/home-admin'
import { HomeUserPage } from '../pages/home-godfather/home-godfather'
import { AdminTabsPage } from '../pages/home-admin/tabs/admin-tabs';
import { GodfathersPage} from "../pages/home-admin/godfathers/list/godfathers-list";
import {AboutPopoverPage} from "../pages/home-admin/about/list/about-popover/about-popover";
import { GodfathersPopoverPage } from "../pages/home-admin/godfathers/list/godfathers-popover/godfathers-popover";
import { GodfathersDetailPage } from "../pages/home-admin/godfathers/detail/godfathers-detail";
import { GodfathersDetailPopoverPage } from "../pages/home-admin/godfathers/detail/popover/godfathers-detail-popover";
import { GodfatherTopicsListPage } from "../pages/home-admin/godfathers/topics/list/godfather-topics-list";
import { GodfatherTopicsListPopoverPage } from "../pages/home-admin/godfathers/topics/list/popover/godfather-topics-list-popover";
import { GodfatherTopicDetailPage } from "../pages/home-admin/godfathers/topics/detail/godfather-topic-detail";
import { GodsonsPage } from "../pages/home-admin/godsons/list/godsons-list";
import { GodsonsPopoverPage } from "../pages/home-admin/godsons/list/popover/godsons-popover";
import { GodsonsDetailPage } from "../pages/home-admin/godsons/detail/godsons-detail";
import { UserProvider } from '../providers/user/user';
import { NewProvider } from '../providers/new/new';
import { GodsonProvider } from '../providers/godson/godson';
import {File} from "@ionic-native/file";
import {Camera} from "@ionic-native/camera";
import { GodfatherProvider } from '../providers/godfather/godfather';
import { Singleton } from '../providers/singleton/singleton';
import { TruncateModule } from "ng2-truncate";
import { LastPipe } from "../pipes/last/last";
import { ThreadProvider } from '../providers/thread/thread';
import {GodfatherTabsPage} from "../pages/home-godfather/tabs/godfather-tabs";
import {NewsPage} from "../pages/news/register/news";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AdminTabsPage,
    LoginPage,
    RegisterPage,
    HomeAdminPage,
    HomeUserPage,
    GodfathersPage,
    GodfathersDetailPage,
    AboutPopoverPage,
    GodfathersDetailPopoverPage,
    GodfathersPopoverPage,
    GodfatherTopicsListPage,
    GodfatherTopicsListPopoverPage,
    GodfatherTopicDetailPage,
    GodsonsPage,
    GodsonsPopoverPage,
    GodsonsDetailPage,
    GodfatherTabsPage,
    NewsPage,
    LastPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    TruncateModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AdminTabsPage,
    LoginPage,
    RegisterPage,
    HomeAdminPage,
    HomeUserPage,
    GodfathersPage,
    GodfathersDetailPage,
    AboutPopoverPage,
    GodfathersDetailPopoverPage,
    GodfatherTopicsListPage,
    GodfatherTopicsListPopoverPage,
    GodfatherTopicDetailPage,
    GodfathersPopoverPage,
    GodsonsPage,
    GodsonsPopoverPage,
    GodsonsDetailPage,
    GodfatherTabsPage,
    NewsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    File,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GodsonProvider,
    GodfatherProvider,
    NewProvider,
    Singleton,
    ThreadProvider
  ]
})
export class AppModule {}
