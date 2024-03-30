import { Loading, TabPanel, TTabProps } from '@/components/common'

import { useCourseContext } from '../context/course.context'

interface Props {
  tab: number
  tabs: TTabProps[]
}

export const TopicTabs = ({ tab, tabs }: Props) => {
  const { loading } = useCourseContext()

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {tabs.map(({ component: Component, value }) => (
            <TabPanel index={value} key={value} value={tab}>
              {Component ? <Component /> : null}
            </TabPanel>
          ))}
        </>
      )}
    </>
  )
}
