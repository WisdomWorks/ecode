import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

import { a11yProps } from '@/utils'

import { Tab, TabProps, Tabs, TabsProps } from '@mui/material'

interface Props extends TabsProps {
  extraOnChange?: () => void
  setTab: Dispatch<SetStateAction<number>>
  tab: number
  tabs: TabProps[]
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

  return (
    <>
      <Tabs
        {...rest}
        className="h-full"
        classes={{
          flexContainer: 'h-full',
        }}
        onChange={handleChangeTab}
        value={tab}
      >
        {tabs.map(({ iconPosition = 'start', value, ...rest }) => (
          <Tab
            {...rest}
            iconPosition={iconPosition}
            key={value}
            {...a11yProps(value)}
            component="div"
          />
        ))}
      </Tabs>
    </>
  )
}
