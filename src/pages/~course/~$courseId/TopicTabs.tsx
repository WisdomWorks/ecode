import { TabPanel, TTabProps } from '@/components/common'

interface Props {
  tab: number
  tabs: TTabProps[]
}

export const TopicTabs = ({ tab, tabs }: Props) => {
  return (
    <>
      {tabs.map(({ component: Component, value }) => (
        <TabPanel index={value} key={value} value={tab}>
          {Component ? <Component /> : null}
        </TabPanel>
      ))}
    </>
  )
}
