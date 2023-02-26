import { PageNameEnum, PagePathEnum, PageTitleEnum } from '@/enum/page'
import {
  BASIC_LAYOUT,
  BLANK_LAYOUT,
  EXCEPTION_COMPONENT,
  LOGIN_COMPONENT,
  REDIRECT_COMPONENT
} from '@/router/routes/constant'
import { RouteRecordRaw } from 'vue-router'

export const PageNotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  component: BASIC_LAYOUT,
  children: [
    {
      path: '/:path(.*)*',
      name: PageNameEnum.PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: { title: PageTitleEnum.PAGE_NOT_FOUND_TITLE }
    }
  ]
}

export const RedirectRoute: RouteRecordRaw = {
  path: PagePathEnum.REDIRECT_PATH,
  component: BASIC_LAYOUT,
  name: `${PageNameEnum.REDIRECT_NAME}-parent`,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: PageNameEnum.REDIRECT_NAME,
      component: REDIRECT_COMPONENT,
      meta: { title: PageTitleEnum.REDIRECT_TITLE }
    }
  ]
}

export const LoginRoute: RouteRecordRaw = {
  path: PagePathEnum.LOGIN_PATH,
  name: `${PageNameEnum.LOGIN_NAME}-parent`,
  component: BLANK_LAYOUT,
  children: [
    {
      path: PagePathEnum.LOGIN_PATH,
      name: PageNameEnum.LOGIN_NAME,
      component: LOGIN_COMPONENT,
      meta: { title: PageTitleEnum.LOGIN_TITLE }
    }
  ]
}

export const HomeRoute: RouteRecordRaw = {
  path: '/',
  name: PageNameEnum.HOME_NAME,
  redirect: PagePathEnum.HOME_REDIRECT,
  meta: { title: PageTitleEnum.HOME_TITLE }
}

export const WHITE_ROUTES = [HomeRoute, LoginRoute, RedirectRoute, PageNotFoundRoute]

export const WHITE_ROUTES_NAME: string[] = [
  PageNameEnum.HOME_NAME,
  PageNameEnum.LOGIN_NAME,
  PageNameEnum.REDIRECT_NAME,
  PageNameEnum.PAGE_NOT_FOUND_NAME
]
