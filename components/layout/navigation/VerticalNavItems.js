// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props
  const { settings } = props

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)


    if(settings.user.role.permissions[item.permissions])
      return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
