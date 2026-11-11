import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import Image from 'next/image'
import RunningHead from './components/runningHead'
import CustomPaginator from './components/CustomPaginator'
import HymnDivider from './components/HymnDivider'

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    // Custom components that are imported in MDX files
    Image,
    RunningHead,
    CustomPaginator,
    HymnDivider,
    ...components
  }
}
