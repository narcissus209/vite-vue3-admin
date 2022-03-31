declare namespace Router {
  import { RouteLocation, RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'

  type Route = RouteRecordRaw

  type RouteLocal = RouteLocation

  type RouteLocalNormalizedLoaded = RouteLocationNormalizedLoaded

  type Component = () => Promise<typeof import('*.vue')>
}
