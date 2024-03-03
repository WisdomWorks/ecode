/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../pages/~__root'
import { Route as CourseRouteImport } from './../pages/~course/~route'
import { Route as IndexImport } from './../pages/~index'
import { Route as CodeExerciseCodeIdImport } from './../pages/~code-exercise/~$codeId'
import { Route as TextEditorIndexImport } from './../pages/~text-editor/~index'
import { Route as CourseCourseIdIndexImport } from './../pages/~course/~$courseId/~index'

// Create/Update Routes

const CourseRouteRoute = CourseRouteImport.update({
  path: '/course',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CodeExerciseCodeIdRoute = CodeExerciseCodeIdImport.update({
  path: '/code-exercise/$codeId',
  getParentRoute: () => rootRoute,
} as any)

const TextEditorIndexRoute = TextEditorIndexImport.update({
  path: '/text-editor/',
  getParentRoute: () => rootRoute,
} as any)

const CourseCourseIdIndexRoute = CourseCourseIdIndexImport.update({
  path: '/$courseId/',
  getParentRoute: () => CourseRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/course': {
      preLoaderRoute: typeof CourseRouteImport
      parentRoute: typeof rootRoute
    }
    '/text-editor/': {
      preLoaderRoute: typeof TextEditorIndexImport
      parentRoute: typeof rootRoute
    }
    '/code-exercise/$codeId': {
      preLoaderRoute: typeof CodeExerciseCodeIdImport
      parentRoute: typeof rootRoute
    }
    '/course/$courseId/': {
      preLoaderRoute: typeof CourseCourseIdIndexImport
      parentRoute: typeof CourseRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CourseRouteRoute.addChildren([CourseCourseIdIndexRoute]),
  TextEditorIndexRoute,
  CodeExerciseCodeIdRoute,
])

/* prettier-ignore-end */
