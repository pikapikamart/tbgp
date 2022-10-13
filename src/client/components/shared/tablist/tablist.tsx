import { useTablistSelection } from "./tablist.hooks"
import { 
  Tab,
  TablistWrapper, 
  TabSelections } from "./tablist.styled"


type TablistProps = {
  children: React.ReactNode,
  selectionNames: string[]
}

const Tablist = ( { children, selectionNames }: TablistProps ) =>{
  const {
    currentTabindex,
    addTabRef,
    handleChangeTabFocus,
    handleChangeCurrentTabindex
  } = useTablistSelection()

  const renderTabSelections = () => {
    const tabSelections = selectionNames.map((name, index) => (
      <Tab 
        key={ name }
        id={ `selection-${ index }` }
        role="tab"
        ref={ addTabRef }
        tabIndex={ currentTabindex===index? 0 : -1 }
        onClick={ handleChangeCurrentTabindex }
        data-index={ index }
        aria-controls="tablist-content"
        aria-selected={ currentTabindex===index }> { name }
      </Tab>
    ))

    return tabSelections
  }

  return (
    <TablistWrapper onKeyDown={ handleChangeTabFocus }>
      <TabSelections 
        role="tablist" 
        aria-label="user selections"> { renderTabSelections() }
      </TabSelections>
      <div 
        id="tablist-content"
        role="tabpanel"
        aria-labelledby={ `selection-${ currentTabindex }` }>{ Array.isArray(children) ? children[currentTabindex] : children }
      </div>
    </TablistWrapper>
  )
}


export default Tablist;