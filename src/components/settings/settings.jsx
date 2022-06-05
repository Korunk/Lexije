import React, {useContext} from 'react'
import { Header } from '../header/header'
import './settings.css'
import { AppContext } from 'components/app/app'

export const Settings = () => {
  const { status } = useContext(AppContext)

  return (
  <>
    <Header />
    <p>{status.timer}</p>
  <p>Nastav čas, jak dlouho může mít dítě zapnutou aplikaci.</p>
  </>
  )
}
