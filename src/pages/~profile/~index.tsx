import { SyntheticEvent, useState } from 'react'

import { TabPanel } from '@/components/common'
import { a11yProps } from '@/utils'

import { CredentialTab } from './CredentialTab'
import { ProfileTab } from './ProfileTab'
import { Tab, Tabs } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Profile = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs onChange={handleChange} value={value}>
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Credential" {...a11yProps(1)} />
      </Tabs>
      <TabPanel index={0} value={value}>
        <ProfileTab />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CredentialTab />
      </TabPanel>
    </>
  )
}

export const Route = createFileRoute('/profile/')({
  component: Profile,
})
