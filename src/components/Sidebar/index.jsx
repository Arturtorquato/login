import React from 'react'
import { Container, Content } from './styles'
import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaRegSun, 
  FaUserAlt, 
  FaIdCardAlt, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="1" />
        <SidebarItem Icon={FaHome} Text="2" />
        <SidebarItem Icon={FaHome} Text="3" />
        <SidebarItem Icon={FaHome} Text="4" />
        <SidebarItem Icon={FaHome} Text="5" />
        <SidebarItem Icon={FaHome} Text="6" />
        <SidebarItem Icon={FaHome} Text="7" />
        <SidebarItem Icon={FaHome} Text="8" />
      </Content>
    </Container>
  )
}

export default Sidebar