import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import Image from 'next/image'
import RunningHead from './components/runningHead'
import CustomPaginator from './components/CustomPaginator'
import CalendarCaption from './components/CalendarCaption'

// Get the default MDX components
const themeComponents = getThemeComponents()
const ThemeH1 = themeComponents.h1 || 'h1'

// A day's date title is written as `# <div id="date">…</div>`; name the calendar in use directly beneath it.
const isDateTitle = (children) =>
  [].concat(children).some((child) => child?.props?.id === 'date')

const DateTitle = (props) => (
  <>
    <ThemeH1 {...props} />
    {isDateTitle(props.children) && <CalendarCaption />}
  </>
)

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    h1: DateTitle,
    // Custom components that are imported in MDX files
    Image,
    RunningHead,
    CustomPaginator,
    ...components
  }
}