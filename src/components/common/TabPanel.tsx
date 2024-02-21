import { PropsWithChildren } from 'react'

interface TabPanelProps {
  index: number
  value: number
}

export const TabPanel = ({
  children,
  index,
  value,
  ...other
}: PropsWithChildren<TabPanelProps>) => {
  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      className="py-5"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}
