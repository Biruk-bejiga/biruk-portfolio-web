import React from 'react'

export const MDXComponents: Record<string, React.ComponentType<any>> = {
  h1: (props: any) => <h1 className="mt-2 text-3xl md:text-4xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="mt-8 text-2xl md:text-3xl font-semibold" {...props} />,
  p: (props: any) => <p className="my-4 leading-7 text-gray-700 dark:text-gray-300" {...props} />,
  a: (props: any) => <a className="text-primary underline underline-offset-2" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4 space-y-1" {...props} />,
  code: (props: any) => <code className="rounded bg-gray-100 dark:bg-gray-800 px-1 py-0.5" {...props} />,
  pre: (props: any) => <pre className="my-4 overflow-x-auto rounded bg-gray-100 dark:bg-gray-900 p-4" {...props} />,
}

export default MDXComponents
