import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

import { Role } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { a11yProps } from '@/utils'

import { Tab, TabProps, Tabs, TabsProps } from '@mui/material'

export type TTabProps = TabProps & {
  permission?: Role[]
}
interface Props extends TabsProps {
  extraOnChange?: () => void
  setTab: Dispatch<SetStateAction<number>>
  tab: number
  tabs: TTabProps[]
}

export const TabsClient = ({
  extraOnChange,
  setTab,
  tab,
  tabs,
  ...rest
}: Props) => {
  const handleChangeTab = (
    _: SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setTab(newValue)
    extraOnChange?.()
  }
  const user = useAppStore(state => state.user)
  const role = user?.role

  return (
    <>
      <Tabs
        {...rest}
        className="flex h-full items-center"
        classes={{
          flexContainer: 'h-full',
        }}
        onChange={handleChangeTab}
        value={tab}
      >
        {tabs.map(({ iconPosition = 'start', permission, value, ...rest }) => {
          if (permission && !permission.includes(role as Role)) return null

          return (
            <Tab
              {...rest}
              iconPosition={iconPosition}
              key={value}
              {...a11yProps(value)}
              component="div"
              value={value}
            />
          )
        })}
      </Tabs>
    </>
  )
}
