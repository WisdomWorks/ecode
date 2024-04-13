import { SyntheticEvent, useEffect, useState } from 'react'

import { ITab, TRouterPath } from '@/types'

import { Tab, Tabs } from '@mui/material'
import { Link, useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  defaultValue: string
  extraOnChange?: () => void
  tabs: ITab[]
}

export const TabsNavigation = ({
  defaultValue,
  extraOnChange,
  tabs,
}: Props) => {
  const params = useParams({ strict: false })

  const navigate = useNavigate()
  const [tab, setTab] = useState<string>(defaultValue)

  useEffect(() => {
    setTab(defaultValue)
  }, [defaultValue, params])

  const handleChangeTab = (
    _: SyntheticEvent<Element, Event>,
    newValue: TRouterPath,
  ) => {
    setTab(newValue)
    extraOnChange?.()
    navigate({ to: String(`/course/$courseId/${newValue}`), params: params })
  }

  return (
    <Tabs
      className="h-full"
      classes={{
        flexContainer: 'h-full',
      }}
      onChange={handleChangeTab}
      value={tab}
    >
      {tabs.map(({ iconPosition = 'start', label, to, ...rest }) => (
        <Tab
          LinkComponent={Link}
          iconPosition={iconPosition}
          key={to}
          label={label}
          {...rest}
        />
      ))}
    </Tabs>
  )
}
