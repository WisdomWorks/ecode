import { useState } from 'react'

import { TabPanel, TabsClient } from '@/components/common'

import { Exercise } from './exercise/Exercise'
import { Material } from './material/Material'
import { Settings } from './settings/Settings'
import {
  MenuBookOutlined,
  QuizOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { TabProps } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

const tabs: TabProps[] = [
  {
    label: 'Material',
    icon: <MenuBookOutlined />,
    value: 0,
    component: Material,
  },
  {
    label: 'Exercise',
    icon: <QuizOutlined />,
    value: 1,
    component: Exercise,
  },
  {
    label: 'Settings',
    icon: <SettingsOutlined />,
    value: 2,
    component: Settings,
  },
]

export const Course = () => {
  const [tab, setTab] = useState(0)

  return (
    <div className="grid h-full grid-rows-8 gap-4">
      <div className="row-span-1 flex flex-col">
        <div className="h-full rounded-xl py-3 shadow-l">
          <TabsClient setTab={setTab} tab={tab} tabs={tabs} />
        </div>
      </div>

      <div className="row-span-7 overflow-auto rounded-xl p-4 shadow-xl">
        {tabs.map(({ component: Component, value }) => (
          <TabPanel index={value} key={value} value={tab}>
            {Component ? <Component /> : null}
          </TabPanel>
        ))}
      </div>
    </div>
  )
}
export const Route = createFileRoute('/course/$courseId/')({
  component: Course,
})
